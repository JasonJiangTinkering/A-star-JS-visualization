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
    // var keepLoop = true;
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
                    // keepLoop = false;
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
                // keepLoop = true;

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

                // ctx.beginPath();
                // ctx.moveTo(startingPoint.x, startingPoint.y);
                // ctx.lineTo(mousex, mousey);
                // ctx.lineWidth = 5;
                // ctx.strokeStyle = "pink";
                // ctx.stroke();

                //     setTimeout(function () {
                //         // return the canvas to the state befor 
                //         ctx.putImageData(imageData, 0, 0);
                //     }, 1000);
                // }
                


                
                
            }
            
        }
    });
    $("#test-button").click(function(evt){
        // console.log(masterSquare[5][5].findNearbyActiveSquares(masterSquare));
        masterQuene = [];
        search(masterSquare[0][0]);
        console.log("found?: " + found);
    
        if (found){
            retrace();
        }
    })
}


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return [evt.clientX - rect.left,
      evt.clientY - rect.top]
    ;
}
class Square {
    // x, y E [0, 5]
    constructor(x, y, distance){
        this.x = x;
        this.y = y;
        this.active = true;
        this.distanceFromTarget = 10 - (x + y);
        this.cost;
        this.parent;
        // this.distance = distance;
        this.xCoord = (distance) * (x + .5);
        this.yCoord = (distance) * (y + .5);
    }

    deactivate() {
        this.active = false;
    }

    setParent(x){
        this.parent = x;
    }

    
    // find the squares that next to this one and is active
    findNearbyActiveSquares(){
        const test = 1.001;
        let list = masterSquare;
        let plist = masterPoint;
        let myReturnList = [];
        let squareCost = this.cost + 1;
        console.log(Number(squareCost))
        //check square to the left
        if (this.x > 0){
            if (list[this.y][this.x - 1].active){
                if (!((""+ this.x + (this.y + 1)) in plist[this.y][this.x].listOfConnectedPoints)){
                    list[this.y][this.x - 1].setParent(this);
                    myReturnList.push([list[this.y][this.x - 1], squareCost + list[this.y][this.x - 1].distanceFromTarget * test]);
                    list[this.y][this.x - 1].setCost(squareCost);
                }
            }
        }
        // check square above
        if (this.y > 0){
            if (list[this.y - 1][this.x].active){
                if (!((""+ this.x + (this.y)) in plist[this.y][this.x + 1].listOfConnectedPoints)){
                    list[this.y - 1][this.x].setParent(this);
                    myReturnList.push([list[this.y - 1][this.x], squareCost + list[this.y - 1][this.x].distanceFromTarget * test]);
                    list[this.y - 1][this.x].setCost(squareCost);
                }
            }
        }
        //check square to the right
        if (this.x < 5){
            if (list[this.y][this.x + 1].active){
                if (!((""+ (this.x + 1)+ (this.y + 1)) in plist[this.y][this.x + 1].listOfConnectedPoints)){
                    list[this.y][this.x + 1].setParent(this);
                    myReturnList.push([list[this.y][this.x + 1], squareCost + list[this.y][this.x + 1].distanceFromTarget * test]);
                    list[this.y][this.x + 1].setCost(squareCost);

                }
                
            }
        }
        // check square below
        if (this.y < 5){
            if (list[this.y + 1][this.x].active){
                if (!((""+ this.x+ (this.y + 1)) in plist[this.y + 1][this.x + 1].listOfConnectedPoints)){
                    list[this.y + 1][this.x].setParent(this);
                    myReturnList.push([list[this.y + 1][this.x], squareCost + list[this.y + 1][this.x].distanceFromTarget * test]);
                    list[this.y + 1][this.x].setCost(squareCost);
                }
            }
        }
        // console.log("return list: " + myReturnList)
        return myReturnList;
    }
    setCost(cost){
        this.cost = cost
    }


}
// square, cost to get there
var masterQuene;
var found;
// run this on each item in the quene
var count = 0;
function search(square){ 
    count ++;
    console.log("count:" + count);
    masterQuene.shift();// pop off 1 items from the quene
    var stringMasterQ = "";
    for (var i = 0; i < masterQuene.length; i++){
        stringMasterQ += "[" +masterQuene[i]+"]" + ",";
    }
    console.log("quene length: "+ stringMasterQ)
    console.log(square)
    console.log(square.x, square.y);
    
    if (square.active){
        square.deactivate();

        // draw line
        if (!square.x + square.y == 0){
            ctx.beginPath();
            ctx.moveTo(square.xCoord, square.yCoord);
            ctx.lineTo(square.parent.xCoord, square.parent.yCoord);
            ctx.lineWidth = 8;
            ctx.strokeStyle = "orange";
            ctx.stroke();
            }
        else{
            square.setCost(0);
        }

        
        masterQuene.push.apply(masterQuene, square.findNearbyActiveSquares()); // addd to the master quene


        // test if sorting is working
        hold = masterQuene;
        // console.log(String(masterQuene));
        masterQuene.sort(compareFunction);
        // console.log(String(masterQuene));   
        // console.log(String(hold == masterQuene))

    }
    if (square.x == 5 && square.y == 5){
        // stop everythign
        found = true;
        return true;
    }
    if (masterQuene.length > 0){
        search(masterQuene[0][0], masterQuene[0][1]);
    }
    else{
        found = false;
        return false;
    }
    
}

function retrace(){
    for (var i = 0; i < masterSquare.length; i++){
        // draw line from current coord to their parent 
        // masterSquare[i].xCoord, masterSquare[i].yCoord
        // masterSquare[i].parent.xCoord, masterSquare[i].parent.yCoord
        for (var x = 0; x < masterSquare[i].length; x++){
            if ((!masterSquare[i][x].active) && !(masterSquare[i][x].x + masterSquare[i][x].y == 0)){
                ctx.beginPath();
                ctx.moveTo(masterSquare[i][x].xCoord, masterSquare[i][x].yCoord);
                ctx.lineTo(masterSquare[i][x].parent.xCoord, masterSquare[i][x].parent.yCoord);
                ctx.lineWidth = 8;
                ctx.strokeStyle = "orange";
                ctx.stroke();
            }
        }

        
    }
    var target = masterSquare[5][5];
    while (target.x + target.y != 0){
        ctx.beginPath();
        ctx.moveTo(target.xCoord, target.yCoord);
        ctx.lineTo(target.parent.xCoord, target.parent.yCoord);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "green";
        ctx.stroke();
        target= target.parent
    }
}
function compareFunction(a, b){
    return (a[1]) - (b[1]) ;
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
    for (var i = 0; i< 6; i ++){
        // create new row
        masterSquare.push([]);
        for (var x = 0; x< 6; x ++){
            // create new square in row
            masterSquare[i].push(new Square(x, i, canvas.clientWidth / 6));
        }
    }
    
    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.fillText("B",holdx - canvas.clientWidth / 6 -50, holdy - 100)
    
    
    // console.log(masterSquare)
    // console.log(masterPoint)
    // ctx.fillRect(0, 0, 150, 75);
}


function initial(){
    // create the 7 by 7 grid
    my7x7();
    // create barriers
    eventListeners();
    // testing the next to: code
    // console.log(masterSquare[0][0])
    // console.log(masterSquare[0][5].findNearbyActiveSquares(masterSquare));

}