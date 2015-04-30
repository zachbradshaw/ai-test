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
    var m = today.getMinutes();
    
    m = checkTime(m);

    // if (h > 12) {
    //   h = h - 12;
    // }
    document.querySelector('.current-time').innerHTML = 'Current Time: ' + '<span class="current-hour">' + h + '</span>' + ":" + '<span class="current-minute">' + m + '<span>';
    t = setTimeout(function () {
        $scope.currentTime();
    }, 500);
  }
  
  $http.jsonp(url).success(function (d) {

    for (var i = 0; i < d.events.list.length; ++i) {
      d.events.list[i].date = d.events.list[i].start_time.slice(0, 10);
      d.events.list[i].short_start_time = d.events.list[i].start_time.slice(11, 16);
      d.events.list[i].short_end_time = d.events.list[i].end_time.slice(11, 16);
    }
    $scope.appts = d.events.list;
    console.log($scope.appts);
  })
})
.directive('apptDirective', [function() {
  return {
    restrict: 'E',
    link: function (scope, elem, attrs) {
      var currentHour;
      var currentMinute;
      setTimeout(function () {
        currentHour = Number($('.current-hour').text());
        currentMinute = Number($('.current-minute').text());

        if (currentHour > 12) {
          $(currentHour).text(currentHour - 12);
        }

        console.log(currentHour);
        console.log(currentMinute);
      }, 500)
    }
  }
}]);
