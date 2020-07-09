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


const Translate = (text, toLocale) => {
  console.log(text);///////////
  console.log("toLocale: " +);///////////
  if(!text){ return errorMessage.innerText = "Error: No text to translate.";
  } else { errorMessage.innerText = ""; }
  
  let returnText = [];
  //var content = document.createTextNode("<YOUR_CONTENT>");
  //translatedSentence.appendChild(content);
  
  text.split(" ").map((word)=>{
    console.log(word);/////////////////////////
    
    // is time?
    
    // is title?
    
    //other words
    
    let highlightedText = document.createElement("span").setAttribute("class", "highlight");
    returnText.push(`<span class="highlight">${word}</span>`);
    
    //translatedSentence.insertAdjacentText("afterend", "My inserted text");
    //translatedSentence.insertAdjacentHTML("afterend", `<span class="highlight">${word}</span>`);
    
  });
  
  translatedSentence.innerHTML = returnText.join(" ");
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
