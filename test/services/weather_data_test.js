describe('weatherData', function() {
    var app;
    var readScope, writeScope;
    var weatherData;

    app = angular.module('weatherApp');

    app.controller('readController', function($scope, weatherData) {
      $scope.read = function() {
        return weatherData.get();
      }
    });

    app.controller('writeController', function($scope, weatherData) {
      $scope.write = function(data) {
        weatherData.set(data);
      }
    });

    beforeEach(module('weatherApp'));

    beforeEach(inject(function ($rootScope, $controller, _weatherData_) {
      readScope = $rootScope.$new();
      writeScope = $rootScope.$new();
      weatherData = _weatherData_;
      createReadController = function() {
        return $controller('readController', {
            '$scope': readScope
        });
      };
      createWriteController = function() {
        return $controller('writeController', {
            '$scope': writeScope
        });
      };
    }));

    it('should have default values', function() {
        var controller = createReadController();
        expect(readScope.read().notRetrieved).toBe(true);
        expect(readScope.read().error).toBe(false);
    });

    it('data written in one controller should be readable in another', function() {
        var readController = createReadController();
        var writeController = createWriteController();
        writeScope.write({data: 'new data'})
        expect(readScope.read().data).toBe('new data');
    });
});