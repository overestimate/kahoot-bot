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
    if (config.nameBypass) {
        name = name.replace(/a/g, 'ᗩ').replace(/b/g, 'ᗷ').replace(/c/g, 'ᑕ').replace(/d/g, 'ᗪ').replace(/e/g, 'E').replace(/f/g, 'ᖴ').replace(/g/g, 'G').replace(/h/g, 'ᕼ').replace(/i/g, 'I').replace(/j/g, 'ᒍ').replace(/k/g, 'K').replace(/l/g, 'ᒪ').replace(/m/g, 'ᗰ').replace(/n/g, 'ᑎ').replace(/o/g, 'O').replace(/p/g, 'ᑭ').replace(/q/g, 'ᑫ').replace(/r/g, 'ᖇ').replace(/s/g, 'ᔕ').replace(/t/g, 'T').replace(/u/g, 'ᑌ').replace(/v/g, 'ᐯ').replace(/w/g, 'ᗯ').replace(/x/g, '᙭').replace(/y/g, 'Y').replace(/z/g, 'ᘔ').replace(/A/g, 'ᗩ').replace(/B/g, 'ᗷ').replace(/C/g, 'ᑕ').replace(/D/g, 'ᗪ').replace(/E/g, 'E').replace(/F/g, 'ᖴ').replace(/G/g, 'G').replace(/H/g, 'ᕼ').replace(/I/g, 'I').replace(/J/g, 'ᒍ').replace(/K/g, 'K').replace(/L/g, 'ᒪ').replace(/M/g, 'ᗰ').replace(/N/g, 'ᑎ').replace(/O/g, 'O').replace(/P/g, 'ᑭ').replace(/Q/g, 'ᑫ').replace(/R/g, 'ᖇ').replace(/S/g, 'ᔕ').replace(/T/g, 'T').replace(/U/g, 'ᑌ').replace(/V/g, 'ᐯ').replace(/W/g, 'ᗯ').replace(/X/g, '᙭').replace(/Y/g, 'Y').replace(/Z/g, 'ᘔ')
    }
    if (i < numBots) {
        setTimeout(() => {joinKahoot(pin, name)}, joinSpeed);
        setTimeout(() => {flood(config.gamePin, config.botName, config.botAmount+1, config.joinDelay)}, joinSpeed);
    } else {
        i--
    }
}
function nameBack(name) {
    return name.replace(/ᗩ/g, 'a').replace(/ᗷ/g, 'b').replace(/ᑕ/g, 'c').replace(/ᗪ/g, 'd').replace(/E/g, 'e').replace(/ᖴ/g, 'f').replace(/G/g, 'g').replace(/ᕼ/g, 'h').replace(/I/g, 'i').replace(/ᒍ/g, 'j').replace(/K/g, 'k').replace(/ᒪ/g, 'l').replace(/ᗰ/g, 'm').replace(/ᑎ/g, 'n').replace(/O/g, 'o').replace(/ᑭ/g, 'p').replace(/ᑫ/g, 'q').replace(/ᖇ/g, 'r').replace(/ᔕ/g, 's').replace(/T/g, 't').replace(/ᑌ/g, 'u').replace(/ᐯ/g, 'v').replace(/ᗯ/g, 'w').replace(/᙭/g, 'x').replace(/Y/g, 'y').replace(/ᘔ/g, 'z')
}
function joinKahoot(pin, name) {
    let bot = new Kahoot;
    bot.setMaxListeners(Number.POSITIVE_INFINITY)
    bot.on("joined", () => {
        botNumber++
        console.log(`${nameBack(bot.name)} joined successfully.`);
        if(bot.name == nameBack(name)+i) {
            console.log('All bots have joined!')
        }
    });
    if (config.autoReconnect) {
        bot.on('disconnect', () => {
            console.log('Reconnected.')
            bot.join(pin, bot.name+"a");
        })
    }
    bot.join(pin, name+i).catch(()=>{console.log(`${bot.name} failed to join.`)});
    bot.on("questionStart", question => {
        if (question.type == "word_cloud") {
            console.log(`${nameBack(question.client.name)} answered question ${question.index+1} out of ${question.quiz.questionCount}. It responded with 'https://github.com/lolwhenlifegivesyoulemons/kahoot-bot'`);
            bot.answerQuestion('https://github.com/lolwhenlifegivesyoulemons/kahoot-bot');
        } else if (question.type == "jumble") {
            console.log(`${nameBack(question.client.name)} answered question ${question.index+1} out of ${question.quiz.questionCount}. It responded with a random answer.`);
            bot.answerQuestion([Math.floor(Math.random()*question.quiz.answerCounts[question.index]), Math.floor(Math.random()*question.quiz.answerCounts[question.index]), Math.floor(Math.random()*question.quiz.answerCounts[question.index]), Math.floor(Math.random()*question.quiz.answerCounts[question.index])]);
        } else if (question.type == "quiz") {
            console.log(`${nameBack(question.client.name)} answered question ${question.index+1} out of ${question.quiz.questionCount}. It responded with a random answer.`);
            question.answer(Math.floor(Math.random()*question.quiz.answerCounts[question.index]));
        } else if (question.type == "survey") {
            console.log(`${nameBack(question.client.name)} answered question ${question.index+1} out of ${question.quiz.questionCount}. It responded with a random answer.`);
            question.answer(Math.floor(Math.random()*question.quiz.answerCounts[question.index]));
        } else {
            //nothing
        }
            
    });
    bot.on("questionEnd", info => {
        console.log((info.correct) ? `${nameBack(info.client.name)} got it right! :)`:`${nameBack(info.client.name)} got it wrong. :(`)
    })
    bot.on("finish", info => {
        bot.leave();
        console.log("The kahoot has ended. "+nameBack(bot.name)+" died.");
        i--
        if(i == 0) {
            process.exit()
        }
    });
    process.on("SIGINT", function () {
        bot.leave()
        console.log("User pressed CTRL+C. "+nameBack(name)+i+" died.");
        i--
        if(i == 0) {
            process.exit()
        }
    });
}
flood(config.gamePin, config.botName, config.botAmount+1, config.joinDelay)
