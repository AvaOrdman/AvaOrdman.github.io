'use strict'

const indexDisplay = require('./templates/index-gigs.handlebars')
const events = require('./events.js')
const api = require('./api.js')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // const str = 'https://'
  // const indexOrders = () => {
  //   fetch(`${str}490f41edd92a10c5b3a407586a9afddc:37146826a987bc7d64eedc6ccab575ea@paucek-considine6869.myshopify.com/admin/orders.json`)
  //     .then(console.log)
  // }

  $('#recordings-page').hide()
  $('#calendar-page').hide()
  $('#contact-page').hide()
  $('#bio-page').hide()
  $('#students-page').hide()
  events.addHandlers()
  const blurbs = function () {
    setTimeout(function () {
      $('#blurb3').removeClass('disappear')
    }, 1000)
    setTimeout(function () {
      $('#spotify-player').removeClass('disappear')
      $('#blurb2').removeClass('disappear')
    }, 2000)
    setTimeout(function () {
      $('#blurb4').removeClass('disappear')
    }, 2500)
    setTimeout(function () {
      $('#blurb5').removeClass('disappear')
    }, 3000)
  }
  $(document).ready(function () {
    blurbs()
  })
  // setTimeout(function () {
  //   $('#spotify-player').removeClass('disappear')
  //   $('#blurb2').removeClass('disappear')
  // }, 1000)
  // setTimeout(function () {
  //   $('#blurb3').removeClass('disappear')
  // }, 2000)
  // setTimeout(function () {
  //   $('#blurb4').removeClass('disappear')
  // }, 2500)
  const sortByDate = function (gigs) {
    return gigs.sort(function compareNumbers (a, b) {
      return (new Date(a.date).getTime()) - (new Date(b.date).getTime())
    })
  }

  api.indexGigs()
    .then((responseData) => $('.gigs-container').html(indexDisplay({ gigs: sortByDate(responseData.gigs) })))
    // .then((responseData) => $('#signInSuccess').html(editGigs({ gigs: responseData.gigs.reverse() })))
    .then(() => {
      $('.calendar-loader').hide()
      $('.calendar-load').hide()
    })
    .catch(console.log)
})
