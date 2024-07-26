const chessBox = document.querySelectorAll(".chess_box");
const turnShow = document.getElementById("tog");
const winboxWhite = document.querySelector(".winbox_container_white");
const winboxBlack = document.querySelector(".winbox_container_black");
const moveSound = document.querySelector(".move_sound");
const winSound = document.querySelector(".win_sound");
const wrongAlert = document.querySelector(".wrong_select");
const turnShowContainer = document.querySelector(".turn_container");
const button = document.querySelector("button");
const muteContainer = document.querySelector(".mute");
const soundOn = document.querySelector(".fa-volume-off");
const soundOff = document.querySelector(".fa-volume-xmark");
const attackSound = document.querySelector(".attack_sound");

//************************************************GENERAL JS FOR OTHER PARTS***************************************/

muteContainer.addEventListener("click",()=>{
 soundOff.classList.toggle("display_none");
 soundOn.classList.toggle("display_none");
})

button.addEventListener("click",()=>{
    location.reload();
})

winboxWhite.addEventListener("click",()=>{
    winboxWhite.style.display = "none";
    location.reload();
})
winboxBlack.addEventListener("click",()=>{
    winboxBlack.style.display = "none";
    location.reload();
})
// //**************************************ADDING IMAGES HERE****************************************************/

function imageAdd() {

    chessBox.forEach(image => {

        if (image.innerText.length !== 0) {
            if (image.innerText == 'Wpawn' || image.innerText == 'Bpawn') {
                image.innerHTML = `${image.innerText}<img class='allimg allpawn' src="Images/${image.innerText}.png" alt="">`
            }
            else {
                image.innerHTML = `${image.innerText}<img class='allimg' src="Images/${image.innerText}.png" alt="">`
            }
        }
    })
}

imageAdd();

// //******************************************ADDING COLOUR TO THE BOXES HERE*************************************/

function colorBackground() {

    chessBox.forEach(color => {

        getId = color.id; //"b801"
        arr = getId.split("");// ["b","8","0","1"]
        arr.shift(); // ["8","0","1"]
        lastId = Number(arr.pop()) // 1
        frontId = Number(arr.shift())// 8
        sumLstFrnt = lastId + frontId;
        // console.log(Number(sumLstFrnt));
        if (sumLstFrnt % 2 == 0) {
            color.style.backgroundColor = 'rgb(241, 215, 182)';
        }
        if (sumLstFrnt % 2 !== 0) {
            color.style.backgroundColor = 'rgb(104, 62, 7)';
            
        }

    })
}
colorBackground();

// ********************************************************************************************************

function backgroundColorChange() {
    chessBox.forEach(ele1 => {
        if (ele1.style.backgroundColor == 'rgb(240, 240, 65)') {

            chessBox.forEach(ele2 => {

                if (ele2.style.backgroundColor == 'green' && ele2.innerText.length !== 0) {


                    greenText = ele2.innerText;
                    yellowText = ele1.innerText;

                    yellowColor = ((Array.from(yellowText)).shift()).toString();
                    greenColor = ((Array.from(greenText)).shift()).toString();

                    getId = ele2.id;
                    arr = getId.split("");
                    arr.shift();
                    lastId = Number(arr.pop());
                    frontId = Number(arr.shift());
                    sumLstFrnt = lastId + frontId;

                    if (sumLstFrnt % 2 == 0 && yellowColor == greenColor) {
                        ele2.style.backgroundColor = 'rgb(241, 215, 182)';
                    }
                    if (sumLstFrnt % 2 !== 0 && yellowColor == greenColor) {
                        ele2.style.backgroundColor = 'rgb(104, 62, 7)';
                    }

                    if (yellowColor == greenColor) { // if they are of same team
                        ele2.style.backgroundColor = 'gray';
                    }
                    if (yellowColor !== greenColor) { // if they are of different team
                        ele2.style.backgroundColor = 'red';
                    }
                }

            })
        }
    })
}


// **********************************************************************************************************
let tog = 1;
chessBox.forEach((box) => {
    box.addEventListener("click", () => {

        if (box.style.backgroundColor == 'green' && box.innerText.length == 0) {
            tog = tog + 1
        }

        else if (box.style.backgroundColor == 'green' && box.innerText.length !== 0) {

            chessBox.forEach(i => {
                if (i.style.backgroundColor == 'rgb(240, 240, 65)') {
                    yellowId = i.id;
                    yellowText = i.innerText;

                    document.getElementById(yellowId).innerText = '';
                    box.innerText = yellowText;
                    colorBackground();
                    imageAdd();
                    tog = tog + 1;

                }
            })
        }
        else if (box.style.backgroundColor == 'red' && box.innerText.length !== 0){ // for attack
            chessBox.forEach(i => {
                if (i.style.backgroundColor == 'rgb(240, 240, 65)') {
                    yellowId = i.id;
                    yellowText = i.innerText;

                    document.getElementById(yellowId).innerText = '';
                    box.innerText = yellowText;
                    colorBackground();
                    imageAdd();
                    if(soundOn.classList.contains("fa-volume-off") && soundOff.classList.contains("display_none")){
                        attackSound.play();
                    }
                    tog = tog + 1;

                }
            })   
        }


        getId = box.id;
        arr = getId.split("");
        arr.shift();
        lastId = Number(arr.pop()); 
        arr.push('0');
        frontId = Number(arr.join('')) 
       // console.log(frontId);
        sumLstFrnt = lastId + frontId;
        //console.log(sumLstFrnt);

       
//-----------------------------------FUNCTION FOR INDIVIDUAL ELEMENTS' TURNS AND PATHS STARTS--------------------------------

        function whosTurn(firstLetter) { 
            

        pawnMovement(lastId,frontId,sumLstFrnt,firstLetter,box);
        kingMovement(lastId,frontId,sumLstFrnt,firstLetter,box);  
        rookMovement(lastId,frontId,sumLstFrnt,firstLetter,box); 
        bishopMovement(lastId,frontId,sumLstFrnt,firstLetter,box);
        knightMovement(lastId,frontId,sumLstFrnt,firstLetter,box);
        queenMovement(lastId,frontId,sumLstFrnt,firstLetter,box);
                
    }


//**************************************TOGGLING THE TEXT FOR WHO'S TURN***************************/

        if (tog % 2 !== 0) {
            turnShow.innerText = "White's Turn";
            // chessBox.forEach((box)=>{
            //     box.addEventListener("click",(event)=>{
            //        console.log(box.innerText.split("").splice(0,1));
            //       if(tog % 2 !== 0 && box.innerText.split("").splice(0,1)=="B"){
            //         wrongAlert.play();
            //       }
            //     })
            // })
            turnShowContainer.style.backgroundColor = "burlywood";
            turnShowContainer.style.transform = "scale(1.2)";
            turnShow.style.transform = "scale(1.6)";
            setTimeout(()=>{
                turnShowContainer.style.transform = "scale(1)";
                turnShow.style.transform = "scale(1)";
            },1000);
            whosTurn("W");
        } else {
            turnShow.innerText = "Black's Turn";
            // chessBox.forEach((box)=>{
            //     box.addEventListener("click",(event)=>{
            //        console.log(box.innerText.split("").splice(0,1));
            //       if(tog % 2 == 0 && box.innerText.split("").splice(0,1)=="W"){
            //         wrongAlert.play();
            //       }
            //     })
            // })
            turnShowContainer.style.backgroundColor = "black";
            turnShowContainer.style.color = "white";
            turnShowContainer.style.transform = "scale(1.2)";
            turnShow.style.transform = "scale(1.6)";
            setTimeout(()=>{
                turnShowContainer.style.transform = "scale(1)";
                turnShow.style.transform = "scale(1)";
            },1000);
            whosTurn("B");
        }

        backgroundColorChange();
        win();

    })
})

//******************************************FOR PAWN MOVEMENT PATH************************************************* */

function pawnMovement(lastId,frontId,sumLstFrnt,firstLetter,box){
    if (box.innerText == `${firstLetter}pawn`) {
        box.style.backgroundColor = "rgb(240, 240, 65)";

        if (tog % 2 !== 0 && frontId < 800) { // if it's turn for white and if it's not the end line of black

            if (document.getElementById(`b${sumLstFrnt + 100}`).innerText.length == 0 && frontId == 200) { // for 1st time move
                document.getElementById(`b${sumLstFrnt + 100}`).style.backgroundColor = 'green';
                document.getElementById(`b${sumLstFrnt + 200}`).style.backgroundColor = 'green';
            }
            if (document.getElementById(`b${sumLstFrnt + 100}`).innerText.length == 0 && frontId !== 200) { // for other moves
                document.getElementById(`b${sumLstFrnt + 100}`).style.backgroundColor = 'green';
            }

            if (lastId < 8 && document.getElementById(`b${sumLstFrnt + 100 + 1}`).innerText.length !== 0) { // for diagonal
                document.getElementById(`b${sumLstFrnt + 100 + 1}`).style.backgroundColor = 'green';
            }

            if (lastId > 1 && document.getElementById(`b${sumLstFrnt + 100 - 1}`).innerText.length !== 0) { // for diagonal
                document.getElementById(`b${sumLstFrnt + 100 - 1}`).style.backgroundColor = 'green';

            }
        }

        if (tog % 2 == 0 && frontId > 100) { //turn for black and it's not the end line of white 

            if (document.getElementById(`b${sumLstFrnt - 100}`).innerText.length == 0 && frontId == 700) {
                document.getElementById(`b${sumLstFrnt - 100}`).style.backgroundColor = 'green';
                document.getElementById(`b${sumLstFrnt - 200}`).style.backgroundColor = 'green';
            }
            if (document.getElementById(`b${sumLstFrnt - 100}`).innerText.length == 0 && frontId !== 700) {
                document.getElementById(`b${sumLstFrnt - 100}`).style.backgroundColor = 'green';
                
            }
            if (lastId < 8 && document.getElementById(`b${sumLstFrnt - 100 + 1}`).innerText.length !== 0) { // for diagonal
                document.getElementById(`b${sumLstFrnt - 100 + 1}`).style.backgroundColor = 'green';
            }
            if (lastId > 1 && document.getElementById(`b${sumLstFrnt - 100 - 1}`).innerText.length !== 0) { // for diagonal
                document.getElementById(`b${sumLstFrnt - 100 - 1}`).style.backgroundColor = 'green';

            }
        }
    }
}
//***********************************************FOR KING MOVEMENT PATH****************************************/

   function kingMovement(lastId,frontId,sumLstFrnt,firstLetter,box){
     if (box.innerText == `${firstLetter}king`) { 
       if (lastId < 8) {  // for right box selection both black & white
            document.getElementById(`b${sumLstFrnt + 1}`).style.backgroundColor = 'green'; 
        }

        if (lastId > 1) { // for left box selection both black & white
          document.getElementById(`b${sumLstFrnt - 1}`).style.backgroundColor = 'green';
        }

        if (frontId < 800) { // for white, front box selection
          document.getElementById(`b${sumLstFrnt + 100}`).style.backgroundColor = 'green'
        }

        if (frontId > 100) { //for black, front box selection
          document.getElementById(`b${sumLstFrnt - 100}`).style.backgroundColor = 'green'
        }

        if (frontId > 100 && lastId < 8) { // for black right diagonal box
           document.getElementById(`b${sumLstFrnt - 100 + 1}`).style.backgroundColor = 'green'
        }

        if (frontId > 100 && lastId > 1) { // for black left diagonal box
           document.getElementById(`b${sumLstFrnt - 100 - 1}`).style.backgroundColor = 'green'
        }

        if (frontId < 800 && lastId < 8) { // for white right diagonal box
            document.getElementById(`b${sumLstFrnt + 100 + 1}`).style.backgroundColor = 'green'
        }

        if (frontId < 800 && lastId > 1) { // for white left diagonal box
            document.getElementById(`b${sumLstFrnt + 100 - 1}`).style.backgroundColor = 'green'
        }

        box.style.backgroundColor = 'rgb(240, 240, 65)';

    }
   }
//************************************************FOR ROOK MOVEMENT PATH******************************************/

 function rookMovement(lastId,frontId,sumLstFrnt,firstLetter,box){
    if (box.innerText == `${firstLetter}rook`) {

        for (let i = 1; i < 9; i++) { // for white vertical selection

            if ((sumLstFrnt + i * 100) < 900 && document.getElementById(`b${sumLstFrnt + i * 100}`).innerText == 0) {
                document.getElementById(`b${sumLstFrnt + i * 100}`).style.backgroundColor = 'green';
            }
            else if ((sumLstFrnt + i * 100) < 900 && document.getElementById(`b${sumLstFrnt + i * 100}`).innerText !== 0) {
                document.getElementById(`b${sumLstFrnt + i * 100}`).style.backgroundColor = 'green';
                break;
            }
        }

        for (let i = 1; i < 9; i++) { // for black vertical selection

            if ((sumLstFrnt - i * 100) > 100 && document.getElementById(`b${sumLstFrnt - i * 100}`).innerText == 0) {
                document.getElementById(`b${sumLstFrnt - i * 100}`).style.backgroundColor = 'green'
            }
            else if ((sumLstFrnt - i * 100) > 100 && document.getElementById(`b${sumLstFrnt - i * 100}`).innerText !== 0) {
                document.getElementById(`b${sumLstFrnt - i * 100}`).style.backgroundColor = 'green'
                break
            }
        }

        for (let i = 1; i < 9; i++) { // for white and black horizontal right selection

            if ((sumLstFrnt + i) < (frontId + 9) && document.getElementById(`b${sumLstFrnt + i}`).innerText == 0) {
                document.getElementById(`b${sumLstFrnt + i}`).style.backgroundColor = 'green'
            }
            else if ((sumLstFrnt + i) < (frontId + 9) && document.getElementById(`b${sumLstFrnt + i}`).innerText !== 0) {
                document.getElementById(`b${sumLstFrnt + i}`).style.backgroundColor = 'green'
                break
            }
        }

        for (let i = 1; i < 9; i++) { // for white and black horizontal left selection

            if ((sumLstFrnt - i) > (frontId) && document.getElementById(`b${sumLstFrnt - i}`).innerText == 0) {
                document.getElementById(`b${sumLstFrnt - i}`).style.backgroundColor = 'green';
            }
            else if ((sumLstFrnt - i) > (frontId) && document.getElementById(`b${sumLstFrnt - i}`).innerText !== 0) {
                document.getElementById(`b${sumLstFrnt - i}`).style.backgroundColor = 'green';
                break;
            }
        }

        box.style.backgroundColor = 'rgb(240, 240, 65)';
    }


 }

//************************************************FOR BISHOP MOVEMENT PATH****************************************/

function bishopMovement(lastId,frontId,sumLstFrnt,firstLetter,box){
    if (box.innerText == `${firstLetter}bishop`) {


        for (let i = 1; i < 9; i++) { // right diagonal box selection for white
            if (i < (900 - frontId) / 100 && i < 9 - lastId && document.getElementById(`b${sumLstFrnt + i * 100 + i}`).innerText.length == 0) {
                document.getElementById(`b${sumLstFrnt + i * 100 + i}`).style.backgroundColor = 'green'
            }
            else if (i < (900 - frontId) / 100 && i < 9 - lastId && document.getElementById(`b${sumLstFrnt + i * 100 + i}`).innerText.length !== 0) {
                document.getElementById(`b${sumLstFrnt + i * 100 + i}`).style.backgroundColor = 'green'
                break
            }
        }


        for (let i = 1; i < 9; i++) { // right diagonal box selection for black
            if (i < frontId / 100 && i < 9 - lastId && document.getElementById(`b${sumLstFrnt - i * 100 + i}`).innerText.length == 0) {
                document.getElementById(`b${sumLstFrnt - i * 100 + i}`).style.backgroundColor = 'green';
            }
            else if (i < frontId / 100 && i < 9 - lastId && document.getElementById(`b${sumLstFrnt - i * 100 + i}`).innerText.length !== 0) {
                document.getElementById(`b${sumLstFrnt - i * 100 + i}`).style.backgroundColor = 'green';
                break;
            }
        }


        for (let i = 1; i < 9; i++) { // left diagonal box selection for white
            if (i < (900 - frontId) / 100 && i < lastId && document.getElementById(`b${sumLstFrnt + i * 100 - i}`).innerText.length == 0) {
                document.getElementById(`b${sumLstFrnt + i * 100 - i}`).style.backgroundColor = 'green';
            }
            else if (i < (900 - frontId) / 100 && i < lastId && document.getElementById(`b${sumLstFrnt + i * 100 - i}`).innerText.length !== 0) {
                document.getElementById(`b${sumLstFrnt + i * 100 - i}`).style.backgroundColor = 'green';
                break;
            }

        }


        for (let i = 1; i < 9; i++) { // left diagonal box selection for black
            if (i < frontId / 100 && i < lastId && document.getElementById(`b${sumLstFrnt - i * 100 - i}`).innerText.length == 0) {
                document.getElementById(`b${sumLstFrnt - i * 100 - i}`).style.backgroundColor = 'green';
            }
            else if (i < frontId / 100 && i < lastId && document.getElementById(`b${sumLstFrnt - i * 100 - i}`).innerText.length !== 0) {
                document.getElementById(`b${sumLstFrnt - i * 100 - i}`).style.backgroundColor = 'green';
                break;
            }
        }



        box.style.backgroundColor = 'rgb(240, 240, 65)';

    }

}

//*********************************************FOR KNIGHT MOVEMENT PATH****************************************/

function knightMovement(lastId,frontId,sumLstFrnt,firstLetter,box){
    if (box.innerText == `${firstLetter}knight`) {

        if (lastId < 7 && frontId < 800) { // for right box front next line 
            document.getElementById(`b${sumLstFrnt + 100 + 2}`).style.backgroundColor = 'green';
        }

        if (lastId < 7 && frontId > 200) { // for right box back previous line
            document.getElementById(`b${sumLstFrnt - 100 + 2}`).style.backgroundColor = 'green';
        }

        if (lastId < 8 && frontId < 700) { // for right box front next to next line
            document.getElementById(`b${sumLstFrnt + 200 + 1}`).style.backgroundColor = 'green';    
        }

        if (lastId > 1 && frontId < 700) { // for left box front next to next line
            document.getElementById(`b${sumLstFrnt + 200 - 1}`).style.backgroundColor = 'green';
        }

        if (lastId > 2 && frontId < 800) { // for left box front next line 
            document.getElementById(`b${sumLstFrnt + 100 - 2 }`).style.backgroundColor = 'green';
        }

        if (lastId > 2 && frontId > 100) { // for left box back previous line
            document.getElementById(`b${sumLstFrnt - 100 - 2 }`).style.backgroundColor = 'green';
        }

        if (lastId < 8 && frontId > 200) { // for right box back previous to previous line
            document.getElementById(`b${sumLstFrnt - 200 + 1}`).style.backgroundColor = 'green';
        }

        if (lastId > 1 && frontId > 200) { // for left box back previous to previous line
            document.getElementById(`b${sumLstFrnt - 200 - 1}`).style.backgroundColor = 'green';
        }

        box.style.backgroundColor = 'rgb(240, 240, 65)';

    }
}

//*****************************************FOR QUEEN MOVEMENT PATH************************************************/

function queenMovement(lastId,frontId,sumLstFrnt,firstLetter,box){
    if (box.innerText == `${firstLetter}queen`) {


        for (let i = 1; i < 9; i++) { // for exact front box/boxes (white)

            if ((sumLstFrnt + i * 100) < 900 && document.getElementById(`b${sumLstFrnt + i * 100}`).innerText == 0) {
                document.getElementById(`b${sumLstFrnt + i * 100}`).style.backgroundColor = 'green';
            }
            else if ((sumLstFrnt + i * 100) < 900 && document.getElementById(`b${sumLstFrnt + i * 100}`).innerText !== 0) {
                document.getElementById(`b${sumLstFrnt + i * 100}`).style.backgroundColor = 'green';
                break;
            }
        }

        for (let i = 1; i < 9; i++) { // for exact front box/boxes (black)

            if ((sumLstFrnt - i * 100) > 100 && document.getElementById(`b${sumLstFrnt - i * 100}`).innerText == 0) {
                document.getElementById(`b${sumLstFrnt - i * 100}`).style.backgroundColor = 'green';
            }
            else if ((sumLstFrnt - i * 100) > 100 && document.getElementById(`b${sumLstFrnt - i * 100}`).innerText !== 0) {
                document.getElementById(`b${sumLstFrnt - i * 100}`).style.backgroundColor = 'green';
                break;
            }
        }

        for (let i = 1; i < 9; i++) { // for right box both white and black

            if ((sumLstFrnt + i) < (frontId + 9) && document.getElementById(`b${sumLstFrnt + i}`).innerText == 0) {
                document.getElementById(`b${sumLstFrnt + i}`).style.backgroundColor = 'green';
            }
            else if ((sumLstFrnt + i) < (frontId + 9) && document.getElementById(`b${sumLstFrnt + i}`).innerText !== 0) {
                document.getElementById(`b${sumLstFrnt + i}`).style.backgroundColor = 'green';
                break;
            }
        }

        for (let i = 1; i < 9; i++) { // for left box both white and black

            if ((sumLstFrnt - i) > (frontId) && document.getElementById(`b${sumLstFrnt - i}`).innerText == 0) {
                document.getElementById(`b${sumLstFrnt - i}`).style.backgroundColor = 'green';
            }
            else if ((sumLstFrnt - i) > (frontId) && document.getElementById(`b${sumLstFrnt - i}`).innerText !== 0) {
                document.getElementById(`b${sumLstFrnt - i}`).style.backgroundColor = 'green';
                break;
            }
        }



        for (let i = 1; i < 9; i++) { // for right diagonal box (white)
            if (i < (900 - frontId) / 100 && i < 9 - lastId && document.getElementById(`b${sumLstFrnt + i * 100 + i}`).innerText.length == 0) {
                document.getElementById(`b${sumLstFrnt + i * 100 + i}`).style.backgroundColor = 'green';
            }
            else if (i < (900 - frontId) / 100 && i < 9 - lastId  && document.getElementById(`b${sumLstFrnt + i * 100 + i}`).innerText.length !== 0) {
                document.getElementById(`b${sumLstFrnt + i * 100 + i}`).style.backgroundColor = 'green';
                break;
            }
        }


        for (let i = 1; i < 9; i++) {  // for right diagonal box (black)
            if (i < frontId / 100 && i < 9 - lastId && document.getElementById(`b${sumLstFrnt - i * 100 + i}`).innerText.length == 0) {
                document.getElementById(`b${sumLstFrnt - i * 100 + i}`).style.backgroundColor = 'green';
            }
            else if (i < frontId / 100 && i < 9 - lastId && document.getElementById(`b${sumLstFrnt - i * 100 + i}`).innerText.length !== 0) {
                document.getElementById(`b${sumLstFrnt - i * 100 + i}`).style.backgroundColor = 'green';
                break;
            }
        }


        for (let i = 1; i < 9; i++) { // for left diagonal box (white)
            if (i < (900 - frontId) / 100 && i < lastId && document.getElementById(`b${sumLstFrnt + i * 100 - i}`).innerText.length == 0) {
                document.getElementById(`b${sumLstFrnt + i * 100 - i}`).style.backgroundColor = 'green';
            }
            else if (i < (900 - frontId) / 100 && i < lastId && document.getElementById(`b${sumLstFrnt + i * 100 - i}`).innerText.length !== 0) {
                document.getElementById(`b${sumLstFrnt + i * 100 - i}`).style.backgroundColor = 'green';
                break;
            }

        }


        for (let i = 1; i < 9; i++) { // for left diagonal box (black)
            if (i < frontId / 100 && i < lastId && document.getElementById(`b${sumLstFrnt - i * 100 - i}`).innerText.length == 0) {
                document.getElementById(`b${sumLstFrnt - i * 100 - i}`).style.backgroundColor = 'green';
            }
            else if (i < frontId / 100 && i < lastId && document.getElementById(`b${sumLstFrnt - i * 100 - i}`).innerText.length !== 0) {
                document.getElementById(`b${sumLstFrnt - i * 100 - i}`).style.backgroundColor = 'green';
                break;
            }
        }



        box.style.backgroundColor = 'rgb(240, 240, 65)';

    }
}
//**********************************************MOVING THE ELEMENTS*******************************************

chessBox.forEach(box => {

    box.addEventListener('click', function () {

        if (box.style.backgroundColor == 'rgb(240, 240, 65)') {

            yellowId = box.id;
            yellowText = box.innerText;

            chessBox.forEach(box2 => {

                box2.addEventListener('click', function () {
                    if (box2.style.backgroundColor == 'green' && box2.innerText.length == 0) {
                        document.getElementById(yellowId).innerText = '';
                        box2.innerText = yellowText;
                        colorBackground();
                        imageAdd();
                        if(soundOn.classList.contains("fa-volume-off") && soundOff.classList.contains("display_none")){
                        moveSound.play();
                        }
                     }

                })
            })

        }

    })

})
//********************************************************************************************** */
function win(){
let numOfKings = 0;


chessBox.forEach(box => {
    if (box.innerText == 'Wking' || box.innerText == 'Bking') {
        numOfKings++;
    }

})

if (numOfKings == 1) {
        if (tog % 2 == 0) {
            winboxWhite.style.display = "flex";
            winSound.play();
        }
        else if (tog % 2 !== 0) {
            winboxBlack.style.display = "flex";
            winSound.play();
        }   
}
}
//*************************************PREVENT SELECTING MULTIPLE ELEMENTS*******************************
let count = 0;
chessBox.forEach(ele => {
    ele.addEventListener('click', function () {
        count++;
        if (count % 2 == 0 && ele.style.backgroundColor !== 'green') {
            colorBackground();
        }
    })
})