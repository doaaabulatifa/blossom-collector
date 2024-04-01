
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
let flowerObj = {
    flowNum : 0,
    incperS : 0,
};
const storageFlower = JSON.parse(localStorage.getItem("flowerObj"));
console.log(storageFlower);

if (storageFlower !== null) {
  flowerObj.flowNum= storageFlower.flowNum;
  flowerObj.incperS= storageFlower.incperS;
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
        alertU.textContent = "Insufficient flowers to upgrade."; 
    }
   
}


flowerbtn.addEventListener("click", pickFlowers);
oneUp.addEventListener("click", oneUpgrade);
tenUp.addEventListener("click", tenUpgrade);
hunUp.addEventListener("click", hunUpgrade);
thUp.addEventListener("click", thUpgrade);
tenthUp.addEventListener("click", tenthUpgrade);
function updatePage() {
    flowerPs.textContent = flowerObj.incperS;
    nOflower.textContent = flowerObj.flowNum;
}

function updateStorage() {
    localStorage.setItem("flowerObj", JSON.stringify(flowerObj));
}

function oneUpgrade() {
    upgradeFlower(1);
    playSound(upgradeSound);
}

function tenUpgrade() {
    upgradeFlower(10);
    playSound(upgradeSound);
}

function hunUpgrade() {
    upgradeFlower(100);
    playSound(upgradeSound);
}

function thUpgrade() {
    upgradeFlower(1000);
    playSound(upgradeSound);
}

function tenthUpgrade() {
    upgradeFlower(10000);
    playSound(upgradeSound);
}
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