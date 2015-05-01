app.controller('apptController', function ($http, $scope) {

  var url = 'http://fake-co-calendar.herokuapp.com/api/v1/events?callback=JSON_CALLBACK';

  function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
  }

  $scope.currentTime = function() {
    var today = new Date();
    var h = today.getHours();
    var afternoon = h - 12;
    var m = today.getMinutes();
    m = checkTime(m);

    if (h > 12) {
      h = afternoon;
    }
    document.querySelector('.current-time').innerHTML = 'Current Time: ' + '<span class="current-hour">' + h + '</span>' + ":" + '<span class="current-minute">' + m + '<span>';
    t = setTimeout(function () {
        $scope.currentTime();
    }, 500);
  }

  $http.jsonp(url).success(function (d) {

    $scope.attendeeSets = [];
    $scope.attendees = [];

    for (var i = 0; i < d.events.list.length; ++i) {
      d.events.list[i].date = d.events.list[i].start_time.slice(0, 10);
      d.events.list[i].start_hour = Number(d.events.list[i].start_time.slice(11, 13));
      d.events.list[i].start_hour_afternoon = d.events.list[i].start_hour - 12;
      d.events.list[i].start_minutes = Number(d.events.list[i].start_time.slice(14, 16));
      d.events.list[i].end_hour = Number(d.events.list[i].end_time.slice(11, 13));
      d.events.list[i].end_minutes = Number(d.events.list[i].end_time.slice(14, 16));

      if (d.events.list[i].start_hour < 10) {
        d.events.list[i].start_hour = Number(d.events.list[i].start_time.slice(12, 13));
      }

      if (d.events.list[i].end_hour < 10) {
        d.events.list[i].end_hour = Number(d.events.list[i].end_time.slice(12, 13));
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
.directive('apptDirective', [function() {
  return {
    restrict: 'E',
    link: function (scope, elem, attrs) {
      var currentHour,
          newCurrentHour,
          currentMinute,
          startHour,
          startMinutes,
          endHour,
          endMinutes;

      setTimeout(function () {
        currentMinute = Number($('.current-minute').text());
        startHour = Number($('.start-hour').text());
        startMinutes = Number($('.start-minutes').text());
        endHour = Number($('.end-hour').text());
        endMinutes = Number($('.end-minutes').text());

      }, 500)
    }
  }
}]);
