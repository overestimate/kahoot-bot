const Kahoot = require('kahoot.js-updated'), //init
config = require(process.cwd()+"\\config.json"); //config :)
let i = 0;
let botNumber = 0;
if (process.platform === "win32") {
    var rl = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    rl.on("SIGINT", function () {
      process.emit("SIGINT");
    });
  }
function flood(pin, name, numBots, joinSpeed) {
    i++
    if (i < numBots) {
        setTimeout(() => {joinKahoot(pin, name)}, joinSpeed);
        setTimeout(() => {flood(config.gamePin, config.botName, config.botAmount+1, config.joinDelay)}, joinSpeed);
    } else {
        i--
    }
}
function joinKahoot(pin, name) {
    let bot = new Kahoot;
    bot.setMaxListeners(Number.POSITIVE_INFINITY)
    bot.on("joined", () => {
        botNumber++
        console.log(`${bot.name} joined successfully.`);
        if(bot.name == name+i) {
            console.log('All bots have joined!')
        }
    });
    bot.join(pin, name+i).catch(()=>{console.log(`${bot.name} failed to join.`)});
    bot.on("questionStart", question => {
            console.log(`${question.client.name} answered question ${question.index+1} out of ${question.quiz.questionCount}. It responded with a random answer.`);
            question.answer(Math.floor(Math.random()*question.quiz.answerCounts[question.index]));
    });
    bot.on("questionEnd", info => {
        console.log((info.correct) ? `${info.client.name} got it right! :)`:`${info.client.name} got it wrong. :(`)
    })
    bot.on("finish", info => {
        bot.leave();
        console.log("The kahoot has ended. "+bot.name+" died.");
        i--
        if(i == 0) {
            process.exit()
        }
    });
    process.on("SIGINT", function () {
        bot.leave()
        console.log("User pressed CTRL+C. "+name+i+" died.");
        i--
        if(i == 0) {
            process.exit()
        }
    });
}
flood(config.gamePin, config.botName, config.botAmount+1, config.joinDelay)