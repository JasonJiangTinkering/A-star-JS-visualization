$(document).ready(function(){
    console.log("start");
    initial();
})

// create the 9 by 9 grid
function my9x9(){
    var canvas = document.getElementById("a-StarCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 150, 75);
}

function initial(){
    // create the 9 by 9 grid
    my9x9();
}