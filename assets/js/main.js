//Turn off tutorial mode//
$(document).ready(function() {
    tour.end()
});


var patern = [];
var startTime;
var endTime;
var singleLevelTime = 0;
var totaLtime = 0;
disabledButtons();


// Generate the Patten function
async function generatePatern() {
    //Check game mode if its in tutorial 
    if (tour.ended() == false) {
        $(".active").removeClass("active");
        await sleep(1000);
        $(".red-quarter").addClass("active");
        document.getElementById("red-audio").play();
        setTimeout(removeActiveClass, 500);
        await sleep(1000);
        enableButtons();
    }
    else {
        // Change layout for start playing
        $("#tour-btn").addClass("hide")
        $("#start").addClass("disabled");
        $("#failed").addClass("disabled");
        await sleep(500);
        $("#failed").removeClass("disabled");
        $("#start").removeClass("disabled");
        $("#start").addClass("hide");
        $("#playing").removeClass("hide");
        var i = 0;
        var j = 0;
        //Save array length (Pattern length)
        var paternlength = patern.length + 1;
        //Start creating the pattern array 
        for (i; i < 100; i++) {
            //Adding random array values and save it in main array
            for (j; j < paternlength; j++) {
                var x = Math.floor((Math.random() * 4) + 1);
                patern.push(x);
                disabledButtons();
                //Save every level (the array length is the level number)
                $(".level-num").text(paternlength);
                //Check each random input and add effect for each button
                if (patern.length == paternlength) {

                    for (var l = 0; l < 100; l++) {
                        if (patern[l] == 1) {
                            $(".active").removeClass("active");
                            $(".blue-quarter").addClass("active");
                            document.getElementById("blue-audio").play();
                            setTimeout(removeActiveClass, 500);
                            await sleep(1000);

                        }
                        else if (patern[l] == 2) {
                            $(".active").removeClass("active");
                            $(".red-quarter").addClass("active");
                            document.getElementById("red-audio").play();
                            setTimeout(removeActiveClass, 500);
                            await sleep(1000);
                        }
                        else if (patern[l] == 3) {
                            $(".active").removeClass("active");
                            $(".green-quarter").addClass("active");
                            document.getElementById("green-audio").play();
                            setTimeout(removeActiveClass, 500);
                            await sleep(1000);
                        }
                        else {
                            if (patern[l] == 4) {
                                $(".active").removeClass("active");
                                $(".yellow-quarter").addClass("active");
                                document.getElementById("yellow-audio").play();
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
}

var inputPatern = [];

// Checking user pattern input function
function getUserPatern(button) {

    var generatedPatern = patern;

    var redButton = document.getElementById("redButtonId");
    var greenButton = document.getElementById("greenButtonId");
    var blueButton = document.getElementById("blueButtonId");
    var orangeButton = document.getElementById("orangeButtonId");
    // Check if red button clicked
    if (button != null && button.id == redButton.id && tour.ended() == true) {
        document.getElementById("red-audio").play();
        inputPatern.push(2);
        checkPaternsLenght(inputPatern, generatedPatern);
        return inputPatern;
    }
    else
    // Check if green button clicked
    if (button != null && button.id == greenButton.id) {
        document.getElementById("green-audio").play();
        inputPatern.push(3);
        checkPaternsLenght(inputPatern, generatedPatern);
        return inputPatern;
    }
    else
    // Check if blue button clicked
    if (button != null && button.id == blueButton.id) {
        // alert ("Blue is clicked");
        document.getElementById("blue-audio").play();
        inputPatern.push(1);
        checkPaternsLenght(inputPatern, generatedPatern);
        return inputPatern;
    }
    else
    // Check if yellow button clicked
    if (button != null && button.id == orangeButton.id) {
        // alert ("Orange is clicked");
        document.getElementById("yellow-audio").play();
        inputPatern.push(4);
        checkPaternsLenght(inputPatern, generatedPatern);
        return inputPatern;
    }
}

// Start Comparing between both patterns (Generated pattern VS User Pattern)
async function checkPaternsLenght(userPatern, generatedPatern) {
    var userPaternLenght = userPatern.length;
    var generatedPaternLength = generatedPatern.length;

    //First Step: Check if user finshed entering values by comparing both user pattern length and generated pattern lenght
    if (userPaternLenght == generatedPaternLength) {
        //Second Step: if lenght is equals, check the both patterns values
        if (generatedPatern.toString() == userPatern.toString()) {
            //Success UI mode 
            disabledButtons();
            $("#result-icon").removeClass("hide");
            $(".level").addClass("hide");
            await sleep(1000);
            $("#result-icon").addClass("hide");
            $(".level").removeClass("hide");
            //Prepare the arrays for next round 
            inputPatern = [];
            generatedPatern = [];
            //calculate and save time duration for each level
            endTime = new Date();
            var levelTime = endTime - startTime;
            singleLevelTime = (levelTime - 1000) / 1000;
            totaLtime += singleLevelTime;
            $(".list-group-flush").append("<li class='list-group-item'><i class='fas fa-check text-success mr-2'></i>Level " + userPaternLenght + " - " + singleLevelTime + "<sub>s</sub></li>");
            //Generate new level 
            generatePatern();

        }
        else {
            //Third Step: if both patterns values are not matched
            //fail UI mode 
            $("#playing").addClass("hide");
            $("#failed").removeClass("hide");
            disabledButtons();
            wrongInput();
            inputPatern = [];
            generatedPatern = [];
            patern = [];
            
            //check failure level to view result
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

        }

    }
    else {
    // Catch wrong input the user inter it by creat loop to pass every value in each patterns
        var k = 0;
        //if both pattern valus are matches let user keep playing
        for (k; k < userPaternLenght; k++) {
            if (generatedPatern[k] == userPatern[k]) {
                getUserPatern();
            }
            //if user pattern dose not matching with generated value 
            //failure UI mode 
            else {
                $("#playing").addClass("hide");
                disabledButtons();
                $("#failed").removeClass("hide");
                result = (generatedPaternLength - 1) + " level - during " + totaLtime.toFixed(2) + "s";
                wrongInput();
                //check failer level to view result
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

            };
        }

    }
}

//Generat pattern button effects
function removeActiveClass() {
    $(".active").removeClass("active");
}

//To creat a delay between each level
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//To retry Playing after failer
$("#failed").on("click", function() {
    $(".total-result").html("");
    $("ul").html("");
    $("#performance").addClass("hide");
    totaLtime = 0;
    
    //Check the sound mode
    if ($("#sound-btn").hasClass("selected")) {
        document.getElementById("red-audio").muted = true;
        document.getElementById("blue-audio").muted = true;
        document.getElementById("green-audio").muted = true;
        document.getElementById("yellow-audio").muted = true;
        document.getElementById("wrong-audio").muted = true;
    }
    else {
        document.getElementById("red-audio").muted = false;
        document.getElementById("blue-audio").muted = false;
        document.getElementById("green-audio").muted = false;
        document.getElementById("yellow-audio").muted = false;
        document.getElementById("wrong-audio").muted = false;
    }
    generatePatern();
});


//Disable and enable buttons function
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

//Setting button menu effect

$("#btn-setting").on("click", function() {
    $(".floating-btn").toggleClass("up", 1000);
    $("#btn-google-paly").toggleClass("up", 1000);
    
});

//Change background color and image buttons
$("#solid-grey").on("click", function() {
    $("body").css("background-image", "none");
    $("body").css("background-color", "#D1D1D1");
});

$("#gradient-grey").on("click", function() {
    $("body").css("background-image", "linear-gradient(to right bottom, #414141, #5a5a5a, #757575, #909090, #adadad, #adadad, #aeaeae, #aeaeae, #929292, #777777, #5d5d5d, #444444)")
});

$("#gradient-colored").on("click", function() {
    $("body").css("background-image", "linear-gradient(to right bottom, #e84b3a, #ed467a, #d45eb1, #a37ad6, #6490e2, #08a0e1, #00abd2, #00b3bb, #19bc98, #69be65, #adb92c, #f4a610)");
});

$("#gradient-greenBlue").on("click", function() {
    $("body").css("background-image", "linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)")
});

//Add check icon (Class : selected) on seleted floating menu button
var menu = document.getElementById("bg-menu");
var btns = menu.getElementsByClassName("bg-menu-item");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("selected");
        current[0].className = current[0].className.replace("selected", "");
        this.className += " selected";
    });
}

//Wrong input Sound function
function wrongInput() {
    document.getElementById("red-audio").muted = true;
    document.getElementById("blue-audio").muted = true;
    document.getElementById("green-audio").muted = true;
    document.getElementById("yellow-audio").muted = true;
    document.getElementById("wrong-audio").play();
}

//Turn sound on and off button 
$("#sound-btn").on("click", function() {
    $(this).toggleClass("selected");
    if ($(this).hasClass("selected")) {
        document.getElementById("red-audio").muted = true;
        document.getElementById("blue-audio").muted = true;
        document.getElementById("green-audio").muted = true;
        document.getElementById("yellow-audio").muted = true;
        document.getElementById("wrong-audio").muted = true;
    }
    else {
        document.getElementById("red-audio").muted = false;
        document.getElementById("blue-audio").muted = false;
        document.getElementById("green-audio").muted = false;
        document.getElementById("yellow-audio").muted = false;
        document.getElementById("wrong-audio").muted = false;

    }
});

//Open and close floatin menu button
$(".container-fluid").on("click", function() {
    if ($(".floating-btn").hasClass("up")) {
        $(".floating-btn").removeClass("up");
    }
    if ($("#btn-google-paly").hasClass("up")) {
        $("#btn-google-paly").removeClass("up");
    }
});

//Tutorial function and styling 
var hideBtns = function() {
    $("[data-role='next'],[data-role='prev'],[data-role='pause-resume'],.popover .arrow").hide();
};

var hideRightLeftBtn = function() {
    $("[data-role='next'],[data-role='prev'],[data-role='pause-resume']").hide();
};

//Tutorial API
var tour = new Tour({

    steps: [{
            element: "#game-tools",
            title: "Simon Game online",
            content: "In this game you have to use your memory to match the colores that appear on the colored weel",
            placement: "top"
        },
        {
            title: "First Step",
            element: ".middle-box",
            content: "Press Here to start the game",
            reflex: true,
            onShown: hideRightLeftBtn,
            placement: "top"
        },
        {
            title: "second Step",
            element: "#redButtonId",
            content: "Wait a second to see the color then press on it to match",
            reflex: true,
            onShown: hideRightLeftBtn,
            placement: "top"
        },
        {
            element: "#end-tour",
            content: "Note: The sequence will increase by one in every correct match you made. GOOD JOB!! now you are ready to play",
            onShown: hideBtns
        }

    ],
    backdrop: true,
    storage: false
});

$("#tour-btn").on("click", function() {
    tour.init();
    tour.start(true);

});
