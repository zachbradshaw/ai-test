angular.module('fakeCo')
.controller('apptController', function ($http, $scope) {

  var url = 'http://fake-co-calendar.herokuapp.com/api/v1/events?callback=JSON_CALLBACK';

  $http.jsonp(url).success(function (d) {

    for (var i = 0; i < d.events.list.length; ++i) {
      d.events.list[i].moment_start_time = moment(d.events.list[i].start_time).format()
      d.events.list[i].moment_end_time = moment(d.events.list[i].end_time).format();
      d.events.list[i].suffix = d.events.list[i].moment_end_time.slice(22, 25);
      d.events.list[i].start_hour = Number(d.events.list[i].start_time.slice(11, 13));
      d.events.list[i].start_minutes = Number(d.events.list[i].start_time.slice(14, 16));
      d.events.list[i].end_hour = Number(d.events.list[i].end_time.slice(11, 13));
      d.events.list[i].end_minutes = Number(d.events.list[i].end_time.slice(14, 16));

      if (d.events.list[i].start_hour < 10) {
        d.events.list[i].start_hour = Number(d.events.list[i].start_time.slice(12, 13));
      }

      if (d.events.list[i].end_hour < 10) {
        d.events.list[i].end_hour = Number(d.events.list[i].end_time.slice(12, 13));
      }

      if (d.events.list[i].start_hour > 12) {
        d.events.list[i].start_hour = d.events.list[i].start_hour - 12;
      }

      if (d.events.list[i].end_hour > 12) {
        d.events.list[i].end_hour = d.events.list[i].end_hour - 12;
      }

      if (d.events.list[i].start_minutes === 0) {
        d.events.list[i].start_minutes = '0' + d.events.list[i].start_minutes;
      }

      if (d.events.list[i].end_minutes === 0) {
        d.events.list[i].end_minutes = '0' + d.events.list[i].end_minutes;
      }
    }

    $scope.appts = d.events.list;
  })
})
.directive('apptDirective', function () {

  return {
    restrict: 'EA',
    link: function (scope, elem, attrs) {
      function checkTime () {
        var startTime;
        var endTime;
        var currentTime = moment();

        $('.appt-slot').each(function () {
          var slot = $(this);
          var currentSlot = $(this).hasClass('current-appt');
          startTime = moment($(this).data('start'));
          endTime = moment($(this).data('end'));

          if (startTime.isBefore(moment())) {
            slot.addClass('current-appt');
          }

          if (currentTime.isBetween(startTime, endTime)) {
            slot.children('.appt-end').children('.appt-warning').text(' (In progress)')
          }

          if (endTime.isBefore(moment())) {
            slot.removeClass('current-appt');
            slot.addClass('past-appt');
            slot.children('.appt-end').children('.appt-warning').text('');
          }

          if (currentTime.diff(endTime, 'minutes') > 60) {
            slot.fadeOut();
          }

          if(currentTime.diff(startTime, 'minutes') < 0 && currentTime.diff(startTime, 'minutes') > -20) {
            slot.children('.appt-end').children('.appt-warning').text(' (In ' + startTime.diff(currentTime, "minutes") + ' minutes)')
          }

          $('.room-circle').each(function (){
            var circle = $(this);
            if (currentSlot) {
              if (circle.children('.hidden-name').text() === slot.children('.appt-room').text()) {
                $(this).addClass('taken');
              }
            }
          })
        })
      }

      setInterval(function () {
        checkTime();
      }, 1000)
    }
  }
})
