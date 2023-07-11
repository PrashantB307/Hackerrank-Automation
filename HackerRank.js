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
.then(function () {
    console.log("Email is typed");
    let passwordwillTypePromise = cTab.type("input[type = 'password']", password);
    return passwordwillTypePromise;
})
.then(function () {
    console.log("Password is typed");
    let willLoggedPromise = cTab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
        );
        return willLoggedPromise; 
})
.then(function () {
    console.log("Logged in to Hackerrank successfully");
    //--waitAndClick :=> It will wait for the entire webpage to load 
                        // and then click on the node.
    let algoOpenPromise = waitAndClick("div[data-automation ='algorithms']");
    return algoOpenPromise;
})
.then(function () {
    console.log ("Algorithm page is Opened");
    let allQuesPromise = cTab.waitForSelector("a[data-analytics='ChallengeListChallengeName']");
    return allQuesPromise;
})
.then(function () {
    function getAllQuesLink() {
        let allElemArr = document.querySelectorAll("a[data-analytics='ChallengeListChallengeName']");
        let linksArr = [];
        for(let i = 0; i < allElemArr.length; i++){
            linksArr.push(allElemArr[i].getAttribute("href"));
        }
        return linksArr;
    }

    let linksArrPromise = cTab.evaluate(getAllQuesLink);
    return linksArrPromise;
})
