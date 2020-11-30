$(document).ready(function(){
    console.log("start");
    initial();
})

var canvas;
var ctx;


function eventListeners(){
    // if click on the dots
    var startLine = false;
    var startingPoint;
    var sX, sY;
    var keepLoop = true;
    $("#a-StarCanvas").click(function(evt){
        console.log("touched")
        var canvas = document.getElementById("a-StarCanvas");
        var mousex, mousey;
        
        var hold = getMousePos(canvas, evt);

        mousex = hold[0] - 10;
        mousey = hold[1] - 10;

        var i, x;
        var found = false;
        for (i = 0; i < masterPoint.length; i++){
            for(x = 0; x < masterPoint[i].length; x++){

                // console.log(i, x)
                
                if (masterPoint[i][x].clickedOn(mousex, mousey,30)){
                    found = true;
                    break;
                }
                
            }
            if (found){
                break;
            }
            
        }
        if (found){
            console.log("found")
            if (startLine){
                if (1 == Math.abs(sX - x) + Math.abs(sY - i)){
                    
                    startingPoint.activate();
                    startingPoint.addConnection("" + x + i, masterPoint[i][x]);
                    masterPoint[i][x].activate()
                    masterPoint[i][x].addConnection("" +sX +sY, startingPoint);
                    ctx.beginPath();
                    ctx.moveTo(masterPoint[i][x].x, masterPoint[i][x].y);
                    ctx.lineTo(startingPoint.x, startingPoint.y);
                    ctx.lineWidth = 5;
                    ctx.strokeStyle = "pink";
                    ctx.stroke();
                    keepLoop = false;
                }
                else{
                    console.log(Math.abs(sX - x) + Math.abs(sY - i))
                    // console.log((sX - x) + Math.abs(sY - i))
                    console.log(Math.abs(sX - x))
                    console.log(sY )


                    console.log("point selected is not ajacent to the starting point");
                }
                startLine = false;
            }
            else{
                console.log("set starting point to " + x, i)
                startLine = true;
                keepLoop = true;
                startingPoint = masterPoint[i][x];
                sY= i;
                sX =x;

                // // save the state of  the canvas here // need async function // extra - comeback
                // var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
                // while (keepLoop == true){
                // // show a line connecting the curser to the connected point
                //     hold = getMousePos(canvas, evt);
                //     mousex = hold[0] - 10;
                //     mousey = hold[1] - 10;

                //     ctx.beginPath();
                //     ctx.moveTo(startingPoint.x, startingPoint.y);
                //     ctx.lineTo(mousex, mousey);
                //     ctx.lineWidth = 5;
                //     ctx.strokeStyle = "pink";
                //     ctx.stroke();

                //     setTimeout(function () {
                //         // return the canvas to the state befor 
                //         ctx.putImageData(imageData, 0, 0);
                //     }, 1000);
                // }
                


                
                
            }
            
        }
    });
}


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return [evt.clientX - rect.left,
      evt.clientY - rect.top]
    ;
}
class Square {
    // x, y E [0, 5]
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.active = true;
        this.distanceFromTarget = 10 - (x + y);

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
        this.listOfConnectedPoints ={};

    }

    activate() {
        this.active = true;
    }
    // dictionary that holds the XY key and point object as the value
    addConnection(xy, point){
        if (!(xy in this.listOfConnectedPoints)){
            
            this.listOfConnectedPoints[xy] = point; 
            console.log(this.listOfConnectedPoints)
        }
        else{
            console.log("already in the dict")
        }
    }
    clickedOn(mouseX, mouseY, radius){
        if (radius >= Math.sqrt((mouseX - this.x)**2 + (mouseY - this.y)**2)){
            return true;
        }
        else{
            return false;
        }
    }
}


var masterPoint = [];
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
    canvas = document.getElementById("a-StarCanvas");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    holdy = 0;
    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.fillText("A",25,50)
    for (var i = 0; i< 7; i ++){
        var holdx = 0;
        // create new row
        masterPoint.push([])
        for (var x = 0; x< 7; x ++){
            // draw the point
            ctx.beginPath();
            ctx.arc(holdx, holdy, 10, 0, 2 * Math.PI);
            ctx.fill();
            // create new point in row
            masterPoint[i].push(new Point(holdx, holdy));

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
    // create barriers
    eventListeners();
    // testing the next to: code
    // console.log(masterSquare[0][0])
    console.log(masterSquare[0][5].findNearbyActiveSquares(masterSquare));

}