// selectors
let calculatorScreen = document.querySelector("#calculator-screen");
let numBtn = document.querySelectorAll(".numbers");
let operatorBtn = document.querySelectorAll(".operators");
let result = document.querySelector("#result");
let reset = document.querySelector(".reset");
let delBtn = document.querySelector("#del");
let h1 = document.querySelector("h1");

myCalculator();

function myCalculator() {
    insertNumbers();
    insertOperators();
    calcReset();
    del();
    calculations();
}

function insertNumbers() { // types number on click
    for(let button of numBtn) {
        button.addEventListener("click", (e) => {
            let total = calculatorScreen.textContent;
            let input = e.target.textContent;
           
            if(total.length === 1 && total === "0") calculatorScreen.textContent = ""; // replaces initial 0 with clicked number
            if(total === "0" && input === "0") input = "0"; // not more then one 0 at the beginning
            if(total === "Cannot divide by zero!") calculatorScreen.textContent = ""; // prevents further inputs      

            if(total.length > 24) calculatorScreen.style.padding = "30px 30px 70px 40px";
            if(total.length > 51) {
                h1.textContent = "Too Many Digits!";
                h1.style.color = "lightseagreen";
                input = "";
            }

            else calculatorScreen.textContent += input;
        });
    }
}

function insertOperators() { // types operator on click
    for(let button of operatorBtn) {
        button.addEventListener("click", function(e) {
            let total = calculatorScreen.textContent;
            let last = total[total.length -1];
            let input = e.target.textContent;
            let contains = e.target.classList.contains("operators"); //checks if the clicked operator contains the class .operators
            
            if(total === "Cannot divide by zero!") input = ""; // prevents further inputs
            if(total.length > 51) input = ""; // stops inserting operator values when element limit is reached
            
            //ensures operator values are not replacing each other
            if(total !== "" && last === "÷" && contains) input = "";
            if(total !== "" && last === "x" && contains) input = "";
            if(total !== "" && last === "-" && contains) input = "";
            if(total !== "" && last === "+" && contains) input = "";
            if(total !== "" && last === "." && contains) input = "";
            
            if(total !== "" && !total[total.length -1].includes(input)) { // doesn't allow two operators in a row
                calculatorScreen.textContent += input;
            }
        });
    }
}

function calcReset() { // resets the display
    reset.addEventListener("click", () => {
        calculatorScreen.textContent = "0";
        h1.textContent = "My Calculator";
        h1.style.color = "black";
        calculatorScreen.style.padding = "40px";
    });
}

// deletes last element
function del() {
    delBtn.addEventListener("click", () => {
        let total = calculatorScreen.textContent;
        calculatorScreen.textContent = total.substring(0, total.length -1);
    });
}
function calculations() {
    result.addEventListener("click", () => {
        let total = calculatorScreen.textContent;
        let last = total[total.length -1];

        if(total.includes("÷")) total = total.replace(/÷/g, "/");
        if(total.includes("x")) total = total.replace(/x/g, "*");
        if(last === "0" && total[total.length -2] === "/") calculatorScreen.textContent = ("Cannot divide by zero!");
        else calculatorScreen.textContent = eval(total);
    });
}
