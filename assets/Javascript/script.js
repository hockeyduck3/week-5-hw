// Trigger the load function
load();

function load() {
    // This line of code will make sure that there's no delay in setting the text content of currentDay
    // Without this line of code, it would take 2-3 seconds for the text content of currentDay to actually be shown  
    $('#currentDay').text(moment().format('dddd') + " " + moment().format('MMMM Do YYYY, h:mm:ss a'));

    // This function is so the current date and time will be updated every second
    setInterval(function() {
        $('#currentDay').text(moment().format('dddd') + " " + moment().format('MMMM Do YYYY, h:mm:ss a'));
    }, 1000)
}

// Index is set to -1 so that way in the for loop below the first index after index++ will be 0
let index = -1;

// This variable lets the for loop know when to add the class of 'future' to the text area's
let past = true;

// This switch will check and see if the time is between 12am and 8am
// If the time is between 12am and 8am, then it will set the var past to false because the previous work day is now finished
switch(moment().format('ha')) {
    case '12am':
        past = false;
        break;
    case '1am':
        past = false;
        break;
    case '2am':
        past = false;
        break;
    case '3am':
        past = false;
        break;
    case '4am':
        past = false;
        break;
    case '5am':
        past = false;
        break;
    case '6am':
        past = false;
        break;
    case '7am':
        past = false;
        break;
    case '8am':
        past = false;
        break;
    default:
        break;
}

// This for loop will add the proper coloring to text area's
for (let i = 0; i < 9; i++) {
    index++;
    
    // If the text of time-index is equal to the current hour. 'ha' in .format() means hour(h) and am/pm(a) 
    if ($(`#time-${index}`).text() === moment().format('ha')) {

        // Add the class of present to the text area
        $(`#textArea${index}`).addClass('present');
        
        // Remove the disabled attribute from the text area so the user can type in it
        $(`#textArea${index}`).removeAttr('disabled');
        // Remove the disabled attribute from the save button so the user can save what they're typing
        $(`.saveBtn${index}`).removeAttr('disabled');
        
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

            // Remove the disabled attribute from the save button so the user can save what they're typing
            $(`.saveBtn${index}`).removeAttr('disabled');
        }
    }
}

// saveList will innitially be set to an empty array
let saveList = [];

// If the user saved anything to the localStorage
if (JSON.parse(localStorage.getItem('storage')) !== null) {
    // Then the saveList array will be overwritten by what's in the localStorage
    saveList = (JSON.parse(localStorage.getItem('storage')));

    // This if statement will check and see if the saveList from localStorage is old or not
    if (moment().format("MMM Do") === saveList[0].date) {
        // If it's not old then this for loop will go in and add the text content back to it's appropriate text area
        for (let i = 0; i < saveList.length; i++) {
            $(`#${saveList[i].id}`).text(saveList[i].value);
        }
    } 
    // If the saveList data from localStorage is old
    else {
        // Then this will remove it from the localStorage
        localStorage.removeItem('storage');
        // And reset saveList back to an empty array
        saveList = [];
    }
}

// The function will activate when any button on the document is clicked
$('button').click(function() {
    // This will grab the id of the textarea within the div of the button and assign it to the variable of id
    let id = $(this).prev('textarea').attr('id');

    // This will grab the text content of the textarea within the div of the button and assign it to the variable of value
    let value = $(this).prev('textarea').val();

    // Get rid of any empty white space in the value
    value = $.trim(value);

    // This if statement will check and see if the text content is blank or not
    if (value === '' || value.match(/[a-z]/i) == null) {
        return;
    } else {
        // Save the current date to the variable date
        let date = moment().format("MMM Do");

        // This variable will grab the var's date, id, value, and save them to the object save
        let save = {
            date: date,
            id: id,
            value: value
        };

        // This quick function will check and see if there already is an entry with the same id in saveList
        let checkIf = saveList.findIndex((event) => event.id === save.id);

        // If there isn't an entry with the same id, then a new one will be made and added
        if (checkIf === -1) {
            saveList.push(save);
        }
        // If there is an entry with the same id, then that entry will be overwritten
        else {
            saveList[checkIf] = save;
        }

        // Then save the array to the user's localStorage
        localStorage.setItem('storage', JSON.stringify(saveList));
    }
})