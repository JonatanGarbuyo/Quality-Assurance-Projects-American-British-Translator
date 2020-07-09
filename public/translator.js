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
  console.log("text: " + text);///////////
  console.log("toLocale: " + toLocale);///////////
  
  if(!text){ return errorMessage.innerText = "Error: No text to translate.";
  } else { errorMessage.innerText = ""; }
  
  let returnText = text.split(" ").map((word)=>{
    console.log("word to test:" + word);/////////////////////////
    
    //test if word is time //
    //HH:MM 12-hour format, optional leading 0
    let regexTime = /^(0?[1-9]|1[0-2])([\.\:])([0-5][0-9])$/;
    if (regexTime.test(word)){
      return word.replace(regexTime, ($1, $2, $3, $4) => {
        console.log("time - $1: " + $1);/////////////////
        console.log("hour - $2: " + $2);//////////////////////
        console.log("separator $3: " + $3);////////////////
        console.log("min - $4: " + $4);////////////////////
        if (toLocale === 'toBritish' && $3 === ":"){ return highlighText(`${$2}.${$4}`); }
        else if (toLocale === 'toAmerican' && $3 === "."){ return highlighText(`${$2}:${$4}`); }
        else { return $1; }
      });
    }
    
    
    let testWord = word.toLowerCase();
    let testTerm = testWord.split(/([\s,.;:?])/);
    console.log("testWord: "+testWord);///////////////
    console.log("testTerm[0]: "+testTerm[0]);///////////////
    console.log("testTerm[1]: "+testTerm[1]);///////////////
    
    if (toLocale === 'toBritish'){
      // is title? 
      if (americanToBritishTitles[testWord]) {
        console.log("americanToBritishTitles[testWord]: "+americanToBritishTitles[testWord]);///////////////
        needTranslation = true;
        return highlighText(capitalize(americanToBritishTitles[testWord]));
      }
      //other terms
      if (americanToBritishDict[testTerm[0]]){
        console.log("americanToBritishDict[testTerm[0]: "+americanToBritishDict[testTerm[0]]);///////////////
        needTranslation = true;
        console.log("capitalize: " +capitalize(americanToBritishDict[testTerm[0]]));
        console.log(word <= "Z");
        return word[0] >= "A" && word <= "Z"? 
          // return the capitalized and highlighted text plus sign if there is any.
          highlighText(capitalize(americanToBritishDict[testTerm[0]])) + (testTerm[1]?testTerm[1]:"")
          : highlighText(americanToBritishDict[testTerm[0]]) + (testTerm[1]?testTerm[1]:"");
      }
    } 
    else if (toLocale === 'toAmerican'){ 
      // is title? 
      if (britishToAmericanTitles[testWord]) {
        needTranslation = true;
        return highlighText(capitalize(britishToAmericanTitles[testWord]));
      }
      //other terms
      if (britishToAmericanDict[testTerm[0]]){
        needTranslation = true;
        return word[0] >= "A" && word <= "Z"? 
          // return the capitalized and highlighted text plus sign if there is any.
          highlighText(capitalize(britishToAmericanDict[testTerm[0]])) + testTerm[1]?testTerm[1]:""
          : highlighText(britishToAmericanDict[testTerm[0]]) + testTerm[1]?testTerm[1]:"";
      }
    }
    
    return word;
  });
  
  return needTranslation?
    translatedSentence.innerHTML = returnText.join(" ")
  : translatedSentence.innerHTML = "Everything looks good to me!";
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
