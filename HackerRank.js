// Use ===> node HackerRank.js  ( for run the code in terminal )
// Use ===>  npm install puppeteer  ( for install puppeteer )

const puppeteer = require("puppeteer");

let { email, password } = require('./secrets');
let { answer } = require("./codes"); 

let cTab;
let browserOpenPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
    //chrome://version/
   // executablePath:"C:\Program Files\Google\Chrome\Application\chrome.exe"
});

browserOpenPromise.then(function(browser) {
    console.log("Browser is open");
    console.log(browser);
    //An array of all open paes inside the Browser
    //returns an array with all the pages in all browser contexts
    let alltabsPromise = browser.pages();
    return alltabsPromise;
})
