const flowerbtn = document.getElementById("flwbtn");
const nOflower = document.getElementById("nOf");
const flowerPs = document.getElementById("fPs");
const oneUp = document.getElementById("upgbtn");
const tenUp = document.getElementById("tenbtn");
const hunUp = document.getElementById("hunbtn");
const thUp = document.getElementById("thbtn");
const tenthUp = document.getElementById("tenthbtn");
const container = document.getElementById("flowerContainer");
const alertU = document.getElementById("alertU");
const flowerSound = document.getElementById("flowerSound");
const upgradeSound = document.getElementById("upgradeSound");
const restbtn = document.getElementById("rest");
const tenCounterBox = document.getElementById("tenCounter");
const hunCounterBox = document.getElementById("huncounter"); 
const thCounterBox = document.getElementById("thcounter"); 
const tenthCounterBox = document.getElementById("tenthcounter"); 
function vibrateButton() {
    flowerbtn.classList.add("vibrate"); 
    setTimeout(function () {
        flowerbtn.classList.remove("vibrate"); 
    }, 300);
}


const upgradeButtons = [tenUp, hunUp, thUp, tenthUp];
function disableUpgradeButtons() {
    for (let i = 0; i < upgradeButtons.length; i++) {
        upgradeButtons[i].disabled = true;
    }
}

disableUpgradeButtons();

let flowerObj = {
    flowNum: 0,
    incperS: 0,
    countUpTen: 0,
    counterUpHun: 0,
    counterUpTh: 0,
    counterUpTenth: 0,
};

const storageFlower = JSON.parse(localStorage.getItem("flowerObj"));
console.log(storageFlower);

if (storageFlower !== null) {
    flowerObj.flowNum = storageFlower.flowNum;
    flowerObj.incperS = storageFlower.incperS;
    flowerObj.countUpTen = storageFlower.countUpTen;
    flowerObj.counterUpHun = storageFlower.counterUpHun;
    flowerObj.counterUpTh = storageFlower.counterUpTh;
    flowerObj.counterUpTenth = storageFlower.counterUpTenth;
}




function playSound(soundElement) {
    soundElement.currentTime = 0; 
    soundElement.play();
  }
function pickFlowers() {
    playSound(flowerSound);
    updatePage();
    updateStorage();
    addFlower();
    
    createSmallFlowers(); 
}
function addFlower() {
    var flowerImage = document.createElement("img");
    flowerImage.src = "./img/th.jpg";
    flowerImage.width = 10;
    flowerImage.height = 10;
    flowerImage.alt = "flowers";
    container.appendChild(flowerImage);
    flowerObj.flowNum++;
    updatePage();
    updateStorage();
}
function removeUp(num){
    const flowerImages = container.querySelectorAll("img");
    for (let i = 0; i < num; i++) {
        if (flowerImages[i]) {
            container.removeChild(flowerImages[i]);
        }
    }
}


function upgradeFlower(num) {
    if (flowerObj.flowNum >= num) {
        flowerObj.incperS += num;
        flowerObj.flowNum -= num;
        updateStorage();
        removeUp(num);
        addFlower();
        updatePage();
        alertU.textContent = "Nice Pick!"; 

 
    } else {
        alertU.style.display="block";
        alertU.textContent = "Try Later!"; 
    }
   
}
function resetGame() {
    localStorage.removeItem("flowerObj");
    location.reload();
}
if (storageFlower !== null) {
    flowerObj.flowNum = storageFlower.flowNum;
    flowerObj.incperS = storageFlower.incperS;
    flowerObj.countUpTen=storageFlower.countUpTen;
    flowerObj.counterUpHun=storageFlower.counterUpHun;
    flowerObj.counterUpTh=storageFlower.counterUpTh;
    flowerObj.counterUpTenth=storageFlower.counterUpTenth;
    
}
function createSmallFlowers() {
    const numSmallFlowers = 8;
    for (let i = 0; i < numSmallFlowers; i++) {
        const smallFlower = document.createElement("img");
        smallFlower.src = "./img/th.jpg";
        smallFlower.width = 30; 
        smallFlower.height = 30; 
        smallFlower.alt = "flowers";
        smallFlower.classList.add("smallFlower");
        const randomX = Math.random() * 100 - 50;
        const randomY = Math.random() * 100 - 50;
        smallFlower.style.position = "absolute";
        smallFlower.style.left = `${10 + randomX}%`;
        smallFlower.style.top = `${10 + randomY}%`;

        container.appendChild(smallFlower); 

        setTimeout(() => {
            smallFlower.style.transition = "transform 0.5s linear";
            smallFlower.style.transform = `translate(${randomX}px, ${randomY}px)`;
            smallFlower.style.opacity = 1; 
        }, 10);

        setTimeout(() => {
            container.removeChild(smallFlower);
        }, 500);
    }
}


flowerbtn.addEventListener("click", function () {
    pickFlowers(); // Call existing function
    vibrateButton(); // Call the function for vibration effect
});
oneUp.addEventListener("click", oneUpgrade);
tenUp.addEventListener("click", tenUpgrade);
hunUp.addEventListener("click", hunUpgrade);
thUp.addEventListener("click", thUpgrade);
tenthUp.addEventListener("click", tenthUpgrade);
restbtn.addEventListener("click", resetGame);

function updatePage() {
    flowerPs.textContent = flowerObj.incperS;
    nOflower.textContent = flowerObj.flowNum;
    if(flowerObj.flowNum>=10){
        tenUp.disabled = false;
    }
    if(flowerObj.countUpTen>=10){
        hunUp.disabled = false;
    }
    if(flowerObj.counterUpHun>=100){
        hunUp.disabled = false;
    }
    if(flowerObj.counterUpTh>=1000){
        thUp.disabled = false;
    }
    if(flowerObj.counterUpTh>=10000){
        tenthUp.disabled = false;
    }
  
   
 
}

function updateStorage() {
    localStorage.setItem("flowerObj", JSON.stringify(flowerObj));
}

function oneUpgrade() {
    upgradeFlower(1);
  
    playSound(upgradeSound);
}


function tenUpgrade() {
 if(flowerObj.flowNum>=10){
    flowerObj.countUpTen++;
    tenCounterBox.textContent = flowerObj.countUpTen;

    upgradeFlower(10);
    playSound(upgradeSound);
}
}

function hunUpgrade() {
    if(flowerObj.flowNum >= 100){
    flowerObj.counterUpHun++;
    hunCounterBox.textContent = flowerObj.counterUpHun;
    upgradeFlower(100);
    playSound(upgradeSound);
}
}

function thUpgrade() {
    if(flowerObj.flowNum >=1000){
    flowerObj.counterUpTh++;
    thCounterBox.textContent = flowerObj.counterUpTh;
    upgradeFlower(1000);
    playSound(upgradeSound);
}
}

function tenthUpgrade() {
    if(flowerObj.flowNum>=10000){
    flowerObj.counterUpTenth++;
    tenthCounterBox.textContent = flowerObj.counterUpTenth;
    upgradeFlower(10000);
    playSound(upgradeSound);
}}
function addInc(){
    for(i=0;i<=flowerObj.incperS;i++){
        addFlower();
    
}
}
function startIncrementPerSecond() {
    setInterval(function () {
        addInc();
        updatePage();
        updateStorage();
    }, 1000);
}

oneUp.addEventListener("click", function () {
    
    startIncrementPerSecond();
});