var darkGrey = new Color(.3);

function triangle(start) {
    var path = new Path();
    path.fillColor = 'black';
    path.strokeColor = 'grey';
    path.moveTo(start);
    path.lineTo(start + [100, 0]);
    path.lineTo(start + [50, 150]);
    path.lineTo(start);
    path.activeFill = {
        gradient: {
            stops: ['black', darkGrey]
        },
        origin: start + [50, 0],
        destination: start + [50, 150]
    };
    path.setState = function(state) {
        this.fillColor = (state ? this.activeFill : "black");
        paper.view.update();
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


cleanRed = function() {
    for (var l = 0; l < 10; l++)
        for (var c = 0; c < 19; c++)
            red[l][c].setState(false);
}