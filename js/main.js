const cards = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
const types = ['s', 'h', 'c', 'd'];
let sum = 0;
const reload = `<a href="#" class="noStyles">
                    <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.5 4.59375C13.5238 4.59375 4.59375 13.5238 4.59375 24.5C4.59375 35.4762 13.5238 44.4062
                    24.5 44.4062C35.4762 44.4062 44.4062 35.4762 44.4062 24.5C44.4062 13.5238 35.4762 4.59375 24.5 
                    4.59375ZM35.9844 22.851H27.4668L30.9963 19.3215L30.4604 18.6985C29.5018 17.7033 28.3114 16.9611 
                    26.9959 16.5384C25.6803 16.1157 24.2805 16.0255 22.9216 16.276C21.5626 16.5265 20.287 17.1099 
                    19.2086 17.9739C18.1302 18.8379 17.2828 19.9557 16.742 21.2273C16.2012 22.4989 15.984 23.8847 
                    16.1097 25.2608C16.2354 26.6369 16.7002 27.9604 17.4624 29.1129C18.2246 30.2655 19.2606 31.2112 
                    20.4777 31.8656C21.6948 32.5199 23.055 32.8624 24.4368 32.8625C26.1662 32.8609 27.8526 32.3243 
                    29.2649 31.3262C30.6771 30.3281 31.7459 28.9175 32.3247 27.2878L32.8386 25.8398L35.726 
                    26.861L35.2188 28.309C34.5208 30.2841 33.2934 32.0294 31.6705 33.3541C30.0477 34.6788 28.0919 
                    35.5319 26.017 35.8202C23.9421 36.1084 21.8279 35.8208 19.9054 34.9886C17.9829 34.1564 16.3262 
                    32.8118 15.1163 31.1017C13.9064 29.3916 13.1899 27.3818 13.045 25.292C12.9002 23.2021 13.3326 
                    21.1127 14.2951 19.252C15.2575 17.3914 16.7129 15.8311 18.5022 14.7417C20.2915 13.6523 22.3458 
                    13.0757 24.4407 13.075C25.9867 13.0691 27.5176 13.3798 28.939 13.9879C30.3604 14.5961 31.6423 
                    15.4888 32.7056 16.6112L32.7592 16.6705L33.1717 17.149L35.9844 14.3373V22.851Z" fill="#DAA520"/>
                    </svg>
                </a>`;

let clickable1 = true, clickable2 = true;

function randGen13() {
    let x = Math.floor(Math.random() * 13);
    return x;
}

function randGenTyp() {
    let x = Math.floor(Math.random() * 4);
    return x;
}


function getStatus() {

    let message = "", messageEl = document.querySelector(".status");
    let sumTxt = document.querySelector(".sumt");
    
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
    } else {
        message = "You're out of the game!"
    }

    if (message === "You've got Blackjack!") {
        messageEl.innerHTML = `<p class = "winning"><i>${message}</i></p>`;
    } else messageEl.innerHTML = `<p><i>${message}</i></p>`;

    if (message === "You've got Blackjack!" || message === "You're out of the game!") {        
        messageEl.innerHTML += reload;
        document.querySelector(".noStyles").addEventListener('click', hello);

        function hello() {
            location.reload('true');
        }                
    }

    
    sumTxt.textContent = `Sum: ${sum}`;
}

function gameBtn() {
    let x = randGen13(), y = randGenTyp();
    let card1 = cards[x], type1 = types[y];

    let xx = randGen13(), yy = randGenTyp();
    let card2 = cards[xx], type2 = types[yy];

    if (x === 0) sum += 11;
    else if (x >= 10 && x <= 12) sum += 10;
    else sum += x + 1;
    if (xx === 0) {
        if (sum < 11) sum += 11;
        else sum += 1;
    } else if (xx >= 10 && xx <= 12) sum += 10;
    else sum += xx + 1;

    const img1 = document.createElement("img");
    const img2 = document.createElement("img");
    
    img1.src = `../assets/${card1}_${type1}.png`;
    img2.src = `../assets/${card2}_${type2}.png`;
    
    document.querySelector(".cards").appendChild(img1);
    document.querySelector(".cards").appendChild(img2);
     
    getStatus();
}


function newGameBtn() {
    let x = randGen13(), y = randGenTyp();
    let card1 = cards[x], type1 = types[y];
    
    if (x === 0) {
        sum += 1;
    } else if (x >= 10 && x <= 12) sum += 10;
    else sum += x + 1;

    const img1 = document.createElement("img");
    
    img1.src = `../assets/${card1}_${type1}.png`;
    
    document.querySelector(".cards").appendChild(img1);

    let message = "", messageEl = document.querySelector(".status");
    let sumTxt = document.querySelector(".sumt");
    
    if (sum === 21) {
        message = "You've got Blackjack!";
    } else {
        message = "Better luck next time!";
    }

    if (message === "You've got Blackjack!") {
        messageEl.innerHTML = `<p class = "winning"><i>${message}</i></p>`;
    } else messageEl.innerHTML = `<p><i>${message}</i></p>`;

    messageEl.innerHTML += reload;
    document.querySelector(".noStyles").addEventListener('click', hello);

    function hello() {
        location.reload('true');
    }
    
    sumTxt.textContent = `Sum: ${sum}`;
}


document.querySelector('#btn1').addEventListener('click', gameBtn, {once: true});
document.querySelector('#btn2').addEventListener('click', newGameBtn, {once: true});
