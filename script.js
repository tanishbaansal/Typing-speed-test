const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const texttest = document.querySelector('.texttest');
const errortext = document.querySelector('.error');
const speedtext = document.querySelector('.speed');
const accuracytest = document.querySelector('.accuracy');
const textArray = ['Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
'There are many variations of passages of Lorem Ipsum available.',
'Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.',
'Simplest text there should be.'];

var timer = [0,0,0,0];
var interval;
var timerRunning = false;
var avglength = 0,error=0;
var wpm=0,npm=0,accuracy=0;

//Setting maximum and minimum value for selecting random string from textarray
const max=4,min=0;

//Function to change the text of the test
function changetext(){
    let random=Math.floor(Math.random()*(max-min+1)+min);
    //showing random string on the main page
    texttest.innerHTML=textArray[random];
    avglength = (textArray[random].length)/(textArray[random].split(' ').length);
}
changetext();

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck(event) {
    let textEntered = testArea.value;
    let originTextMatch = originText.innerHTML.substring(0,textEntered.length);

    if (textEntered == originText.innerHTML) {
        clearInterval(interval);
        testWrapper.style.borderColor = "green";
        wpm=((originText.innerHTML.length/avglength)/((timer[3]/100)/60));
        npm=(((originText.innerHTML.length-error)/avglength)/((timer[3]/100)/60));
        accuracy=(npm/wpm)*100;
        errortext.innerHTML='Errors : '+error;
        speedtext.innerHTML='Speed : '+ Math.floor(wpm)+' Words Per Minute';
        accuracytest.innerHTML = 'Accuracy : '+Math.floor(accuracy)+'%';

    } 
    else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#1aa1e1";
        } 
        else {
            testWrapper.style.borderColor = "orange";
            if(event.keyCode != 8 && event.keyCode != 46 && !event.ctrlKey)
                {
                    error++;
                }
        }
    }

}

// Start the timer:
function start() {
    let textEnterdLength = testArea.value.length;
    if (textEnterdLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    error=0;
    changetext();
    errortext.innerHTML='';
    accuracytest.innerHTML='';
    speedtext.innerHTML='';
}

// Event listeners for keyboard input and the reset
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", function(event){spellCheck(event);}, false);
resetButton.addEventListener("click", reset, false);
