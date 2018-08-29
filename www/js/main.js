$(function() {

    $("#prog1").click(function() {
        red[6][7].setState(true);
    });

    $("#prog2").click(function() {
        red[6][7].setState(false);
    });

    $("#prog3").click(function() {


    });

    $("#prog4").click(function() {

        for (var c = 0; c< 19; c+=2)
            red[5][c].setState(true);

    });

    $("#prog5").click(function() {
        cleanRed();
    });

});
