const Kahoot = require('kahoot.js-updated'), //init
events = require('events'),
readline = require('readline-sync'),
express = require('express'),
app = express(),
multer = require('multer'),
upload = multer(),
port = 3278,
rateLimit = require('express-rate-limit'),
botLimit = rateLimit({
    windowMs: 60 * 1000,
    max: 1,
    message:
      `<html><body style="text-align: center; font-family:Arial;"><h1>Ratelimited.</h1></body></html>`
}),
killLimit = rateLimit({
    max: 1,
    message: `<html><body style="text-align: center; font-family:Arial;"><h1>Ratelimited.</h1></body></html>`
})
bodyParser = require('body-parser');
app.set('trust proxy')
app.use(bodyParser.urlencoded({ extended: true })); 
app.post('/', botLimit, function (req, res) {
    res.send('<h1 style="text-align: center; font-family: Arial;">Sending bots!</h1>')
    if(req.body.botNum > 250) {
        req.body.botNum = 250
    }
    if (req.body.autoReconnect) {
        autoReconnectIds.push(Number(req.body.pin))
    }
    botIds.push(Number(req.body.pin))
    flood(req.body.pin, req.body.name, Number(req.body.botNum)+1, Number(req.body.delay), req.body.swears, req.body.autoReconnect)
})
app.get('/', (req, res) => {
    res.sendFile(process.cwd()+'/index.html')
});
app.get('/killBots', killLimit, (req, res) => {
    let pin = Number(req.query.pin);
    let index = botIds.indexOf(pin);
    if (!botIds.includes(pin)) {
        return res.send('<h1 style="font-family:Arial; text-align:center;">No bots are running.</h1>')
    }
    if (index > -1) {
        delete botIds[index]
    }
    res.send('<h1 style="font-family:Arial; text-align:center;">Killing bots in '+req.query.pin+', please wait.</h1>')
})
app.listen(port, () => console.log(`Running flood.js at http://localhost:${port}`))
let i = 0,
botNumber = 0,
answer = "",
twoStepVar = "",
twoStepArray = [],
onFail = true;
botIds = [];
autoReconnectIds = [];
nameBypass = '';
process.setMaxListeners(Number.POSITIVE_INFINITY)
if (process.platform === "win32") {
    var rl = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.setMaxListeners(Number.POSITIVE_INFINITY)
    rl.on("SIGINT", function () {
      process.emit("SIGINT");
    });
  }
function flood(pin, name, numBots, joinSpeed, nameBypass, aR) {
    i++
    if (aR == 'true') {
        autoReconnect = true
    } else {
    }
    if (nameBypass) {
        name = name.replace(/a/g, 'ᗩ').replace(/b/g, 'ᗷ').replace(/c/g, 'ᑕ').replace(/d/g, 'ᗪ').replace(/e/g, 'E').replace(/f/g, 'ᖴ').replace(/g/g, 'G').replace(/h/g, 'ᕼ').replace(/i/g, 'I').replace(/j/g, 'ᒍ').replace(/k/g, 'K').replace(/l/g, 'ᒪ').replace(/m/g, 'ᗰ').replace(/n/g, 'ᑎ').replace(/o/g, 'O').replace(/p/g, 'ᑭ').replace(/q/g, 'ᑫ').replace(/r/g, 'ᖇ').replace(/s/g, 'ᔕ').replace(/t/g, 'T').replace(/u/g, 'ᑌ').replace(/v/g, 'ᐯ').replace(/w/g, 'ᗯ').replace(/x/g, '᙭').replace(/y/g, 'Y').replace(/z/g, 'ᘔ').replace(/A/g, 'ᗩ').replace(/B/g, 'ᗷ').replace(/C/g, 'ᑕ').replace(/D/g, 'ᗪ').replace(/E/g, 'E').replace(/F/g, 'ᖴ').replace(/G/g, 'G').replace(/H/g, 'ᕼ').replace(/I/g, 'I').replace(/J/g, 'ᒍ').replace(/K/g, 'K').replace(/L/g, 'ᒪ').replace(/M/g, 'ᗰ').replace(/N/g, 'ᑎ').replace(/O/g, 'O').replace(/P/g, 'ᑭ').replace(/Q/g, 'ᑫ').replace(/R/g, 'ᖇ').replace(/S/g, 'ᔕ').replace(/T/g, 'T').replace(/U/g, 'ᑌ').replace(/V/g, 'ᐯ').replace(/W/g, 'ᗯ').replace(/X/g, '᙭').replace(/Y/g, 'Y').replace(/Z/g, 'ᘔ')
    }
    if (i < numBots) {
        setTimeout(() => {joinKahoot(pin, name)}, joinSpeed);
        setTimeout(() => {flood(pin, name, numBots, joinSpeed, nameBypass, aR)}, joinSpeed);
    } else {
        i--
    }
}
function nameBack(name) {
        return name.replace(/ᗩ/g, 'a').replace(/ᗷ/g, 'b').replace(/ᑕ/g, 'c').replace(/ᗪ/g, 'd').replace(/E/g, 'e').replace(/ᖴ/g, 'f').replace(/G/g, 'g').replace(/ᕼ/g, 'h').replace(/I/g, 'i').replace(/ᒍ/g, 'j').replace(/K/g, 'k').replace(/ᒪ/g, 'l').replace(/ᗰ/g, 'm').replace(/ᑎ/g, 'n').replace(/O/g, 'o').replace(/ᑭ/g, 'p').replace(/ᑫ/g, 'q').replace(/ᖇ/g, 'r').replace(/ᔕ/g, 's').replace(/T/g, 't').replace(/ᑌ/g, 'u').replace(/ᐯ/g, 'v').replace(/ᗯ/g, 'w').replace(/᙭/g, 'x').replace(/Y/g, 'y').replace(/ᘔ/g, 'z')
}
let disableAutoReconnect = false;
function joinKahoot(pin, name) {
    checkInterv = setInterval(()=>{
        if (!botIds.includes(Number(bot.sessionID))) {
            bot.leave();
            disableAutoReconnect = true;
        }
    },500);
        let bot = new Kahoot;
        bot.setMaxListeners(Number.POSITIVE_INFINITY)
        bot.on("joined", () => {
            botNumber++
                if(bot.name == name+i) {
                    console.log('All bots have joined in a session. '+botIds.length+' flood(s) are running currently.')
                    i = 0
                }
            
        });
        
        bot.on('disconnect', () => {
            if (autoReconnectIds.includes(Number(bot.sessionID))) {
                    if (!disableAutoReconnect){
                        bot.join(pin, bot.name+"   ‍   ");
                    }
            }
            
        })
        
        bot.join(pin, name+i).catch(()=>{});
        bot.on("questionStart", question => {
            if (question.type == "word_cloud") {
                    bot.answerQuestion('https://github.com/lolwhenlifegivesyoulemons/kahoot-bot');
            } else if (question.type == "jumble") {
                bot.answerQuestion([Math.floor(Math.random()*question.quiz.answerCounts[question.index]), Math.floor(Math.random()*question.quiz.answerCounts[question.index]), Math.floor(Math.random()*question.quiz.answerCounts[question.index]), Math.floor(Math.random()*question.quiz.answerCounts[question.index])]);
            } else if (question.type == "quiz") {
                
                    question.answer(Math.floor(Math.random()*question.quiz.answerCounts[question.index]));
            } else if (question.type == "survey") {
                
                    question.answer(Math.floor(Math.random()*question.quiz.answerCounts[question.index]));
                
                } else {
                //nothing
            }
        });
    bot.on("questionEnd", info => {
        answer = "";
    })
    bot.on("finish", info => {
        disableAutoReconnect = true;
        bot.leave();
        botNumber--
        if(botNumber == 0) {
            disableAutoReconnect = false
        }
    });
    process.on("SIGINT", function () {
        disableAutoReconnect = true;
        bot.leave();
        botNumber--
        if(botNumber == 0) {
            disableAutoReconnect = false;
            process.exit()
        }
    });
}

//flood(config.gamePin, config.botName, config.botAmount+1, config.joinDelay)
