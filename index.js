const chessBox = document.querySelectorAll(".chess_box");
const turnShow = document.getElementById("tog");


// //**************************************ADDING IMAGES HERE****************************************************/

function imageAdd() {

    chessBox.forEach(image => {

        if (image.innerText.length !== 0) {
            if (image.innerText == 'Wpawn' || image.innerText == 'Bpawn') {
                image.innerHTML = `${image.innerText}<img class='allimg allpawn' src="${image.innerText}.png" alt="">`

            }

            else {
                image.innerHTML = `${image.innerText}<img class='allimg' src="${image.innerText}.png" alt="">`
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
    chessBox.forEach(i1 => {
        if (i1.style.backgroundColor == 'pink') {

            chessBox.forEach(i2 => {

                if (i2.style.backgroundColor == 'green' && i2.innerText.length !== 0) {


                    greenText = i2.innerText;

                    pinkText = i1.innerText;

                    // console.log(pinkText); 
                    // console.log(greenText);

                    pinkColor = ((Array.from(pinkText)).shift()).toString();
                    greenColor = ((Array.from(greenText)).shift()).toString();
                    
                    // console.log(pinkColor)
                    // console.log(greenColor)

                    getId = i2.id;
                    arr = getId.split("");
                    arr.shift();
                    lastId = Number(arr.pop());
                    frontId = Number(arr.shift());
                    sumLstFrnt = lastId + frontId;

                    if (sumLstFrnt % 2 == 0 && pinkColor == greenColor) {
                        i2.style.backgroundColor = 'rgb(241, 215, 182)';
                    }
                    if (sumLstFrnt % 2 !== 0 && pinkColor == greenColor) {
                        i2.style.backgroundColor = 'rgb(104, 62, 7)';
                    }

                    if (pinkColor == greenColor) { // if they are of same team
                        i2.style.backgroundColor = 'red';
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

            chessBox.forEach(i => {  // it will also work for attack
                if (i.style.backgroundColor == 'pink') {
                    pinkId = i.id;
                    pinkText = i.innerText;

                    document.getElementById(pinkId).innerText = '';
                    box.innerText = pinkText;
                    colorBackground();
                    imageAdd();
                    tog = tog + 1;

                }
            })
        }


        getId = box.id
        arr = getId.split("");
        arr.shift();
        lastId = Number(arr.pop()); // aside
        arr.push('0');
        frontId = Number(arr.join('')) // aup
        console.log(frontId);
        sumLstFrnt = lastId + frontId;
        console.log(sumLstFrnt);

       
//------------------------------------------FUNCTION FOR TURNS AND PATHS STARTS--------------------------------

        function whosTurn(firstLetter) { 
        pawnMovement(lastId,frontId,sumLstFrnt,firstLetter,box);
        kingMovement(lastId,frontId,sumLstFrnt,firstLetter,box);          
                
    }


//**************************************************TOGGLING THE TEXT FOR WHO'S TURN***************************/

        if (tog % 2 !== 0) {
            turnShow.innerText = "White's Turn";
            whosTurn("W");
        } else {
            turnShow.innerText = "Black's Turn";
            whosTurn("B");
        }

        backgroundColorChange();

    })
})

//******************************************FOR PAWN MOVEMENT************************************************* */

function pawnMovement(lastId,frontId,sumLstFrnt,firstLetter,box){
    if (box.innerText == `${firstLetter}pawn`) {
        box.style.backgroundColor = "pink";

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
//***********************************************FOR KING MOVEMENT****************************************/

   function kingMovement(lastId,frontId,sumLstFrnt,firstLetter,box){
     if (box.innerText == `${firstLetter}king`) {
       if (lastId < 8) {
            document.getElementById(`b${sumLstFrnt + 1}`).style.backgroundColor = 'green'; // for white

        }
        if (lastId > 1) {

            document.getElementById(`b${sumLstFrnt - 1}`).style.backgroundColor = 'green' // for black
        }
        if (frontId < 800) {

            document.getElementById(`b${sumLstFrnt + 100}`).style.backgroundColor = 'green'
        }
        if (frontId > 100) {

            document.getElementById(`b${sumLstFrnt - 100}`).style.backgroundColor = 'green'
        }

        if (frontId > 100 && lastId < 8) {

            document.getElementById(`b${sumLstFrnt - 100 + 1}`).style.backgroundColor = 'green'
        }
        if (frontId > 100 && lastId > 1) {

            document.getElementById(`b${sumLstFrnt - 100 - 1}`).style.backgroundColor = 'green'
        }
        if (frontId < 800 && lastId < 8) {

            document.getElementById(`b${sumLstFrnt + 100 + 1}`).style.backgroundColor = 'green'
        }
        if (frontId < 800 && lastId > 1) {

            document.getElementById(`b${sumLstFrnt + 100 - 1}`).style.backgroundColor = 'green'
        }

        box.style.backgroundColor = 'pink';

    }
   }
//**********************************************MOVING THE ELEMENTS*******************************************

chessBox.forEach(hathiTest => {

    hathiTest.addEventListener('click', function () {

        if (hathiTest.style.backgroundColor == 'pink') {

            pinkId = hathiTest.id;
            pinkText = hathiTest.innerText;

            chessBox.forEach(hathiTest2 => {

                hathiTest2.addEventListener('click', function () {
                    if (hathiTest2.style.backgroundColor == 'green' && hathiTest2.innerText.length == 0) {
                        document.getElementById(pinkId).innerText = '';
                        hathiTest2.innerText = pinkText;
                        colorBackground();
                        imageAdd();

                    }

                })
            })

        }

    })

})


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