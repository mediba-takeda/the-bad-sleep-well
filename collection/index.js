const { executor } = require('chroco')
const Badsleepwell = require('./Badsleepwell')

const commands = {
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
