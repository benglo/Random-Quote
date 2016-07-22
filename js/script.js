var uniqueQuote = []; //Ensures a new quote is always displayed
var quoteObj = {}; //Object to store the random quote
var quote = '';
var source = '';
var citation = '';
var year;
var quoteNumber; //Randomly generated index number to select the quote
var quoteHTML;
var rgbColour;

// Generates a random number between 0 and 255
function randomNumber() {
    return Math.floor(Math.random() * 255);
}

// Generates a random RGB colour using the randomNumber function
function randomColour() {
    rgbColour = 'rgb(' + randomNumber() + ',' + randomNumber() + ',' + randomNumber() + ')';
    document.body.style.backgroundColor = rgbColour;
}

function startTimer(func) {
    window.setTimeout(func, 30000);
}

//Generates a random quote from the quotes array that is piped into the function
function getRandomQuote(quotearray) {
    if (quotearray.length !== uniqueQuote.length) {
        quoteNumber = Math.floor(Math.random() * quotearray.length);
        while (uniqueQuote.indexOf(quoteNumber) > -1) {
            quoteNumber = Math.floor(Math.random() * quotearray.length);
        }
        uniqueQuote.push(quoteNumber);
        console.log(uniqueQuote);
        return quotearray[quoteNumber];
    } else {
        uniqueQuote = [];
        quoteNumber = Math.floor(Math.random() * quotearray.length);
        uniqueQuote.push(quoteNumber);
        return quotearray[quoteNumber];
    }
}

//Grabs a random quote and compiles to be ready to print to the quote-box element
function printQuote() {
    quoteObj = getRandomQuote(quotes);
    quote = quoteObj.quote;
    quoteHTML = '<p class="quote">' + quote + '</p>';
    source = quoteObj.source;
    quoteHTML += '<p class="source">' + source;
    // Checks if the optional citation property exists
    if (quoteObj.citation !== undefined) {
        citation = quoteObj.citation;
        quoteHTML += '<span class="citation">' + citation + '</span>';
    }
    // Check if the year property exists
    if (quoteObj.year !== undefined) {
        year = quoteObj.year;
        quoteHTML += '<span class="year">' + year + '</span>' + '</p>';
    }
    document.getElementById('quote-box').innerHTML = quoteHTML;
    randomColour(); // Sets the background to a randomly generated colour
    startTimer(printQuote);


}

// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
