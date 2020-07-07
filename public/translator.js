import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

let textArea = document.getElementById("text-input");
let localeSelect = document.getElementById("locale-select");
let translatedSentence = document.getElementById("translated-sentence");
let errorMessage = document.getElementById("error-msg");

       
const ClearText = () => {
  textArea.value = ""
  translatedSentence.innerText = ""
  errorMessage.innerText = "";
}





const Translate = (text) => {
  console.log(text);///////////
  if(!text){ return errorMessage.innerText = "Error: No text to translate.";
  } else { errorMessage.innerText = ""; }
  
  //var content = document.createTextNode("<YOUR_CONTENT>");
  //translatedSentence.appendChild(content);
  
  text.split(" ").map((word)=>{
    console.log(word);/////////////////////////
    translatedSentence.appendChild();
    let highlightedText = document.createElement("span").setAttribute("class", "highlight");
    highlightedText.innerText = word
    translatedSentence.appendChild();
    
    //translatedSentence.insertAdjacentText("afterend", "My inserted text");
    //translatedSentence.insertAdjacentHTML("afterend", `<span class="highlight">${word}</span>`);
    
  });
  
  //translatedSentence.innerText = translatedText.join(" ");
}

document.addEventListener("DOMContentLoaded", event => {
  let translateButton = document.getElementById("translate-btn");
  let clearButton = document.getElementById("clear-btn");
  
  clearButton.addEventListener("click", ClearText);
  translateButton.addEventListener("click", () => Translate(textArea.value));
});

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {

  }
} catch (e) {}
