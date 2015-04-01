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
            stops: ['black',darkGrey ]
        },
        origin: start +[50,0],
        destination: start +[50,150]
    };
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



function onFrame(event) {
    if (0 == event.count % 1) {
        var tr = red[Math.floor(Math.random() * 9)][1+Math.floor(Math.random() * 19)];
        tr.fillColor = (.5 < Math.random() ? tr.activeFill : "black");
    }
}
