app.component('showWeather', {
  templateUrl: '../show_weather/show_weather.html',
  controller: 'showWeatherController'
});

app.controller('showWeatherController', ['$scope', 'weatherData', function($scope, weatherData) {
  $scope.notRetrieved = function(){
    return weatherData.get().notRetrieved;
  }

  $scope.city = function() {
    return weatherData.get().returnedCity;
  }

  $scope.temperature = function() {
    return weatherData.get().temperature;
  }

  $scope.icon = function() {
    return weatherData.get().icon;
  }

  $scope.description = function() {
    return weatherData.get().description;
  }

  $scope.error = function() {
    if (weatherData.get().error == 'Error: Not found city')
      return 'cityNotFound';
    else if (weatherData.get().requestedCity != weatherData.get().returnedCity)
      return 'wrongCity';
    else
      return 'allRight';
  }
}]);