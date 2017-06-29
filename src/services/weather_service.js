app.factory('weatherService', ['$http', '$q', function($http, $q) {
 function getWeatherByCity(city) {
     var deferred = $q.defer();
     var apiKey = '490c1a3c1282a1eccfd1bd4dc312032f';
     $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&mode=json&units=metric&APPID=' + apiKey).then(
        function(data) {
            deferred.resolve({ 
                icon: data.data.weather[0].icon,
                description: data.data.weather[0].description,
                temperature: data.data.main.temp,
                requestedCity: city,
                returnedCity: data.data.name,
                error: false
            });           
         },
         function(err) {
            var error = typeof(err.data.message) != 'undefined' ? err.data.message : 'unknown'
             deferred.reject({error: error, notRetrieved: true });
         });

         return deferred.promise;
     }
     return {
         getWeatherByCity: getWeatherByCity
     };
 }]); 