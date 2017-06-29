app.factory('weatherData', function () {
  var data = { notRetrieved: true, error: false };
  
  return {
    get: function () {
      return data;
    },
    set: function (_data) {
      data = _data;
    }
  }
});
