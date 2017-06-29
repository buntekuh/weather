"use strict";

describe('showWeather', function() {
  var weatherData, scope, controller;

  beforeEach(module('weatherApp'));

  beforeEach(inject(function ($rootScope, $controller, _weatherData_) {
    weatherData = _weatherData_;
    scope = $rootScope.$new();
    controller = $controller('showWeatherController', { $scope: scope, weatherData: weatherData })
    weatherData.set({
      notRetrieved: true,
      returnedCity: 'Oslo',
      temperature: 24,
      icon: 'nico',
      description: 'mainly cloudy'
    });
  }));

  it("reads notRetrieved", function() {
      expect(scope.notRetrieved()).toBe(true)
  });

  it("reads city", function() {
      expect(scope.city()).toBe('Oslo')
  });

  it("reads temperature", function() {
      expect(scope.temperature()).toBe(24)
  });

  it("reads icon", function() {
      expect(scope.icon()).toBe('nico')
  });

  it("reads description", function() {
      expect(scope.description()).toBe('mainly cloudy')
  });

  it("reads error", function() {
      weatherData.set({ error: 'Error: Not found city' });
      expect(scope.error()).toBe('cityNotFound');

      weatherData.set({ requestedCity: 'Sodom', returnedCity: 'Gomorrah' });
      expect(scope.error()).toBe('wrongCity');

      weatherData.set({ requestedCity: 'Jerusalem', returnedCity: 'Jerusalem' });
      expect(scope.error()).toBe('allRight');
  });
});
