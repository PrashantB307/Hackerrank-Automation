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
.then(function (linksArr) {
    console.log("Links to all ques. received");
    //console.log(linksArr);
    //Questions solve krna h

    //Links to the quiestions to be solved , idx of the linksArr
    let quesWillSolvePromise = questionSolver(linksArr[0], 0);
    for(let i = 1; i < linksArr.length; i++){
        quesWillSolvePromise = quesWillSolvePromise.then(function () {
            return questionSolver(linksArr[i], i);
        })
    }
    return quesWillSolvePromise;
})
.then(function () {
    console.log("Question is Solved");
})
.catch(function (err) {
    console.log(err);
});

function waitAndClick(algoBtn) {
    let waitClickPromise = new Promise(function (resolve, reject) {
        let waiTfoPromise = cTab.waitForSelector(algoBtn);
        waiTfoPromise.then(function () {
            console.log("Algo btn is found");
            let clickPromise = cTab.click(algoBtn);
            return clickPromise;
        })
        .then(function () {
            console.log("Algo btn is clicked");
            resolve();
            
        })
        .catch(function (err) {
            reject(err);
        })
    }); 
    return waitClickPromise;
}

function questionSolver(url, idx) {
    return new Promise(function (resolve, reject) {
    let fullLink = `https://www.hackerrank.com${url}`;
    let goToQuesPagePromise = cTab.goto(fullLink);
    goToQuesPagePromise
    .then(function () {
        console.log("Question Opened");
        // tick the custom input box mark
        let waitForChekBoxandClickPromise = waitAndClick(".checkbox-input");
        return waitForChekBoxandClickPromise;
        })
        .then(function () {
            //select the box where code will be typed
            let waitForTextBoxPromise = cTab.waitForSelector(".custominput");
            return waitForTextBoxPromise;
        })
        
    });
}

