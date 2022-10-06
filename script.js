const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];


function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//Show New Quote
function newQuote() {
    loading();
    //pick a random quote from all quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //Check if author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    //Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //Set Quote and hide loader
    complete();
    quoteText.textContent = quote.text;
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    // const apiUrl = 'https://type.fit/api/quotes';
    // const apiUrl = 'https://zenquotes.io/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        //console.log("All Quotes", apiQuotes);
        newQuote();
    } catch (error) {
        console.log(error);
    }
}


function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textcontent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load 
getQuotes();