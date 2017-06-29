"use strict";

describe('byCity', function() {
  var tester, weatherService, weatherData, scope, controller;

  beforeEach(function() {
    tester = ngMidwayTester('weatherApp');
    weatherService = tester.inject('weatherService');
    weatherData = tester.inject('weatherData');
  });

  beforeEach(module('weatherApp'));

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('byCityController', { $scope: scope, weatherService: weatherService, weatherData: weatherData })
  }));


  afterEach(function() {
      tester.destroy();
      tester = null;
  });

  it("it reads weather data and stores it in data", function(done) {
      expect(scope.city).toBe(null)
      var data = weatherData.get()
      expect(data['description']).toBeUndefined();
      scope.city = 'Berlin'
      scope.submit();
      setTimeout(function(){
        data = weatherData.get()
        expect(data.description).toMatch(/[a-z ]+/);
        done()
      }, 3000);
  });

});
