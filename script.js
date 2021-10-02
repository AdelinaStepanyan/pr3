var socket = io();

var side = 10;
var weath = 'summer'
function setup() {
    createCanvas(50 * side, 50 * side);
    background("pink");
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let gishatichCountElement = document.getElementById('gishatichCount');
    let gishatichxCountElement = document.getElementById('gishatichxCount');
    let purpleCountElement = document.getElementById('purpleCount');
    socket.on("data", nkarel);




    socket.on("weather", function (data) {
        weath = data;
    })
    function nkarel(data) {
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        gishatichCountElement.innerText = data.gishatichCounter;
        gishatichxCountElement.innerText = data.gishatichxCounter;
        purpleCountElement.innerText = data.purpleCounter;

        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[0].length; x++) {
                var obj = matrix[y][x];
                if (obj == 1) {
                    if (weath == "summer") {
                        fill("green");
                    } else if (weath == "autumn") {
                        fill("#333300");
                    } else if (weath == "winter") {
                        fill("white");
                    } else if (weath == "spring") {
                        fill("#4dffa6");
                    }
                } else if (obj == 2) {
                    fill("yellow");
                } else if (obj == 0) {
                    fill("grey")
                } else if (obj == 3) {
                    fill("blue")
                }
                else if (obj == 4) {
                    fill("red")
                }
                else if (obj == 5) {
                    fill("purple")
                }
                rect(x * side, y * side, side, side);
            }
        }
    }



}

function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addGishatich() {
    socket.emit("add gishatich")
}
function addGishatichx() {
    socket.emit("add gishatichx")
}
function addPurple() {
    socket.emit("add purple")
}
