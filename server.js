var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

purpleArr = [];
gishxArr = [];
grassArr = [];
grasseaterArr = [];
gishArr = [];
matrix = [];
var n = 50;

weath = "winter";
Grass = require("./Grass.js")
GrassEater = require("./GrassEater.js")
Gishatich = require("./Gishatich.js")
Gishatichx = require("./Gishatichx.js")
Purple = require("./Purple.js")
function rand(min, max) {
    return Math.random() * (max - min + 1) + min;
}

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 5))

    }
}

io.sockets.emit("send matrix", matrix)



function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = 1
                grassArr.push(new Grass(x, y, 1))
            }
            else if (matrix[y][x] == 2) {
                matrix[y][x] = 2
                grasseaterArr.push(new GrassEater(x, y, 2))
            }
            else if (matrix[y][x] == 3) {
                matrix[y][x] = 3
                gishArr.push(new Gishatich(x, y, 3))
            }
            else if (matrix[y][x] == 4) {
                matrix[y][x] = 4
                gishxArr.push(new Gishatichx(x, y, 4))
            }
            else if (matrix[y][x] == 5) {
                matrix[y][x] = 5
                purpleArr.push(new Purple(x, y, 5))
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}


function game() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grasseaterArr) {
        grasseaterArr[i].eat();
    }
    for (var i in gishArr) {
        gishArr[i].eat();
    }
    for (var i in gishxArr) {
        gishxArr[i].eat();
    }
    for (var i in purpleArr) {
        purpleArr[i].eat();
    }
    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCounter: grasseaterArr.length,
        gishatichCounter: gishArr.length,
        gishatichxCounter: gishxArr.length,
        purpleCounter: purpleArr.length,
    }
    io.sockets.emit("data", sendData);
    //io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)


function kill() {
    grassArr = [];
    grasseaterArr = [];
    purpleArr = [];
    gishxArr = [];
    gishArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grasseaterArr.push(new GrassEater(x, y, 2))
        }
    }
}
function addGishatich() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            gishArr.push(new Gishatich(x, y, 3))
        }
    }
}
function addGishatichx() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            gishxArr.push(new Gishatichx(x, y, 4))
        }
    }
}
function addPurple() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            purpleArr.push(new Purple(x, y, 5))
        }
    }
}


///new



function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);


////

io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add gishatich", addGishatich);
    socket.on("add gishatichx", addGishatichx);
    socket.on("add purple", addPurple);
});


var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grasseater = grasseaterArr.length;
    statistics.gishatich = gishArr.length;
    statistics.gishatichx = gishxArr.length;
    statistics.purple = purpleArr.length;

    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        console.log("send")
    })
}, 1000)