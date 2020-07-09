import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

// Handle British equivalents for spelling
let americanToBritishDict = { ...americanToBritishSpelling };

const reverseDictionary = obj => {
  return Object.keys(obj).reduce((acc, curr) => {
    acc[obj[curr]] = curr;
    return acc;
  }, {});
}

// Get British versions of spelling and titles
let britishToAmericanDict = reverseDictionary({ ...americanToBritishDict });
let britishToAmericanTitles = reverseDictionary({...americanToBritishTitles });

// Append American only phrases and titles
americanToBritishDict = { ...americanToBritishDict, ...americanOnly }

// Append British only phrases
britishToAmericanDict = { ...britishToAmericanDict, ...britishOnly }

///////////////
let textArea = document.getElementById("text-input");
let translatedSentence = document.getElementById("translated-sentence");
let errorMessage = document.getElementById("error-msg");

       
const ClearText = () => {
  textArea.value = ""
  translatedSentence.innerText = ""
  errorMessage.innerText = "";
}


const highlighText = text => `<span class="highlight">${text}</span>`;
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);


const Translate = (text, toLocale) => {
  
  let needTranslation = false;
  const Dictionary = toLocale === 'toBritish' ? americanToBritishDict : britishToAmericanDict;
  console.log("text: " + text);///////////
  console.log("toLocale: " + toLocale);///////////
  
  if(!text){ return errorMessage.innerText = "Error: No text to translate.";
  } else { errorMessage.innerText = ""; }
  
  // test for 2 or more words terms.
  let compTerm = Object.getOwnPropertyNames(Dictionary)
    .filter(item => item.includes(" "))
    .sort( (a, b) => b.length - a.length );
  
  for (let term in compTerm){
    let regEx = new RegExp(compTerm[term], "i");
    
    if (text.toLowerCase().includes(compTerm[term])) {
      needTranslation = true
      text = text.replace(regEx, ()=>{
        return Dictionary[compTerm[term]];
      });
    }
  }
  console.log("text: "+text);///////////
  
  
  
}


document.addEventListener("DOMContentLoaded", event => {
  let translateButton = document.getElementById("translate-btn");
  let clearButton = document.getElementById("clear-btn");
  
  clearButton.addEventListener("click", ClearText);
  translateButton.addEventListener("click", () => {
    let toLocale = document.getElementById('locale-select').value === 'american-to-british' ? 'toBritish' : 'toAmerican';
    Translate(textArea.value, toLocale)
    
  });
});

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    ClearText,
    Translate
  }
} catch (e) {}
