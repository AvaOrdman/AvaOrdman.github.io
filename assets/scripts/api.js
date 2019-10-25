'use strict'

const config = require('./config')

const indexGigs = () => {
  return $.ajax({
    url: config.apiUrl + '/gigs',
    method: 'GET'
  })
}

module.exports = {
  indexGigs
}
