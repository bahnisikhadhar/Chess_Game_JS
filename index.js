const chessBox = document.querySelectorAll(".chess_box");
// const turnShow = document.getElementById("tog");


// //**************************************ADDING IMAGES HERE****************************************************/

function imageAdd() {

    chessBox.forEach(image => {

        if (image.innerText.length !== 0) {
            if (image.innerText == 'Wpawn' || image.innerText == 'Bpawn') {
                image.innerHTML = `<img class='allpawn' src="${image.innerText}.png" alt="">`

            }

            else {
               image.innerHTML = `<img src="${image.innerText}.png" alt="">`
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
        aside = Number(arr.pop()) // 1
        aup = Number(arr.shift())// 8
        a = aside + aup
        console.log(Number(a));
        if (a % 2 == 0) {
            color.style.backgroundColor = 'rgb(241, 215, 182)'
        }
        if (a % 2 !== 0) {
            color.style.backgroundColor = 'rgb(104, 62, 7)'
        }

    })
}
colorBackground();

