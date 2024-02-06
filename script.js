let start = document.querySelector(".start");
let timeleft = document.querySelector(".timeleft")
let stop = document.querySelector(".stop");
let columns = document.querySelectorAll(".column");
let score = document.querySelector(".score");

let gameStart = false;
let startCLick = false;
let moleClick = false;
let i = 0;
let timeoutId;

const selectRandomColumn = () => {
   const currentColumn =  columns[Math.floor(Math.random() * 8)];
   const mole = document.createElement("img");
   mole.src = "./img/mole.png";
   mole.classList.add("mole");
   mole.style.bottom = "-200px";
   mole.addEventListener("click",()=>{
    if(moleClick === false){
        moleClick = true;
        score.innerHTML = parseInt(score.innerHTML) + 1;
        mole.style.bottom = "-200px";
    }
   })
   currentColumn.appendChild(mole);
   setTimeout(() => {
    mole.style.bottom = "0px";
    setTimeout(() => {
        mole.style.bottom = "-200px";
        setTimeout(() => {
            currentColumn.removeChild(mole);
            if (parseInt(timeleft.innerHTML)>0 && gameStart) {
                selectRandomColumn();
                moleClick =false;
            }
        }, 500);
    }, 1000);
   }, 1000)
}

const updateTimeout = ()=>{
    if (gameStart === true && i < 25) {
        timeoutId = setTimeout(() => {
            timeleft.innerHTML = parseInt(timeleft.innerHTML) - 1;
            i++;
            updateTimeout();
        }, 1000);
    }else{
        clearTimeout(timeoutId);
    }
}

start.addEventListener("click", () =>{
    let time = 0;
    gameStart = true;
    if (startCLick === false) {
        startCLick = true;
    selectRandomColumn()
    updateTimeout();
    }
})

stop.addEventListener("click",()=>{
    gameStart = false;
    timeleft.innerHTML = "26";
    score.innerHTML = 0;
    startCLick = false;
})  
