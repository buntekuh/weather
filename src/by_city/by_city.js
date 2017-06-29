app.component('byCity', {
  templateUrl: '../by_city/by_city.html',
  controller: 'byCityController'
});

app.controller('byCityController', ['$scope', 'weatherService', 'weatherData', function($scope, weatherService, weatherData) {
  $scope.city = null;
  $scope.submit = function() {
    weatherService.getWeatherByCity($scope.city).then(
      function(data) {
        weatherData.set(data);
      },
      function(data) {
        weatherData.set(data);
      }
    );
  }
}]);