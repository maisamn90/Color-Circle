var patern = [];
var startTime;
var endTime;
var singleLevelTime = 0;
var totaLtime = 0;
disabledButtons();
async function generatePatern() {

    $("#start").addClass("disabled");
    $("#failed").addClass("disabled");
    await sleep(500);
    $("#failed").removeClass("disabled");
    $("#start").removeClass("disabled");
    $("#start").addClass("hide");
    $("#playing").removeClass("hide");
    var i = 0;
    var j = 0;
    var paternlength = patern.length + 1;
    for (i; i < 100; i++) {
        for (j; j < paternlength; j++) {
            var x = Math.floor((Math.random() * 4) + 1);
            patern.push(x);
            disabledButtons();
            $(".level-num").text(paternlength);
            // document.getElementById("demo").innerHTML = "[" + patern + "]";
            if (patern.length == paternlength) {

                for (var l = 0; l < 100; l++) {
                    if (patern[l] == 1) {
                        $(".active").removeClass("active");
                        $(".blue-quarter").addClass("active");
                        //   removeActiveClass(3000);
                        setTimeout(removeActiveClass, 500);
                        await sleep(1000);

                    }
                    else if (patern[l] == 2) {
                        $(".active").removeClass("active");
                        $(".red-quarter").addClass("active");
                        setTimeout(removeActiveClass, 500);
                        await sleep(1000);
                    }
                    else if (patern[l] == 3) {
                        $(".active").removeClass("active");
                        $(".green-quarter").addClass("active");
                        setTimeout(removeActiveClass, 500);
                        await sleep(1000);
                    }
                    else {
                        if (patern[l] == 4) {
                            $(".active").removeClass("active");
                            $(".yellow-quarter").addClass("active");
                            setTimeout(removeActiveClass, 500);
                            await sleep(1000);
                        }

                    }
                }
            }

            startTime = new Date();

            enableButtons();
            return patern;
        }
    }
}


var inputPatern = [];

function getUserPatern(button) {
    var generatedPatern = patern;

    var redButton = document.getElementById("redButtonId");
    var greenButton = document.getElementById("greenButtonId");
    var blueButton = document.getElementById("blueButtonId");
    var orangeButton = document.getElementById("orangeButtonId");
    if (button != null && button.id == redButton.id) {
        // alert ("Red is clicked");
        inputPatern.push(2);
        checkPaternsLenght(inputPatern, generatedPatern);
        return inputPatern;
    }
    else
    if (button != null && button.id == greenButton.id) {
        //alert ("green is clicked");
        inputPatern.push(3);
        checkPaternsLenght(inputPatern, generatedPatern);
        return inputPatern;
    }
    else
    if (button != null && button.id == blueButton.id) {
        // alert ("Blue is clicked");
        inputPatern.push(1);
        checkPaternsLenght(inputPatern, generatedPatern);
        return inputPatern;
    }
    else
    if (button != null && button.id == orangeButton.id) {
        // alert ("Orange is clicked");
        inputPatern.push(4);
        checkPaternsLenght(inputPatern, generatedPatern);
        return inputPatern;
    }
}


async function checkPaternsLenght(userPatern, generatedPatern) {
    var userPaternLenght = userPatern.length;
    var generatedPaternLength = generatedPatern.length;


    if (userPaternLenght == generatedPaternLength) {
        //alert ("length is equals");
        // alert(generatedPatern.toString());
        // alert(userPatern.toString());
        if (generatedPatern.toString() == userPatern.toString()) {
            //alert("Success");
            // $(".level").append("<i class='fas fa-check'></i>");
            disabledButtons();
            $("#result-icon").removeClass("hide");
            $(".level").addClass("hide");
            await sleep(1000);
            $("#result-icon").addClass("hide");
            $(".level").removeClass("hide");
            // $(this).children("i").remove();
            inputPatern = [];
            generatedPatern = [];
            endTime = new Date();
            var levelTime = endTime - startTime;
            singleLevelTime = (levelTime - 1000) / 1000;
            totaLtime += singleLevelTime;
            console.log(totaLtime);
            $(".list-group-flush").append("<li class='list-group-item'><i class='fas fa-check text-success mr-2'></i>Level " + userPaternLenght + " - " + singleLevelTime + "<sub>s</sub></li>");
            generatePatern();

        }
        else {
            $("#playing").addClass("hide");
            $("#failed").removeClass("hide");
            disabledButtons();
            // alert("Not");
            //document.getElementById("demo").innerHTML = "";
            inputPatern = [];
            generatedPatern = [];
            patern = [];
            var result = (generatedPaternLength - 1) + " level - during " + totaLtime.toFixed(2) + "s";
            alert($("meta[name='fbDescription]").attr("content"));
            $("meta[name='fbDescription]").attr("content", result);
            $(".list-group-flush").append("<li class='list-group-item'><i class='fas fa-times text-danger mr-2'></i>Level " + generatedPaternLength + "</li>");
            if (generatedPaternLength - 1 == 1) {
                $(".total-result").html("<strong>" + (generatedPaternLength - 1) + "</strong>" + " level - during " + "<strong>" + totaLtime.toFixed(2) + "<sub>s</sub></strong>");
            }
            else if (generatedPaternLength - 1 < 1) {
                $(".total-result").html("No level have been solved");
                $(".card-header.total-result").css("background-color", "red")
            }
            else {
                $(".total-result").html("<strong>" + (generatedPaternLength - 1) + "</strong>" + " levels - during " + "<strong>" + totaLtime.toFixed(2) + "<sub>s</sub></strong>");
            }
            $("#performance").removeClass("hide");
            $('#performance-modal').modal('show');

            //document.getElementById("start").disabled = false;
        }

    }
    else {
        var k = 0;
        for (k; k < userPaternLenght; k++) {
            if (generatedPatern[k] == userPatern[k]) {
                getUserPatern();
            }

            else {
                $("#playing").addClass("hide");
                disabledButtons();
                $("#failed").removeClass("hide");
                result = (generatedPaternLength - 1) + " level - during " + totaLtime.toFixed(2) + "s";
                $("meta[name='fbDescription']").attr("content", result);
                alert($("meta[name='fbDescription']").attr("content"));
                //alert("wrong input");
                $(".list-group-flush").append("<li class='list-group-item'><i class='fas fa-times text-danger mr-2'></i>Level " + generatedPaternLength + "</li>");
                if (generatedPaternLength - 1 == 1) {
                    $(".total-result").html("<strong>" + (generatedPaternLength - 1) + "</strong>" + " level - during " + "<strong>" + totaLtime.toFixed(2) + "<sub>s</sub></strong>");
                }
                else if (generatedPaternLength - 1 < 1) {
                    $(".total-result").html("No level have been solved");
                    $(".card-header.total-result").css("background-color", "red")
                }
                else {
                    $(".total-result").html("<strong>" + (generatedPaternLength - 1) + "</strong>" + " levels - during " + "<strong>" + totaLtime.toFixed(2) + "<sub>s</sub></strong>");


                }

                $("#performance").removeClass("hide");
                $('.modal').modal('show');
                generatedPatern = [];
                inputPatern = [];
                patern = [];

                // document.getElementById("demo").innerHTML = "";
                //document.getElementById("start").disabled = false;

            };
        }

    }
}

function removeActiveClass() {
    $(".active").removeClass("active");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

$("#failed").on("click", function() {
    $(".total-result").html("");
    $("ul").html("");
    $("#performance").addClass("hide");
    totaLtime = 0;
    generatePatern();
});


function disabledButtons() {
    $(".blue-quarter").removeAttr("onclick");
    $(".blue-quarter").attr("disabled", "disabled");

    $(".red-quarter").removeAttr("onclick");
    $(".red-quarter").attr("disabled", "disabled");

    $(".green-quarter").removeAttr("onclick");
    $(".green-quarter").attr("disabled", "disabled");

    $(".yellow-quarter").removeAttr("onclick");
    $(".yellow-quarter").attr("disabled", "disabled");
}

function enableButtons() {
    $(".blue-quarter").attr("onclick", "getUserPatern(this)");
    $(".blue-quarter").removeAttr("disabled", "disabled");

    $(".red-quarter").attr("onclick", "getUserPatern(this)");
    $(".red-quarter").removeAttr("disabled", "disabled");

    $(".green-quarter").attr("onclick", "getUserPatern(this)");
    $(".green-quarter").removeAttr("disabled", "disabled");

    $(".yellow-quarter").attr("onclick", "getUserPatern(this)");
    $(".yellow-quarter").removeAttr("disabled", "disabled");
}

// function metaDesc() {
//     var desc = "<strong>" + (generatedPaternLength - 1) +"</strong>" + " level - during " + "<strong>" + totaLtime.toFixed(2) + "<sub>s</sub></strong>";
//     console.log(desc);
//     $("meta[property='og\\:description']").attr("content", desc );
//     }
$("#testButton").on("click", function() {
    FB.ui({
        method: 'share_open_graph',
        // action_type: 'og.likes',
        // action_properties: JSON.stringify({
        //     object: 'https://maisamn90.github.io/Simon-game/',
        // })
        action_type: 'og.shares',
    action_properties: JSON.stringify({
        object : {
           'og:url': 'https://maisamn90.github.io/Simon-game/', // your url to share
           'og:title': 'Here my custom title',
           'og:description': 'here custom description',
           'og:image': 'https://maisamn90.github.io/Simon-game/rosie.jpg'
        }
    })
    }, function(response) {
        // Debug response (optional)
        console.log(response);
    });
});
