const chessBox = document.querySelectorAll(".chess_box");

// chessBox.forEach((image)=>{
    // image.addEventListener("click",(e)=>{
    //     console.log(image.innerText);
    // })
// })

function imageAdd() {

    chessBox.forEach(image => {

        if (image.innerText.length !== 0) {
            if (image.innerText == 'Wpawn' || image.innerText == 'Bpawn') {
                image.innerHTML = `<img class='allpawn' src="./Image/${image.innerText}.png" alt="">`

            }

            else {
               image.innerHTML = `<img src="./Image/${image.innerText}.png" alt="">`
            }
        }
    })
}

imageAdd();

