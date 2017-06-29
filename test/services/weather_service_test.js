"use strict";

describe('weatherService', function() {
  var weatherService, tester;

  beforeEach(function() {
    tester = ngMidwayTester('weatherApp');
    weatherService = tester.inject('weatherService');
  });

  afterEach(function() {
      tester.destroy();
      tester = null;
  });


  it("returns weather in Berlin", function(done) {
    weatherService.getWeatherByCity('Berlin').then(function(data) {
      expect(data.icon).toMatch(/[0-9][0-9][dn]/);
      expect(data.description).toMatch(/[a-z ]+/);
      expect(data.requestedCity).toBe('Berlin');
      expect(data.returnedCity).toBe('Berlin');
      expect(data.temperature).toEqual(jasmine.any(Number));
      expect(data.error).toBe(false)
      done()
    },
    function(data) {
        done()
        // should not be called
        expect(false).toBe(true)
      }
    );
  });

  it("returns weather in the best match city", function(done) {
    weatherService.getWeatherByCity('berlin').then(function(data) {
      expect(data.icon).toMatch(/[0-9][0-9][dn]/);
      expect(data.description).toMatch(/[a-z ]+/);
      expect(data.requestedCity).toBe('berlin');
      expect(data.returnedCity).toBe('Berlin');
      expect(data.temperature).toEqual(jasmine.any(Number));
      expect(data.error).toBe(false)
      done()
    },
    function(data) {
        done()
        // should not be called
        expect(false).toBe(true)
      }
    );
  });

  it("does not return weather in non existing city", function(done) {
    weatherService.getWeatherByCity('2435sa234fadsf').then(
      function(data) {
        done()
        // should not be called
        expect(false).toBe(true)
      },
      function(data) {
        expect(data.error).toBe('Error: Not found city');
        expect(data.notRetrieved).toBe(true);
        done()
      }
    );
  });

});
