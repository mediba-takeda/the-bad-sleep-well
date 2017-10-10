const { Logger } = require('chroco')
const { writeFileSync } = require('fs')

module.exports = class {
  constructor (page) {
    this.page = page
    this.userAgents = []
    this.logger = new Logger(['info'])
  }

  async getAllUserAgents () {
    const { page, logger } = this
    const $elements = await page.$('tr td:first-child')
    try {
      this.userAgents = await page.evaluate(() => {

        // setup 
        window.$ = jQuery
        const trim = str => str.replace(/[\n\r]/g, '')
        const isBrowser = str =>
          [
            'ブラウザ',
            'Chrome',
            'WebView',
            'ブラウザ(スモールアプリ)',
            'ブラウザ (スモールアプリ)', // Whaaat???
            'インターネット',
            'かんたんインターネット'
          ].includes(str)
        const $tableCells = $('tbody tr td')
        const userAgents = []
        let _id = 0
        let devicename

        // スーパー泥臭い iteration
        $tableCells.each((i, elem) => {
          const $cell = $(elem)
          const isOldType = $cell.attr('colspan') === '2'
          const cellText = trim($(elem).text())
          const nextCellText = trim($(elem).next().text())
          // set device name as key to `userAgents`
          if( $cell.is(':first-child') && !isBrowser(cellText) ) {
            userAgents.push({
              id: _id, // id is iterate index...may be confused.
              device: cellText
            })
            _id++
          // set BrowserName as key, UserAgent name as val
          } else if (isBrowser(cellText)) {
            userAgents[_id] = Object.assign({}, userAgents[_id], {
              [cellText]: nextCellText
            })
          // oldtype device: set `ブラウザ` as key, UserAgent name as val
          } else if (isOldType) {
            userAgents[_id] = Object.assign({}, userAgents[_id], {
              'ブラウザ': cellText
            })
          }
        })
        userAgents[1] = Object.assign({}, userAgents[0], userAgents[1])
        userAgents.shift()
        const len = userAgents.length
        userAgents.map((v, i) => {
          userAgents[i] = Object.assign({}, userAgents[i], {
            id: len - 1 - i
          })
        })
        return userAgents
      })
      // logger.info`userAgents: ${this.userAgents}`
      writeFileSync('ua.json', JSON.stringify({ userAgents: this.userAgents }, null, 2))
    } catch (error) {
      console.warn(error)
      process.exit(1)
    }
  }
}
