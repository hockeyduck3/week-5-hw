// This function is so the current date and time will be updated every second
setInterval(function() {
 $('#currentDay').text(moment().format('dddd') + " " + moment().format('MMMM Do YYYY, h:mm:ss a'));
}, 1000)

// Index is set to -1 so that way in the for loop below the first index after index++ will be 0
let index = -1;

// This variable lets the for loop know when to add the class of 'future' to the text area's
let past = true;

// This for loop will add the proper coloring to text area's
for (let i = 0; i < 9; i++) {
    index++;
    // If the text of time-index is equal to the current hour. 'ha' in .format() means hour(h) and am/pm(a) 
    if ($(`#time-${index}`).text() === moment().format('ha')) {
        // Add the class of present to the text area
        $(`#textArea${index}`).addClass('present');
        // Remove the disabled attribute from the text area so the user can type in it
        $(`#textArea${index}`).removeAttr('disabled');
        // Set the var past to false so any other text area's will have the future class set to them, not the past class.
        past = false;
    } else {
        // If the var past is equal to true
        if (past) {
            // Then add the class of 'past' to the current text area
            $(`#textArea${index}`).addClass('past');
        } 
        // If the var past is equal to false
        else {
            // Then add the class of 'future' to the current text area
            $(`#textArea${index}`).addClass('future');
            // And remove the disabled attribute from the text area so the user can type in it
            $(`#textArea${index}`).removeAttr('disabled');
        }
    }
}