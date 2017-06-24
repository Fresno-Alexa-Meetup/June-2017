var alexa = require('alexa-app');
var app = new alexa.app();

app.launch(function (req, res) {
    res.say('Hello there!');
    res.shouldEndSession(false);
    res.send();
});

app.intent('greetIntent', {
    // Unneeded but just put for practice
    'slots' : {'visitor': 'VISITOR'},
    'utterances': [
        'How are you?',
        'What\'s up?',
        'How\'s it going?'
    ]
}, function (req, res){
    var visitor = req.slot('visitor');
    res.say('I\'m good. What is your name?');
    res.shouldEndSession(false);
    res.send();
});

app.intent('sayName', {
    'slots': {'visitor': 'VISITOR'},
    'utterances': [
        'My name is {visitor}',
        'I\'m {visitor}',
        'I will not tell you my name.'
    ]
}, function (req, res) {
    var visitor = req.slot('visitor');
    if(visitor !== null){
        res.say('Hello ' + visitor + '. My name is Alexa.');
        res.shouldEndSession(true);
        res.send();
    } else {
        res.say('Well that was quite rude.');
        res.shouldEndSession(true);
        res.send();
    }
});

/**
 * Error handler for any thrown errors.
 */
app.error = function(exception, request, response) {
    response.say('Sorry, something bad happened');
};

// Connect to lambda
exports.handler = app.lambda();
