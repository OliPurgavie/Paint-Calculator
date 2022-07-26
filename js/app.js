// let noOfWalls = 1; 

// let element = document.getElementById("add-wall");
// element.onclick = function() {
//   console.log('Add another wall');
//   console.log(noOfWalls);
//   noOfWalls++;
//   let wall_block = document.getElementById("walls-holder");

//   wall_block.innerHTML += '<div class="row"><div class="col-md-6"><label>Height</label><input type="number" /></div><div class="col-md-6"><label>Width</label><input type="number" /></div></div>';
// }

let submit = document.getElementById("calculate-btn");

submit.onclick = function() {
    console.log('Submit Button Clicked');

    let extra10 = document.getElementById("extra-10").checked;
    console.log(extra10);

    let surface = document.getElementById("total-area").innerText;

    console.log(surface);

    let paint = document.getElementById("total-paint");

    let surfaceToPaint = surface/10;

    // Add in Coats
    //paint = paint * coats;

    
    //let total = Math.round(paint * 10)/10;
    //let extra = Math.ceil(total + (total / 10));

    if(extra10) {
        console.log('Add Extra 10');
        surfaceToPaint = surfaceToPaint + (surfaceToPaint/10);
    }

    console.log(surfaceToPaint);

    paint.innerHTML = Math.round(surfaceToPaint) + 'l';
}