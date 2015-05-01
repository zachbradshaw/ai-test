app.factory('Time', [function () {

  return Time;

  function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
  }

  function currentTime () {
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

}]);
