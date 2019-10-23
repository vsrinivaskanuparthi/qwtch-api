'use strict'
/*
Author @ Srinivas Kanuparthi
*/

const log4js = require('log4js')

log4js.configure({
  appenders: {
    qwtch: {
      type: 'file',
      filename: 'logs/qwtch.log'
    }
  },
  categories: {
    default: {
      appenders: ['qwtch'],
      level: 'debug'
    }
  }
})

module.exports.log4js = log4js
