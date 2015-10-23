var darkGrey = new Color(.3);

var ref = view.viewSize.height / 10


function triangle(start) {
    var path = new Path();
    path.fillColor = 'black';
    path.strokeColor = 'grey';
    path.moveTo(start);
    path.lineTo(start + [ref, 0]);
    path.lineTo(start + [ref / 2, ref * 1.7]);
    path.lineTo(start);
    path.isMoving = false;
    path.state = false;
    path.setState = function(state) {
        if ((state != this.state) && (!this.isMoving))
            if (state) {
                this.isMoving = true;
                this.movingTo = this.segments[2].point.y - 15;
                this.state = true;
            } else {
                if (this.state) {
                    this.isMoving = true;
                    this.movingTo = this.segments[2].point.y + 15;
                    this.state = false;
                }

            }
    }

    return path;
}



var clean = false;

function onFrame() {
    for (var i = red.length - 1; i >= 0; i--) {
        for (var j = red[i].length - 1; j >= 0; j--) {
            if (red[i][j].isMoving) {
                //console.log(i, j, red[i][j].movingTo)
                if (red[i][j].state) {
                    if (red[i][j].movingTo < red[i][j].segments[2].point.y) {
                        red[i][j].segments[2].point.y -= 1.2;
                        if (red[i][j].fillColor.brightness < .5)
                            red[i][j].fillColor.brightness += .01;
                    } else {
                        red[i][j].isMoving = false;
                    }
                } else {
                    if (red[i][j].segments[2].point.y < red[i][j].movingTo) {
                        red[i][j].segments[2].point.y += 1.2;
                        if (0 < red[i][j].fillColor.brightness)
                            red[i][j].fillColor.brightness -= .001;
                    } else {
                        red[i][j].fillColor.brightness = 0;
                        red[i][j].isMoving = false;
                    }
                }
            }

        }
    }
}



var cleanRed = function() {
    for (var i = red.length - 1; i >= 0; i--) {
        for (var j = red[i].length - 1; j >= 0; j--) {
            red[i][j].setState(false);
        }
    }
}

red = new Array();

var lmax = Math.floor(view.viewSize.height / (ref * .9));
var cmax = Math.floor(view.viewSize.width / (ref * .8));

for (var l = lmax; 0 <= l; l--) {
    red[l] = new Array();
    for (var c = 0; c < cmax; c++) {
        var s1 = new Point(c * ref, l * ref);
        var s2 = new Point((c * ref) - (ref / 2), (l * ref) - (ref / 2));
        red[l][c * 2] = triangle(s1);
        red[l][(c * 2) - 1] = triangle(s2);
    }
}

var redPat = [
    // R
    [0, 4],
    [0, 3],
    [0, 2],
    [0, 1],
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [4, 1],
    [1, 2],
    [2, 2],
    [3, 2],
    [2, 3],
    [3, 4],
    [4, 4],
    // E
    [8, 0],
    [9, 0],
    [10, 0],
    [11, 0],
    [8, 1],
    [8, 2],
    [9, 2],
    [10, 2],
    [8, 3],
    [8, 4],
    [9, 4],
    [10, 4],
    [11, 4],
    //D

    [15, 4],
    [15, 3],
    [15, 2],
    [15, 1],
    [15, 0],
    [16, 0],
    [17, 0],
    [18, 0],
    [19, 1],
    [19, 2],
    [19, 3],
    [18, 3],
    [17, 4],
    [16, 4],
];

/*
setTimeout(function() {
    for (var i = redPat.length - 1; i >= 0; i--) {
        red[redPat[i][1] + 2][redPat[i][0] + (cmax / 2) - 4].setState(1);
    };
}, 500);
*/

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

shuffle(redPat);

var redApp = redPat.length - 1;

var looping = function() {
    var c = Math.floor(Math.random() * red[0].length);
    var l = Math.floor(Math.random() * red.length);
    var found = false;
    for (var i = redPat.length - 1; i >= 0 && !found; i--) {
        found = (redPat[i][1] + 2 == l) && (redPat[i][0] + (cmax / 2) - 4 == c);
    }
    if ((Math.random() < 0.3) && (0 <= redApp)) {

        red[redPat[redApp][1] + 2][redPat[redApp][0] + (cmax / 2) - 4].setState(1);
        redApp--;
    }
    if (!found)
        red[l][c].setState(Math.random() < (redApp / redPat.length));

    setTimeout(looping, 200 + (Math.random() * 800));
}

looping();
