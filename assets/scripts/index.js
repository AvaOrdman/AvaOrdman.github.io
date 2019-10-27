'use strict'

// import 'bootstrap'
// require('bootstrap')
// const indexDisplay = require('./templates/index-gigs.handlebars')
// const events = require('./events.js')
// const api = require('./api.js')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#recordings-page').hide()
  $('#calendar-page').hide()
  $('#contact-page').hide()
  $('#bio-page').hide()
  $('#students-page').hide()
  // events.addHandlers()
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

  let apiUrl
  const apiUrls = {
    production: 'https://mighty-tundra-49432.herokuapp.com',
    development: 'http://localhost:4741'
  }

  if (window.location.hostname === 'localhost') {
    apiUrl = apiUrls.development
  } else {
    apiUrl = apiUrls.production
  }

  // apiUrl = apiUrls.development

  const indexGigs = () => {
    return $.ajax({
      url: apiUrl + '/gigs',
      method: 'GET'
    })
  }

  indexGigs()
    .then((responseData) => $('.gigs-container').html(sortByDate(responseData.gigs).map(gig => {
      return (
        `<div class="gig-container animated slideInUp">
          <div class="gig">
            <div class="gig-title-container">
              <h3 class="gig-title">${gig.title}</h3>
            </div>
            <div class="gig-content-container">
              <i class="material-icons">date_range</i><span class="gig-details">${gig.date}</span><br>
              <i class="material-icons">access_time</i><span class="gig-details">${gig.time}</span><br>
              <i class="material-icons">place</i><span class="gig-details">${gig.place}</span><br>
              <hr>
              <p class="gig-description">${gig.text}</p>
            </div>
          </div>
        </div>`
      )
    })))
    .then(() => {
      $('.calendar-loader').hide()
      $('.calendar-load').hide()
    })
    .catch(console.log)

  const showAndHideContent = function (show) {
    const pagesArr = ['home', 'recordings', 'calendar', 'bio', 'students', 'contact']
    const hiddenPagesArr = pagesArr.filter(page => page !== show)
    hiddenPagesArr.forEach(page => {
      $(`#${page}`).removeClass('selected')
      $(`#${page}-page`).hide()
      $('body').removeClass(`${page}-background`)
    })
    $(`#${show}`).addClass('selected')
    $(`#${show}-page`).show()
    $('body').addClass(`${show}-background`)
    $('#overlay').removeClass('overlay')
    $('.navbar-toggler').attr('aria-expanded', 'false')
  }

  const onClickRecordings = function () {
    $('#mvt-2').addClass('disappear')
    $('#mvt-3').addClass('disappear')
    showAndHideContent('recordings')
    $('#mvt-1').removeClass('disappear')
    $('#mvt-2').removeClass('disappear')
    $('#mvt-3').removeClass('disappear')
    // const flipPlayers = function () {
    //   setTimeout(function () {
    //     $('#mvt-1').removeClass('disappear')
    //   }, 1500)
    //   setTimeout(function () {
    //     $('#mvt-2').removeClass('disappear')
    //   }, 2000)
    //   setTimeout(function () {
    //     $('#mvt-3').removeClass('disappear')
    //   }, 2500)
    // }
    // $(document).ready(function () {
    //   flipPlayers()
    // })
    // setTimeout(function () {
    //   $('#spotify-player').removeClass('disappear')
    // }, 1500)
  }

  const onClickStudents = function () {
    showAndHideContent('students')
  }

  const onClickContact = function () {
    showAndHideContent('contact')
  }

  const onClickCalendar = function () {
    showAndHideContent('calendar')
  }

  const onClickBio = function () {
    showAndHideContent('bio')
    $('#overlay').addClass('overlay')
  }

  const onClickHome = function () {
    showAndHideContent('home')
  }

  const adjustNavPadding = function () {
    setTimeout(function () {
      const isExpanded = $('.navbar-toggler').attr('aria-expanded')
      console.log(isExpanded)
      if (isExpanded === 'true') {
        // alert('expanded')
        $('#students').addClass('padded-item')
      } else {
        $('#students').removeClass('padded-item')
        // alert('not expanded')
      }
    }, 1000)
  }

  $('.navbar-toggler').on('click', adjustNavPadding)
  $('#recordings').on('click', onClickRecordings)
  $('#home').on('click', onClickHome)
  $('#calendar').on('click', onClickCalendar)
  $('#bio').on('click', onClickBio)
  $('#students').on('click', onClickStudents)
  $('#contact').on('click', onClickContact)
})
