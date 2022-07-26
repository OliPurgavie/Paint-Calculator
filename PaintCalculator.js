/*====================
PAINTING CALCULATOR
====================*/

// App Introduction
console.log('Welcome to Mr Paint\'s Paint Calculator');

// Initiate Prompt Sync
const prompt = require('prompt-sync')();

// Obtain Number of Walls
let walls = prompt('Please Enter How Many Walls you want to Paint: ');

let validInput = false;

// Get User Input for Number of Walls. Do/While Loop used until a Number is Entered that is Greater than 0
do {
    if((!isNaN(walls)) && walls > 0) {
        validInput = true;
    } else {
        walls = prompt('You\'re input is Invalid. Please Enter How Many Walls you want to Paint: ');
    } 
} while (!validInput);

// Confirm to User the Number of Walls
console.log(`You have ${walls} Walls to Paint`);

// Set Total Surface Area
let surface = 0;

// For Loop - For Each Wall, ask for Height and Width and Calculate Surface Area
for(i=0; i<walls; i++){
    let wall_no = i + 1;

    // Obtain Height of the Wall. Check it is a Number
    let height;
    do {
        height = parseFloat(prompt(`Height of Wall ${wall_no} (in Meters): `));
        if (isNaN(height)) {
            console.log('You Haven\'t Entered a Number. Please Try Again.');
        } else if (height <= 0) {
            console.log('You Can\'t Have a Negative Height. Please Try Again.');
        } 
    } while (isNaN(height) || height <= 0);

    // Obtain Width of the Wall. Check it is a Number
    let width;
    do {
        width = parseFloat(prompt(`Width of Wall ${wall_no} (in Meters): `));
        if (isNaN(width)) {
            console.log('You Haven\'t Entered a Number. Please Try Again.');
        } else if (width <= 0) {
            console.log('You Can\'t Have a Negative Width. Please Try Again.');
        } 
    } while (isNaN(width) || width <= 0);

    // Add Wall Surface Area to Total Surface Area
    surface = surface + (height * width);
}

// Obtain How Many Exclusion Areas. Check the Input is Valid
let excludes;
do {
    excludes = parseInt(prompt('How many Areas do you Need to Exclude? (Enter 0 if you have No Exclusion Areas): '));
    if (isNaN(excludes)) {
        console.log('You Haven\'t Entered a Number. Please Try Again.');
    } else if (excludes < 0) {
        console.log('You Can\'t Have a Negative Areas. Please Try Again.');
    }
} while (isNaN(excludes) || excludes < 0);

// For Loop - For Each Exclusion Area, ask for Height and Width and Calculate Surface Area
for(j=0; j<excludes; j++) {
    let exclude_no = j + 1;

    // Obtain Height of the Exclusion Area. Check it is a Number
    let e_height;
    do {
        e_height = parseFloat(prompt(`Height of Exclusion Area ${exclude_no} (in Meters): `));
        if (isNaN(e_height)) {
            console.log('You Haven\'t Entered a Number. Please Try Again.');
        } else if (e_height <= 0) {
            console.log('You Can\'t Have a Negative Height. Please Try Again.');
        } 
    } while (isNaN(e_height) || e_height <= 0);

    // Obtain Width of the Exclusion Area. Check it is a Number
    let e_width;
    do {
        e_width = parseFloat(prompt(`Width of Exclusion Area ${exclude_no} (in Meters): `));
        if (isNaN(e_width)) {
            console.log('You Haven\'t Entered a Number. Please Try Again.');
        } else if (e_width <= 0) {
            console.log('You Can\'t Have a Negative Width. Please Try Again.');
        } 
    } while (isNaN(e_width) || e_width <= 0);

    // Remove Area from the Total Surface Area
    surface = surface - (e_height * e_width);
}

// Check that the Total Surface Area is More than 0
if (surface <= 0) {
    console.log('There Has Been an Error! You are Excluding More than you Have. Please Restart.');
}

// Output the Total Surface Area
console.log(`You have a Total Surface Area of ${surface} meters squared`)

// Ask User for Number of Coats
let coats = parseInt(prompt('How Many Coats Do You Want to Use - 1, 2 or 3?: '));
let coatsValid = false;

// Check the Number is Valid and Between 1-3
do {
    if((!isNaN(coats)) && (coats > 0) && (coats < 4)) {
        coatsValid = true;
    } else {
        coats = prompt('You\'re input is Invalid. Please Enter How Many Coats you Want: ');
    } 
} while (!coatsValid);

// Total Paint Amount Calculations
let paint = surface/10;
paint = paint * coats;
let total = Math.round(paint * 10)/10;
let extra = Math.ceil(total + (total / 10));


// Output to User. Total and Total with 10% Extra
console.log(`Based on ${walls} Walls, the ${excludes} Exclusion Areas and ${coats} Coats, you will need ${total} litres of Paint`);
console.log(`We would Advise that you buy 10% Extra, so you should be looking to get ${extra} litres of Paint`);

// Prices, Colours