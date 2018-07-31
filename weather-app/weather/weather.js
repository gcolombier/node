
var request = require('request');

var getWeather = (latitude,longitude, callback) => {
  request({
    url:`https://api.darksky.net/forecast/4b38bc41506beb66ce325bdc2cb3a096/${latitude},${longitude}`,
    json:true
  },(error,response,body) => {
    if (!error && response.statusCode == 200) {
      callback(undefined, {
        temperature:body.currently.temperature,
        apparentTemperature:body.currently.apparentTemperature
      });
    }
    else {
      callback('Unable to fetch weather.');
    }
  });
};

module.exports.getWeather = getWeather;
