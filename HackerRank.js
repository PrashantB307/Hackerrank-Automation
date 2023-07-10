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
.then(function (allTabsArr) {
    cTab = allTabsArr[0];
    console.log("new tab");
    //URL to navigate page to
    let visitLoginPage = cTab.goto("https://www.hackerrank.com/auth/login");
    return visitLoginPage;
})
.then(function (data) {
    //console.log(data);
    console.log("HackerRank Login Page opened");
    //selector (where to type), data(what to type)
    let emailwillTypePromise = cTab.type("input[name = 'username']", email, {delay:100});
    return emailwillTypePromise;
})
