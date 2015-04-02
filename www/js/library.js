var darkGrey = new Color(.3);

function triangle(start) {
    var path = new Path();
    path.fillColor = 'black';
    path.strokeColor = 'grey';
    path.moveTo(start);
    path.lineTo(start + [100, 0]);
    path.lineTo(start + [50, 150]);
    path.lineTo(start);
    path.setState = function(state) {
        if (state != this.state)
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

red = new Array();

for (var l = 9; 0 <= l; l--) {
    red[l] = new Array();
    for (var c = 0; c < 10; c++) {
        var s1 = new Point(c * 100, l * 100);
        var s2 = new Point((c * 100) - 50, (l * 100) - 50);
        red[l][c * 2] = triangle(s1);
        red[l][1 + c * 2] = triangle(s2);
    }
}

var clean = false;

function onFrame() {
    if (clean) {
        for (var i = red.length - 1; i >= 0; i--) {
            for (var j = red[i].length - 1; j >= 0; j--) {
                red[i][j].fillColor = "black";
                red[i][j].state = false;
            }
        }
        clean = false;
    } else {
        for (var i = red.length - 1; i >= 0; i--) {
            for (var j = red[i].length - 1; j >= 0; j--) {
                if (red[i][j].isMoving) {
                    //console.log(i, j, red[i][j].movingTo)
                    if (red[i][j].state) {
                        if (red[i][j].movingTo < red[i][j].segments[2].point.y) {
                            red[i][j].segments[2].point.y-=1.2;
                            if (red[i][j].fillColor.brightness < .5)
                                red[i][j].fillColor.brightness += .01;
                        } else {
                            red[i][j].isMoving = false;
                        }
                    } else {
                        if (red[i][j].segments[2].point.y < red[i][j].movingTo) {
                            red[i][j].segments[2].point.y += .2;
                            if (0 < red[i][j].fillColor.brightness)
                                red[i][j].fillColor.brightness -= .001;
                        } else {
                            red[i][j].isMoving = false;
                        }
                    }
                }

            }
        }
    }
}


cleanRed = function() {
    clean = true;
}
