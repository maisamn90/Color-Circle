var patern = [];
     async function generatePatern(){
        document.getElementById("start").disabled = true;
        var i = 0;
        var j = 0;
        var paternlength = patern.length + 1;
         for (i ; i< 100 ; i++){
           for (j ; j< paternlength; j++){
               var x = Math.floor((Math.random() * 4) + 1);
               patern.push(x);
                 // document.getElementById("demo").innerHTML = "[" + patern + "]";
                  if (patern.length == paternlength){
                       for (var l = 0 ; l < 4; l++){
                           if(patern[l] == 1){
                               $(".blue-quarter").addClass("active");
                            //   removeActiveClass(3000);
                            setTimeout(removeActiveClass, 1000);
                            await sleep(2000);
                            
                           }
                           else if (patern[l] == 2){
                                   $(".red-quarter").addClass("active");
                                   setTimeout(removeActiveClass, 1000);
                                   await sleep(2000);
                               }
                            else  if (patern[l] == 3){
                                   $(".green-quarter").addClass("active");
                                   setTimeout(removeActiveClass, 1000);
                                   await sleep(2000);
                               }
                            else {
                            if (patern[l] == 4){
                                   $(".yellow-quarter").addClass("active");
                                   setTimeout(removeActiveClass, 1000);
                                   await sleep(2000);
                               }
                           
                       }
                   }
                  }
                      
                   
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
        if (button != null  && button.id == redButton.id){
            alert ("Red is clicked");
            inputPatern.push(2);
            checkPaternsLenght(inputPatern, generatedPatern);
            return inputPatern;
            } 
            else 
            if (button != null  && button.id == greenButton.id){
                alert ("green is clicked");
                inputPatern.push(3);
                checkPaternsLenght(inputPatern, generatedPatern);
                return inputPatern;
            }
            else 
            if (button != null  && button.id == blueButton.id){
                alert ("Blue is clicked");
                inputPatern.push(1);
                checkPaternsLenght(inputPatern, generatedPatern);
                return inputPatern;
            }
            else 
            if (button != null  && button.id == orangeButton.id){
                alert ("Orange is clicked");
                inputPatern.push(4);
                checkPaternsLenght(inputPatern, generatedPatern);
                return inputPatern;
            }
           
            
            
            }
            
            
            function checkPaternsLenght(userPatern,generatedPatern ){
                var userPaternLenght = userPatern.length;
                var generatedPaternLength = generatedPatern.length;
                
              if (userPaternLenght == generatedPaternLength) {
                  alert ("length is equals");
                  alert(generatedPatern.toString());
                  alert(userPatern.toString());
                     if (generatedPatern.toString() == userPatern.toString()){
                         alert("Success");
                         inputPatern = [];
                         generatedPatern = [];
                         generatePatern();
                     }
                     else{
                         alert("Not");
                          //document.getElementById("demo").innerHTML = "";
                          inputPatern = [];
                          generatedPatern = [];
                          patern = [];
                          //document.getElementById("start").disabled = false;
                     }
                 
                  }
                  else {
                      var k=0;
                      for (k; k < userPaternLenght; k++){
                      if (generatedPatern[k] == userPatern[k]){
                      getUserPatern();
                          }
                          
                          else {
                              alert("wrong input");
                              generatedPatern = [];
                              inputPatern = [];
                              // document.getElementById("demo").innerHTML = "";
                               //document.getElementById("start").disabled = false;
                              
                          };
                      }
                      
                  }
            }
            
            function removeActiveClass(){
                $(".active").removeClass("active");
            }
            
            function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
            }