// Two new variables for getting the user's time preference from the local storage, and a blank variable that will be used later.
let clockTime = localStorage.getItem('clock');
let timeForm;

// Check and see if clockTime is in local storage
if (clockTime == null) {
    // If it's not then set it to local storage
    localStorage.setItem('clock', 12);
    // And set these two variables to 12 hour format
    clockTime = 12;
    timeForm = moment().format('ha');
} 
// If it is, then check and see if the user prefered 12 hour format
else if (clockTime == 12) {
    // If true then set timeForm to 12 hour
    timeForm = moment().format('ha');
}
// If it is in local storage and the user prefers 24 hour format 
else {
    // Make sure the toggle switch is set to on
    $('#customSwitch1').prop('checked', true);
    // Set timeForm to 24 hour
    timeForm = moment().format('H');
}

// Function for the toggle switch
$('#customSwitch1').on('change', function() {
    // If the switch is set to on
    if ($(this).prop('checked') === true) {
        // Change the 'clock' in local storage to 24
        localStorage.setItem('clock', 24);
        // Then reload the page
        location.reload();
    }
    // If the switch is set to off
    else {
        // Change the 'clock' in local storage to 12
        localStorage.setItem('clock', 12);
        // Then reload the page
        location.reload();
    }
})

// Trigger the load function
load();

function load() {
    // Set format to a blank variable
    let format;

    // The user prefers 12 hour format
    if (clockTime == 12) {
        // Set format to 12 hour
        format = 'MMMM Do YYYY, h:mm:ss a';    
    }
    // If the user prefers 24 hour format 
    else {
        // Set format to 24 hour
        format = 'MMMM Do YYYY, H:mm:ss'
    }

    // This line of code will make sure that there's no delay in setting the text content of currentDay
    // Without this line of code, it would take 2-3 seconds for the text content of currentDay to actually be shown  
    $('#currentDay').text(moment().format('dddd') + " " + moment().format(format));

    // This function is so the current date and time will be updated every second
    setInterval(function() {
        $('#currentDay').text(moment().format('dddd') + " " + moment().format(format));
    }, 1000)
}


// Index is set to -1 so that way in the for loop below the first index after index++ will be 0
let index = -1;

// This variable lets the for loop know when to add the class of 'future' to the text area's
let past = true;

// Trigger the loadText function
loadText();

// Depending on the user's preferance, this function will set the times to the left of the text area to their appropriate formats.
function loadText() {
    // Variables needed for the for loops
    let textNum = 8;
    let am_pm = 'am';

    // If the user prefers 12 hour format
    if (clockTime == 12) {
        for (let i = 0; i < 9; i++) {
            index++;
            textNum++;
    
            $(`#time-${index}`).text(`${textNum}${am_pm}`);
            if (textNum == 11) {
                am_pm = 'pm';
            } else if (textNum == 12) {
                textNum = 0;
            }
        }
    } 
    // Or if the user prefers 24 hour format
    else {
        for (let i = 0; i < 9; i++) {
            index++;
            textNum++

            // In 24 hour format, any number before 10 is first met with a 0.
            // For example, 1am is 01:00 in 24 hour format.
            if (textNum == 9) {
                // Make sure the 0 is in front of 9
                $(`#time-${index}`).text(`0${textNum}:00`);
            } else {
                // Take the first 0 out
                $(`#time-${index}`).text(`${textNum}:00`);
            }
        }
    }

    // Reset the index back to -1 for the other for loops
    index = -1
}
// This switch will check and see if the time is between 12am and 8am
// If the time is between 12am and 8am, then it will set the var past to false because the previous work day is now finished

// If clockTime is set to 12
if (clockTime == 12) {
    // This switch will run
    switch(timeForm) {
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
} 
// Or if clockTime is set to 24
else {
    // Then this switch will run
    switch(timeForm) {
        case '0':
            past = false;
            break;
        case '1':
            past = false;
            break;
        case '2':
            past = false;
            break;
        case '3':
            past = false;
            break;
        case '4':
            past = false;
            break;
        case '5':
            past = false;
            break;
        case '6':
            past = false;
            break;
        case '7':
            past = false;
            break;
        case '8':
            past = false;
            break;
        default:
            break;
    }
}

// This for loop will add the proper coloring to text area's
for (let i = 0; i < 9; i++) {
    index++;
    
    // If the text of time-index is equal to the current hour. 
    if ($(`#time-${index}`).text() === timeForm || $(`#time-${index}`).text() === `${timeForm}:00` || $(`#time-${index}`).text() === `0${timeForm}:00`) {

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
            // Then add the disabled attribute to the save button so the user won't be able to click the save button
            $(`.saveBtn${index}`).attr('disabled', 'disabled');
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
        // This if statement will check and see if the text content is blank or not
        if (value === '' || value.match(/[a-z]/i) == null) {
            // If it is empty, then the code will return nothing and won't save anything to the local storage
            return;
        } else {
            // If value is not empty or just numbers, then the save object will be add to the array saveList.
            saveList.push(save);
        }
    }
    // If there is an entry with the same id
    else {
        // Check and see if the value is blank, if it's blank then this code acts as a way to delete an entry from the code.
        if (value === '' || value.match(/[a-z]/i) == null) {
            // If the value is blank then it will be deleted from the local storage
            saveList.splice(event, 1)
        } else {
            // If the value is not blank, then the value in local storage will be overwritten by the new value.
            saveList[checkIf] = save;
        }
    }

    // Then save the array to the user's localStorage
    localStorage.setItem('storage', JSON.stringify(saveList));

    // This if statement will check and see if saveList is empty
    if (saveList[0] == undefined) {
        // If it is empty, then the array will be deleted from the local storage. This way, it won't cause any issues with the rest of the code.
        localStorage.removeItem('storage');
    }
})