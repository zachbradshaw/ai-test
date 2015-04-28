angular.module('fakeCo', [])
.controller('apptController', function ($http) {

  var getAppts = {
    method: 'GET',
    url: 'http://fake-co-calendar.herokuapp.com/api/v1/events'
  }

  $http(getAppts).success(function (d) {
    console.log(d);
  })
});
