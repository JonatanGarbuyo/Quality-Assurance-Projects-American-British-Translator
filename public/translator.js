import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

const textArea = document.getElementById("text-input");
const localeSelect = document.getElementById("locale-select");
const translateButton = document.getElementById("translate-btn");
const clearButton = document.getElementById("clear-btn");
const translatedSentence = document.getElementById("translated-sentence");
const errorMessage = document.getElementById("error-msg");
       
const ClearText = () => {
  textArea.value = ""
  translatedSentence.value = ""
}

const Translate = () => {
  translatedSentence.value = textArea.value;
}





document.addEventListener("DOMContentLoaded", event => {
  
  clearButton.addEventListener("click", ClearText);
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
