function createGrid(rings) {
    var counter = 0;
    var width = 2*rings-1
    var height = 4*rings-3
    var Hex_Grid = new Array(height);

    for (var i = 0; i < height; i++) {
        Hex_Grid[i] = new Array(width).fill(null);
        var offset = 0;
        if ((i%2==0 && rings%2==0) || (i%2!=0 && rings%2!=0)) {
            offset = 1;
        }
        for (var j = offset; j < width; j+=2) {
            Hex_Grid[i][j] = counter;
            counter++;
        }
    }

    if (rings > 1) {
        var corners = rings - 1;
        var j = 0;
        for (var i = corners; i > 0; i--) {
            for (var k = 0; k < i; k++) {
                Hex_Grid[j][k] = null;
                Hex_Grid[j][Hex_Grid[j].length - k - 1] = null;
                Hex_Grid[Hex_Grid.length - j - 1][k] = null;
                Hex_Grid[Hex_Grid.length - j - 1][Hex_Grid[j].length - k - 1] = null;
            }
            j++;
        }
    }
    return Hex_Grid;
}

function calculateConnections(Hex_Grid) {
    var connections = [];
    for (var i = 0; i < Hex_Grid.length; i++) {
        for (var j = 0; j < Hex_Grid[i].length; j++) {
            if (Hex_Grid[i][j]) {
                var top = null;
                var topright = null;
                var bottomright = null;
                var bottom = null;
                var bottomleft = null;
                var topleft = null;

                try { var top = Hex_Grid[i - 2][j]; } catch (e) {}
                try { var topright = Hex_Grid[i - 1][j + 1]; } catch (e) {}
                try { var bottomright = Hex_Grid[i + 1][j + 1]; } catch (e) {}
                try { var bottom = Hex_Grid[i + 2][j]; } catch (e) {}
                try { var bottomleft = Hex_Grid[i + 1][j - 1]; } catch (e) {}
                try { var topleft = Hex_Grid[i - 1][j - 1]; } catch (e) {}

                connections[Hex_Grid[i][j]] = [top, topright, bottomright, bottom, bottomleft, topleft];
            }
        }
    }

    return connections;
}

function calculatePairs(connections) {
    var templist = [];
    var uniques = [];
    for (var i = 0; i < connections.length; i++) {
        if (connections[i] && !templist.includes(i)) {
            var randomIndex = Math.floor(Math.random() * (connections[i].length - 1));
            while (connections[i][randomIndex] == null) {
                randomIndex = Math.floor(Math.random() * (connections[i].length - 1));
            }
            templist.push(i)
            templist.push(connections[i][randomIndex])
            uniques[i] = connections[i][randomIndex];
        }
    }
    return uniques;
}

function handleCanvasClicks(e) {
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var lowest = Number.POSITIVE_INFINITY;
    var index = null;
    for (var i = 0; i < Hex_Positions.length; i++) {
        if (Hex_Positions[i]) {
            var a = x - Hex_Positions[i][0];
            var b = y - Hex_Positions[i][1];
            var distance = Math.sqrt( a*a + b*b );
            if (distance < lowest && distance <= r) {
                index = i;
                lowest = distance;
            }
        }
    }
    if (index) {
        if (e.button == 0) {
            Hex_Rotations[index] -= 1;
        } else if (e.button == 2) {
            Hex_Rotations[index] += 1;
        }
        if (Hex_Rotations[index] > 5) {
            Hex_Rotations[index] = 0;
        }
        drawHexGrid(Hex_Grid);
    }
}

function drawHexagon(x, y, r, hollow, fill, linew, linec) {
    ctx.fillStyle = fill;
    ctx.lineWidth = linew;
    ctx.strokeStyle = linec;
    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
      ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
    }
    ctx.closePath();
    if (!hollow) {
        ctx.stroke();
    }
    ctx.fill();
}

function drawHexGrid(Hex_Grid) {
    var connections_back = [];
    for (var i = 0; i < Unique_Pairs.length; i++) {
        if (Unique_Pairs[i]) {
            if (!connections_back[Unique_Pairs[i]]) {
                connections_back[Unique_Pairs[i]] = [i];
            } else {
                connections_back[Unique_Pairs[i]].push(i);
            }
        }
    }
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < Hex_Grid.length; i++) {
        for (var j = 0; j < Hex_Grid[i].length; j++) {
            if (Hex_Grid[i][j]) {
                var x = (1.5 * r * j) + r;
                var y = (Math.sqrt(3)/2 * r * i) + r
                Hex_Positions[Hex_Grid[i][j]] = [x, y];

                drawHexagon(x, y, r, false, my_gradient, 2, "dimgray");
                drawHexagon(x, y, r / 10, false, "#04d9ff", 3, "#04d9ff");
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(-Math.PI/3 * Hex_Rotations[Hex_Grid[i][j]]);

                ctx.strokeStyle = "#04d9ff";

                if (Unique_Pairs[Hex_Grid[i][j]]) {
                    var angle = Math.PI/3 * connections[Hex_Grid[i][j]].indexOf(Unique_Pairs[Hex_Grid[i][j]]) - Math.PI/2;
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(Math.sqrt(3)/2 * r * Math.cos(angle), Math.sqrt(3)/2 * r * Math.sin(angle));
                    ctx.stroke();
                }
                if (connections_back[Hex_Grid[i][j]]) {
                    for (var k = 0; k < connections_back[Hex_Grid[i][j]].length; k++) {
                        var angle = Math.PI/3 * connections[Hex_Grid[i][j]].indexOf(connections_back[Hex_Grid[i][j]][k]) - Math.PI/2;
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(Math.sqrt(3)/2 * r * Math.cos(angle), Math.sqrt(3)/2 * r * Math.sin(angle));
                        ctx.stroke();
                    }
                }
                //ctx.fillText(Hex_Grid[i][j], 0, 0);

                ctx.restore();
            }
        }
    }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.font = "10px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.lineWidth = 3;
ctx.fillStyle = "#04d9ff";

const a = 2 * Math.PI / 6;
const r = 50;

const my_gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
my_gradient.addColorStop(0, "gray");
my_gradient.addColorStop(0.3, "darkgray");
my_gradient.addColorStop(0.6, "lightgray");
my_gradient.addColorStop(0.9, "silver");

var Hex_Grid = createGrid(3);
var connections = calculateConnections(Hex_Grid);
var Hex_Positions = [];
var Hex_Rotations = [];
var Unique_Pairs = [];

canvas.addEventListener("mousedown", handleCanvasClicks);
canvas.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

drawHexGrid(Hex_Grid);

for (var i = 0; i < Hex_Positions.length; i++) {
    if (Hex_Positions[i]) {
        Hex_Rotations[i] = Math.floor(Math.random() * 6);
    }
}

Unique_Pairs = calculatePairs(connections);
drawHexGrid(Hex_Grid);