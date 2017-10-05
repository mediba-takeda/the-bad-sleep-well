const { executor } = require('chroco')
const Badsleepwell = require('./Badsleepwell')

const commands = {
  options: {
    headless: false,
    logLevel: ['info']
  },
  receivers: { Badsleepwell },
  scenarios: [
    {
      goto: [
        'https://www.au.com/developer/android/kishu/ua/',
        { waitUntil: 'load' }
      ]
    },
    {
      Badsleepwell: 'getAllUserAgents'
    }
  ]
}

executor(commands)
