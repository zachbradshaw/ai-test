angular.module('fakeCo')
.controller('timeController', function ($scope) {

  $scope.displayTime = function() {
    var today = moment().format('h:mm A');

    document.querySelector('.current-time').innerHTML = 'Current time: ' + today
    t = setTimeout(function () {
        $scope.displayTime();
    }, 500);
  }
})
