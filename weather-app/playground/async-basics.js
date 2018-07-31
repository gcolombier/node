console.log('Starting App');

setTimeout(() => {
  console.log('inside the callback');
},2000);

setTimeout(() => {
  console.log('this is the second callback');
},0);

console.log('Finishing up');
