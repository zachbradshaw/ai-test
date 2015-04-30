// app.factory('Time', [function () {
// 	var self = this;

// 	function checkTime(i) {
//     if (i < 10) {
//       i = "0" + i;
//     }
//     	return i;
//   	}

//   self.currentTime = function() {
//     var today = new Date();
//     var h = today.getHours();
//     var m = today.getMinutes();
    
//     m = checkTime(m);

//     if (h < 12) {
//       m = m + ' AM';
//     } else {
//       m = m + ' PM'
//     }

//     if (h > 12) {
//       h = h - 12;
//     }
//     document.querySelector('.current-time').innerHTML = 'Current Time: ' + h + ":" + m;
//     t = setTimeout(function () {
//         $scope.currentTime();
//     }, 500);
//   }

//   return self.currentTime();
// }]);