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

axios.get(geoCodeUrl).then( (response) => {
  console.log(response.data);
}).catch( (e) => {
  console.log(e);
});
