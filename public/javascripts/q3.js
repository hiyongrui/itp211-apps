
$("#generateBtn").click((e) => {
    var num1 = $("#first").val();
    var num2 = $("#second").val();
    var targetURL = "http://localhost:3000/random/" + num1 + "/" + num2;

    $.ajax({
        url: targetURL,
        success: function (message) {
            $("#result").text("Generated number: " + message.result);
            //console.log(message.result);
        },
        error: function (message) {
            $("#result").text("Input error: " + message.result);
        }
    });
});

var theBiggest = function (a, b) {
    var result;
    if (a > b) {
        result = ["a", a];
    }
    else {
        result = ["b", b];
    }
    return result;
}
console.log(theBiggest(22, 13));

var x = document.getElementsByTagName("button");
for (i = 0; i < x.length; i++) {
    if (x[i].innerHTML == "Happy Birthday") {
        console.log(x[i].id);
        console.log(x[i]);
        console.log(x.length);
        console.log(i);
    }
}

var runThisCode = function () {
    console.log(1);
    soAmazing(2);
    soAmazing(3);
};
function soAmazing(str) {
    console.log(str);
}
runThisCode();


