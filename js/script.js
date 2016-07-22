var previousQuoteNumbers = []; //Array that stores randomly generated quote numbers
var quoteObj = {}; //Object to store the random quote
var quote = '';
var source = '';
var citation = '';
var year;
var quoteNumber; //Variable that holds the randomly generated index number to select the quote
var quoteHTML;
var rgbColour;

// Generates a random number between 0 and 255 for RGB
function randomNumber() {
    "use strict";
    return Math.floor(Math.random() * 255);
}

// Generates a random RGB colour using the randomNumber function
function randomColour() {
    "use strict";
    rgbColour = 'rgb(' + randomNumber() + ',' + randomNumber() + ',' + randomNumber() + ')';
    document.body.style.backgroundColor = rgbColour;
}

//Starts a 30 second timeout
function startTimer(func) {
    "use strict";
    window.setTimeout(func, 30000);
}

//Generates a random quote from the quotes array that is piped into the function
//Checks if the quotes array length is not equal to the previousQuoteNumbers array and generates a random number
function getRandomQuote(quotearray) {
    "use strict";
    if (quotearray.length !== previousQuoteNumbers.length) {
        quoteNumber = Math.floor(Math.random() * quotearray.length);
        //Checks to make sure the randomly generated number hasn't been generated previously
        while (previousQuoteNumbers.indexOf(quoteNumber) > -1) {
            quoteNumber = Math.floor(Math.random() * quotearray.length);
        }
        previousQuoteNumbers.push(quoteNumber);
        return quotearray[quoteNumber];
    } else {
        previousQuoteNumbers = []; //Resets the array to empty if both arrays have matching lengths
        quoteNumber = Math.floor(Math.random() * quotearray.length);
        previousQuoteNumbers.push(quoteNumber);
        return quotearray[quoteNumber];
    }
}
//Grabs a random quote and compiles to be ready to print to the quote-box element
function printQuote() {
    "use strict";
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
    if (quoteObj.tags !== undefined) {
        quoteHTML += '<p> <span class="tags">Categories: ' + quoteObj.tags.join(', ') + '</span>' + '</p>';
    }
    document.getElementById('quote-box').innerHTML = quoteHTML;
    randomColour(); // Sets the background to a randomly generated colour
    startTimer(printQuote); //Calls the 30 second timer and passes the printQuote function to it


}

// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
