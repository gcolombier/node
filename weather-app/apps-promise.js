const yargs = require('yargs');

const axios = require('axios');

const argv = yargs
   .options({
     a:{
       demand:true,
       alias:'address',
       describe:'Address to fetch weather for',
       string:true
     }
   })
   .help()
   .alias('help','h')
   .argv;

 console.log(argv);

var encodedAddress = encodeURIComponent(argv.address);
var geoCodeUrl=`http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
// var geoCodeUrl=`http://maps.googleapis.com/maps/api/gcode/json?address=${encodedAddress}`;

axios.get(geoCodeUrl).then( (response) => {
  if (response.data.status ==='ZERO_RESULTS' ) {
    throw new Error('Unable to find that address');
  }
  var latitude = response.data.results[0].geometry.location.lat;
  var longitude = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/4b38bc41506beb66ce325bdc2cb3a096/${latitude},${longitude}`
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then( (response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currentl ${temperature}, it feels like ${apparentTemperature}`);
}).catch( (error) => {
  console.log(error);
  if (error.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(error.message);
  }
});
