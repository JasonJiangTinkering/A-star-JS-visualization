$(document).ready(function(){
    console.log("start");
    initial();
})

class Square {
    // x, y E [0, 5]
    constructor(myx, myy){
        console.log(myy)
        this.x = myx;
        this.y = myy;
        this.active = true;
        this.distanceFromTarget = 10 - (myx + myy);

    }

    deactivate() {
        this.active = false;
    }

    // find the squares that next to this one and is active
    findNearbyActiveSquares(){
        let list = masterSquare;
        let myReturnList = [];
        //check square to the left
        if (this.x > 0){
            if (list[this.y][this.x - 1].active){
                myReturnList.push(list[this.y][this.x - 1]);
            }
        }
        // check square above
        if (this.y > 0){
            if (list[this.y - 1][this.x].active){
                myReturnList.push(list[this.y - 1][this.x]);
            }
        }
        //check square to the right
        if (this.x < 5){
            if (list[this.y][this.x + 1].active){
                myReturnList.push(list[this.y][this.x + 1]);
            }
        }
        // check square below
        if (this.y < 5){
            if (list[this.y + 1][this.x].active){
                myReturnList.push(list[this.y + 1][this.x]);
            }
        }
        return myReturnList;
    }
}

class Point{
   // x, y E [0, 6]
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.active = false;
        this.connectedTo = [];
    }

    activate() {
        this.active = true;
    }
}


var masterPoint = [];
for (var i = 0; i< 7; i ++){
    // create new row
    masterPoint.push([]);    
    for (var x = 0; x< 7; x ++){
        // create new point in row
        masterPoint[i].push(new Point(x, i));

    }
}
var masterSquare = [];
for (var i = 0; i< 6; i ++){
    // create new row
    masterSquare.push([]);
    for (var x = 0; x< 6; x ++){
        // create new square in row
        masterSquare[i].push(new Square(x, i));
    }
}

// create the 7 by 7 grid
function my7x7(){
    var canvas = document.getElementById("a-StarCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    holdy = 0;
    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.fillText("A",25,50)
    for (var i = 0; i< 7; i ++){
        var holdx = 0;

        for (var x = 0; x< 7; x ++){
            // draw the point
            ctx.beginPath();
            ctx.arc(holdx, holdy, 10, 0, 2 * Math.PI);
            ctx.fill();
            holdx += canvas.clientWidth / 6;  
        }
        holdy += canvas.clientHeight / 6;

        
    }
    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.fillText("B",holdx - canvas.clientWidth / 6 -50, holdy - 100)
    
    
    console.log(masterSquare)
    // console.log(masterPoint)
    // ctx.fillRect(0, 0, 150, 75);
}

function search(){

}
function initial(){
    // create the 7 by 7 grid
    my7x7();

    // testing the next to: code
    // console.log(masterSquare[0][0])
    console.log(masterSquare[0][5].findNearbyActiveSquares(masterSquare));

}