$(function() {

    $("#prog1").click(function() {
        red[Math.floor(Math.random() * 10)][Math.floor(Math.random() * 20)].setState(true);
    });

    $("#prog2").click(function() {
        red[Math.floor(Math.random() * 10)][Math.floor(Math.random() * 20)].setState(false);
    });

    var loop = false;
    var looping = function() {
        if (loop) {
            red[Math.floor(Math.random() * 10)][Math.floor(Math.random() * 20)].setState(Math.random() < .5);
            setTimeout(looping, 50+(Math.random() * 500))
        }
    }
    $("#prog3").click(function() {
        loop = true;
        looping();
    });

    $("#prog4").click(function() {
        loop = false;
    });

    $("#prog5").click(function() {
        cleanRed();
    });

});
