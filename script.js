let ar=[];
let speed=100;
let isRunning=false;

document.getElementById("speedSlider").addEventListener("input", function () {
    speed=600-this.value; 
});


function toggleButtons(disable) {
    document.querySelectorAll("button").forEach(btn => {
        btn.disabled=disable;
    });
}


function generateArray() {
    if (isRunning) return;

    ar=[];
    const container=document.getElementById("array");
    container.innerHTML="";

    for (let i=0;i<25;i++) {
        let value=Math.floor(Math.random()*200)+20;
        ar.push(value);

        let bar=document.createElement("div");
        bar.classList.add("bar");
        bar.style.height=value+"px";
        container.appendChild(bar);
    }
}


function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve,ms));
}


function resetBars() {
    let bars=document.getElementsByClassName("bar");
    for (let bar of bars) {
        bar.style.background="blue";
    }
}
async function linearSearch() {
    if (isRunning) return;
    isRunning=true;
    toggleButtons(true);
    resetBars();
    let bars=document.getElementsByClassName("bar");
    let target=Number(document.getElementById("searchValue").value);

    for (let i=0;i<bars.length;i++) {
        bars[i].style.background="orange";
        await sleep(speed);

        if (ar[i]===target) {
            bars[i].style.background="green";
            alert("Element found at position "+(i + 1));
            isRunning=false;
            toggleButtons(false);
            return;
        }

        bars[i].style.background="blue";
    }

    alert("Element not found");
    isRunning = false;
    toggleButtons(false);
}
async function binarySearch() {
    if (isRunning) return;
    isRunning=true;
    toggleButtons(true);
    ar.sort((a, b) => a - b);
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.height = ar[i] + "px";
        bars[i].style.background = "blue";
    }
    let target = Number(document.getElementById("searchValue").value);
    let low=0,high=ar.length-1;
    while (low<=high) {
        let mid=Math.floor((low+high)/2);


        for (let i=low;i<=high;i++) {
            bars[i].style.background="#555";
        }
        bars[mid].style.background="red";
        await sleep(speed);
        if (ar[mid]===target) {
            bars[mid].style.background="green";
            alert("elem found at position "+(mid+1));
            isRunning=false;
            toggleButtons(false);
            return;
        } 
        else if (ar[mid]<target) {
            low=mid+1;
        } 
        else {
            high=mid-1;
        }

        resetBars();
    }

    alert("elem not found");
    isRunning=false;
    toggleButtons(false);
}
