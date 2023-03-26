var randomNo1 = Math.floor(Math.random() * 6) + 1;

var randomNo2 = Math.floor(Math.random() * 6) + 1;

if(randomNo1 > randomNo2){
    document.querySelector("h1").innerHTML = "Player 1 Wins ";
}
else if(randomNo1 < randomNo2){
    document.querySelector("h1").innerHTML = "Player 2 Wins";
}
else{
    document.querySelector("h1").innerHTML = "Draw";
}

var randomDiceImage = "dice" + randomNo1 + ".png";
var randomImageSource = "images/" + randomDiceImage;
var image1 = document.querySelectorAll("img")[0];
image1.setAttribute("src",randomImageSource);

var randomDiceImage2 = "dice" + randomNo2 + ".png";
var randomImageSource2 = "images/" + randomDiceImage2;
document.querySelectorAll("img")[1].setAttribute("src",randomImageSource2);