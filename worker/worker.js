const { executor } = require('chroco')

const baseCommand = (url, filename) => {
  return {
    scenarios: [
      {
        goto: [
          url || 'https://www.google.co.jp/'
        ]
      },
      {
        screenshot: {
          path: `.temp/${filename || 'sample1'}.png`,
          fullPage: true
        }
      }
    ]
  }
}

const sampleWorker1 = () => executor(baseCommand())
const sampleWorker2 = () => executor(baseCommand('http://edition.cnn.com/', 'sample2'))
const sampleWorker3 = () => executor(baseCommand(null, 'sample3'))
const sampleWorker4 = () => executor(baseCommand('https://www.nasa.gov/', 'sample4'))

module.exports = {
  sampleWorker1,
  sampleWorker2,
  sampleWorker3,
  sampleWorker4
}
