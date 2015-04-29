app.controller('apptController', function ($http, $scope) {

  var url = 'http://fake-co-calendar.herokuapp.com/api/v1/events?callback=JSON_CALLBACK';

  $scope.meetingRooms = ['Main Conference Room',
                        'Room A',
                        'Room B',
                        'Room C',
                        'Room D',
                        'Room E',
                        'Room F',
                        'Room G',
                        'Room H']

  $http.jsonp(url).success(function (d) {
    $scope.appts = d.events.list;
    console.log($scope.appts);
  })
});
