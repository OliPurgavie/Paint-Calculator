///*=========================
//
// PAINT CALCULATOR APP
//
//=========================*/


/*=========================

CODE CONTENTS:

1. Additional Walls
3. Additional Exclusion Areas
5. Calculating Amount of Paint

=========================*/


/*=========================
1. ADDITIONAL WALLS
=========================*/
// Finding the Add Wall Button & Set Current No. of Walls
let addWall = document.getElementById("add-wall");
let noOfWalls = 1;

// On Add Walls Button Click, Add New Wall
addWall.onclick = function() {
    noOfWalls++;
    console.log(noOfWalls);

    // Adding the HTML to Allow for Another Wall
    let wallsArea = document.getElementById("walls-holder");
    wallsArea.insertAdjacentHTML("beforeend",
        `<div class='row mb-3'>
            <p class='m-0 fw-semibold'>Wall ${noOfWalls}</p>
            <div class='col-md-5'>
                <label for='wall-h-${noOfWalls}' class='fs-7'>Height</label>
                <div class='input-group'>
                    <input type='number' min='0' value='0' id='wall-h-${noOfWalls}' class='form-control' />
                    <span class='input-group-text'>m</span>
                </div>
            </div>
            <div class='col-md-5'>
                <label for='wall-w-${noOfWalls}' class='fs-7'>Width</label>
                <div class='input-group'>
                    <input type='number' min='0' value='0' id='wall-w-${noOfWalls}' class='form-control' />
                    <span class='input-group-text'>m</span>
                </div>
            </div>
        </div>`);
}


/*=========================
2. ADDITIONAL EXCLUSION AREAS
=========================*/
// Finding the Add Exclusion Area Button & Set Current No. of Exclusion Areas
let addExcludeArea = document.getElementById("add-exclude-area");
let noOfExcludeAreas = 1;

// On Add Area Button Click, Add New Exclusion Area
addExcludeArea.onclick = function() {
    noOfExcludeAreas++;
    console.log(noOfExcludeAreas);

    // Adding the HTML to Allow for Another Exclusion Area
    let excludeArea = document.getElementById("exclude-area-holder");
    excludeArea.insertAdjacentHTML("beforeend",
        `<div class='row mb-3'>
            <p class='m-0 fw-semibold'>Wall ${noOfExcludeAreas}</p>
            <div class='col-md-5'>
                <label for='area-h-${noOfExcludeAreas}' class='fs-7'>Height</label>
                <div class='input-group'>
                    <input type='number' min='0' value='0' id='area-h-${noOfExcludeAreas}' class='form-control' />
                    <span class='input-group-text'>m</span>
                </div>
            </div>
            <div class='col-md-5'>
                <label for='area-w-${noOfExcludeAreas}' class='fs-7'>Width</label>
                <div class='input-group'>
                    <input type='number' min='0' value='0' id='area-w-${noOfExcludeAreas}' class='form-control' />
                    <span class='input-group-text'>m</span>
                </div>
            </div>
        </div>`);
}


/*=========================
3. CALCULATING AMOUNT OF PAINT
=========================*/
// Finding the Submit Button
let submit = document.getElementById("calculate-btn");

// Setting Values for Areas of Doors and Double Doors
const doorArea = 1.5;
const dDoorArea = 3;

// On Calculate Button Click
submit.onclick = function() {
    // Set the Total Surface Area to 0
    let surface = 0;

    // For Each Wall Work Out Surface Area and Add to Running Total
    for (i=0; i<noOfWalls; i++) {
        let wHeightVar = 'wall-h-' + parseInt(i+1);
        let wWidthVar = 'wall-w-' + parseInt(i+1);

        let wHeightValue = document.getElementById(wHeightVar).value;
        let wWidthValue = document.getElementById(wWidthVar).value;

        surface = surface + (wHeightValue * wWidthValue);
    }

    // For Each Exclusion Block Work Out Surface Area and Subtract from Running Total
    for (i=0; i<noOfExcludeAreas; i++) {
        let heightVar = 'area-h-' + parseInt(i+1);
        let widthVar = 'area-w-' + parseInt(i+1);

        let heightValue = document.getElementById(heightVar).value;
        let widthValue = document.getElementById(widthVar).value;
        
        surface = surface - (heightValue * widthValue);
    }


    // Get Number of Doors and Double Doors and Subtract Surface Area from Running Total
    let inputDoors = parseInt(document.getElementById("doors-input").value);
    let inputDoubleDoors = parseInt(document.getElementById("double-doors-input").value);
    surface = surface - (inputDoors * doorArea) - (inputDoubleDoors * dDoorArea);

    // Converts Total Surface Area to Paint in L
    let surfaceToPaint = surface/10;

    // Gets the Number of Coats and Calculate Total Amount of Paint
    const noOfCoats = parseInt(document.querySelector('input[name="no-coats"]:checked').value);
    let tPaint = surfaceToPaint * noOfCoats;
    let totalPaint = Math.round(tPaint * 10)/10;

    // Declare Output Variable
    let output;

    // Add Extra 10% If Selected
    let extra10 = document.getElementById("extra-10").checked;
    if(extra10) {
        output = Math.ceil(totalPaint + (totalPaint / 10));
    } else {
        output = totalPaint;
    }

    // Get Area to Display Output & Display
    let paintText = document.getElementById("total-paint");
    let surfaceText = document.getElementById("total-surface");
    paintText.innerHTML = output;
    surfaceText.innerHTML = surface;

    // Work Out Which paints to get

    let extraInfo = document.getElementById("results-extra");
    if(output > 0) {
        let extraOutput = `<ul>`;

        // Find out how many 10l Tins
        let noOf10Litres = Math.floor(output/10);
        if (noOf10Litres > 0) {
            extraOutput += `<li>${noOf10Litres} x 10 Litre Tins</li>`;
        }
        let leftover = output % 10;

        // Find out how many 7.5l Tins
        let noOf7_5Litres = Math.floor(leftover/7.5);
        if (noOf7_5Litres > 0) {
            extraOutput += `<li>${noOf7_5Litres} x 7.5 Litre Tins</li>`;
        }
        leftover = leftover % 7.5;

        // Find out how many 5l Tins
        let noOf5Litres = Math.floor(leftover/5);
        if (noOf5Litres > 0) {
            extraOutput += `<li>${noOf5Litres} x 5 Litre Tins</li>`;
        }
        leftover = leftover % 5;

        // Find out how many 2.5l Tins
        let noOf2_5Litres = Math.floor(leftover/2.5);
        if (noOf2_5Litres > 0) {
            extraOutput += `<li>${noOf2_5Litres} x 2.5 Litre Tins</li>`;
        }
        leftover = leftover % 2.5;

        // Find out how many 1.25l Tins
        let noOf1_25Litres = Math.floor(leftover/1.25);
        if (noOf1_25Litres > 0) {
            extraOutput += `<li>${noOf1_25Litres} x 1.25 Litre Tins</li>`;
        }
        leftover = leftover % 1.25;

        // Find out how many 0.75l Tins
        let noOf0_75Litres = Math.ceil(leftover/0.75);
        if (noOf0_75Litres > 0) {
            extraOutput += `<li>${noOf0_75Litres} x 0.75 Litre Tins</li>`;
        }
        extraOutput += `</ul>`;
        extraInfo.innerHTML = extraOutput;

        // Calculate Estimate Costs for 5 Brands
        let brand1 = Math.ceil(output * 7.9);
        let brand2 = Math.ceil(output * 9.2);
        let brand3 = Math.ceil(output * 7.2);
        let brand4 = Math.ceil(output * 20.8);
        let brand5 = Math.ceil(output * 16.4);

        // Display Estimate Costs in Table
        let estimateCosts = 
            `<table class='table'>
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Est. Cost</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Dulux</td>
                        <td>£${brand1}</td>
                    </tr>
                    <tr>
                        <td>Crown</td>
                        <td>£${brand2}</td>
                    </tr>
                    <tr>
                        <td>GoodHome</td>
                        <td>£${brand3}</td>
                    </tr>
                    <tr>
                        <td>Farrow & Ball</td>
                        <td>£${brand4}</td>
                    </tr>
                    <tr>
                        <td>Laura Ashley</td>
                        <td>£${brand5}</td>
                    </tr>
                </tbody>
            </table>`;

            extraInfo.innerHTML += estimateCosts;

    } else {
        extraInfo.innerHTML = `There has been an Error in Your Calculations. Please Check Your Measurements`;
    }
}