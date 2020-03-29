// This function is so the current date and time will be updated every second
setInterval(function() {
 $('#currentDay').text(moment().format('dddd') + " " + moment().format('MMMM Do YYYY, h:mm:ss a'));
}, 1000)