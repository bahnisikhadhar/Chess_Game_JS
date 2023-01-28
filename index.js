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
    chessBox.forEach(ele1 => {
        if (ele1.style.backgroundColor == 'rgb(240, 240, 65)') {

            chessBox.forEach(ele2 => {

                if (ele2.style.backgroundColor == 'green' && ele2.innerText.length !== 0) {


                    greenText = ele2.innerText;

                    pinkText = ele1.innerText;

                    // console.log(pinkText); 
                    // console.log(greenText);

                    pinkColor = ((Array.from(pinkText)).shift()).toString();
                    greenColor = ((Array.from(greenText)).shift()).toString();
                    
                    // console.log(pinkColor)
                    // console.log(greenColor)

                    getId = ele2.id;
                    arr = getId.split("");
                    arr.shift();
                    lastId = Number(arr.pop());
                    frontId = Number(arr.shift());
                    sumLstFrnt = lastId + frontId;

                    if (sumLstFrnt % 2 == 0 && pinkColor == greenColor) {
                        ele2.style.backgroundColor = 'rgb(241, 215, 182)';
                    }
                    if (sumLstFrnt % 2 !== 0 && pinkColor == greenColor) {
                        ele2.style.backgroundColor = 'rgb(104, 62, 7)';
                    }

                    if (pinkColor == greenColor) { // if they are of same team
                        ele2.style.backgroundColor = 'gray';
                    }
                    // if (pinkColor !== greenColor) { // if they are of different team
                    //     ele2.style.backgroundColor = 'red';
                    // }
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
                if (i.style.backgroundColor == 'rgb(240, 240, 65)') {
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
            // calling functions for individual element movement

        pawnMovement(lastId,frontId,sumLstFrnt,firstLetter,box);
        kingMovement(lastId,frontId,sumLstFrnt,firstLetter,box);  
        rookMovement(lastId,frontId,sumLstFrnt,firstLetter,box); 
        bishopMovement(lastId,frontId,sumLstFrnt,firstLetter,box);
        knightMovement(lastId,frontId,sumLstFrnt,firstLetter,box);
                
    }


//**********************************************TOGGLING THE TEXT FOR WHO'S TURN***************************/

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
//***********************************************FOR KING MOVEMENT****************************************/

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
//************************************************FOR ROOK MOVEMENT******************************************/

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

        // for (let i = 1; i < 9; i++) {

        //     if ((sumLstFrnt + i) < (frontId + 9) && document.getElementById(`b${sumLstFrnt + i}`).innerText == 0) {
        //         document.getElementById(`b${sumLstFrnt + i}`).style.backgroundColor = 'green'
        //     }
        //     else if ((sumLstFrnt + i) < (frontId + 9) && document.getElementById(`b${sumLstFrnt + i}`).innerText !== 0) {
        //         document.getElementById(`b${sumLstFrnt + i}`).style.backgroundColor = 'green'
        //         break
        //     }
        // }

        for (let i = 1; i < 9; i++) { // for white and black horizontal selection

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

//************************************************FOR BISHOP MOVEMENT****************************************/

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

//*********************************************FOR KNIGHT MOVEMENT****************************************/

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
//**********************************************MOVING THE ELEMENTS*******************************************

chessBox.forEach(box => {

    box.addEventListener('click', function () {

        if (box.style.backgroundColor == 'rgb(240, 240, 65)') {

            pinkId = box.id;
            pinkText = box.innerText;

            chessBox.forEach(box2 => {

                box2.addEventListener('click', function () {
                    if (box2.style.backgroundColor == 'green' && box2.innerText.length == 0) {
                        document.getElementById(pinkId).innerText = '';
                        box2.innerText = pinkText;
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