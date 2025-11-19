let input = document.getElementById("inputNumber");
let fromBase = document.getElementById("fromBase");
let toBase = document.getElementById("toBase");
let output = document.getElementById("output");
let swapBtn = document.getElementById("swapBtn");

// Every time user types or changes dropdown → auto convert
input.addEventListener("input", autoConvert);
fromBase.addEventListener("change", autoConvert);
toBase.addEventListener("change", autoConvert);

// Swap bases when clicking ↔
swapBtn.addEventListener("click", () => {
    let temp = fromBase.value;
    fromBase.value = toBase.value;
    toBase.value = temp;
    autoConvert();
});

function autoConvert() {
    let num = input.value;

    // If empty input
    if (num.trim() === "") {
        output.innerText = "";
        return;
    }

    let base1 = parseInt(fromBase.value);
    let base2 = parseInt(toBase.value);

    // Convert input → decimal (supports float & negative)
    let decimalValue = parseFloat(parseInt(num, base1)) + getFraction(num, base1);

    // Convert decimal → target base
    let converted = convertBase(decimalValue, base2);

    output.innerText = converted.toUpperCase();
}

// Extract fractional part
function getFraction(num, base) {
    if (!num.includes(".")) return 0;
    let parts = num.split(".");
    let frac = parts[1];
    let value = 0;
    for (let i = 0; i < frac.length; i++) {
        value += parseInt(frac[i], base) / Math.pow(base, i + 1);
    }
    return value;
}

// Decimal → target base
function convertBase(value, base) {
    let intPart = Math.floor(Math.abs(value));
    let fracPart = Math.abs(value) - intPart;

    let result = intPart.toString(base);

    if (fracPart === 0)
        return (value < 0 ? "-" : "") + result;

    result += ".";

    for (let i = 0; i < 10; i++) {
        fracPart *= base;
        let digit = Math.floor(fracPart);
        result += digit.toString(base);
        fracPart -= digit;
        if (fracPart === 0) break;
    }

    return (value < 0 ? "-" : "") + result;
}
