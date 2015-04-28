app.controller('apptController', function ($http, $scope) {

  var getAppts = {
    method: 'GET',
    url: 'http://fake-co-calendar.herokuapp.com/api/v1/events'
  }

  $scope.meetingRooms = ['Main Conference Room',
                        'Room A',
                        'Room B',
                        'Room C',
                        'Room D',
                        'Room E',
                        'Room F',
                        'Room G',
                        'Room H']

  $http(getAppts).success(function (d) {
    $scope.appts = d.events.list;
    console.log($scope.appts);
  })
});
