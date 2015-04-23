var express = require('express')
, app = express()
, fs = require('fs')
, path = require('path')
, pfxFilePath = path.resolve(__dirname, 'ssl/client.p12')
, pfxPasswordPath = path.resolve(__dirname, 'ssl/password')
, request = require('request')
, exec = require('child_process').exec;

var config;
fs.readFile('config.json', 'utf8', function (err, data) {
    if (err) throw err;
    config = JSON.parse(data)
});

app.use(express.static('../client'));

function urlWithSSLOptions(url) {
    var options = {};
    options.url = url;
    options.agentOptions = {
        pfx: fs.readFileSync(pfxFilePath),
        passphrase: fs.readFileSync(pfxPasswordPath),
        securityOptions: 'SSL_OP_NO_SSLv3'
    };
    return options;
}

app.get('/ListEpics', function (req, res) {
    var queryUrl = config.jiradomain + "/rest/greenhopper/1.0/xboard/plan/backlog/epics?rapidViewId=" + config.rapidViewId;
    request.get(urlWithSSLOptions(queryUrl), function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body));
        }
    });
});

app.get('/LoadTickets', function (req, res) {
    var project = req.query.project;
    var status = req.query.status;
    var epic = req.query.epic;

    var queryUrl = config.jiradomain + "/rest/api/2/search?jql=";
    queryUrl += "project=" + config.projects[project];
    queryUrl += " AND status=" + config.statuses[status];
    queryUrl += " AND \"Epic Link\"=" + config.epics[epic].url;
    queryUrl = encodeURI(queryUrl);

    console.log("URL: " + req.url);
    console.log("JIRA URL: " + queryUrl);

    request.get(urlWithSSLOptions(queryUrl), function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body));
        }
    });
});

//TODO for dev only
app.get('/OfflineTickets', function (req, res) {
    fs.readFile('offlinedata/tickets.json', 'utf8', function (err, data) {
        if (err) throw err;
        res.send(JSON.parse(data));
    });
});

//TODO for dev only
app.get('/OfflineEpics', function (req, res) {
    fs.readFile('offlinedata/epics.json', 'utf8', function (err, data) {
        if (err) throw err;
        res.send(JSON.parse(data));
    });
});

app.get('/speakNextTicket', function (req, res) {
    if(req.query.number) {
        exec ('omxplayer audio/nextTicketBell.wav', function(error, stdout, stderr) {
            if(error == null) {
                console.log(stdout);
                exec ('echo "Testing Ticket number '+ req.query.number+' being discussed now" | festival --tts', function(error, stdout, stderr) {
                    if(error == null)
                    {
                        res.send("Spoke "+ req.query.number);
                        console.log(stdout);
                    }
                    else {
                        res.send("Error: "+ stderr);
                        console.log(stderr);
                    }
                }); 
            }
            else {

                res.send("Error: "+ stderr);
                console.log(stderr);
            }
        });

    }
    else {
        res.send("Error: no 'number' parameter");
    }
});

app.get('/soundEndOfStandUp', function (req, res) {
    exec ('omxplayer audio/thatsAllFolks.mp3', function(error, stdout, stderr) {
        if(error == null) {
            res.send("Sounded end of standup");
            console.log(stdout);

        }
        else {
            res.send("Error: "+ stderr);
            console.log(stderr);
        }
    });

});

app.get('/sayTimerStarted', function (req, res) {
    exec ('echo "Testing Countdown Timer has started, please proceed" | festival --tts', function(error, stdout, stderr) {
        if(error == null) {
            res.send("Spoke prompt");
            console.log(stdout);

        }
        else {
            res.send("Error: "+ stderr);
            console.log(stderr);
        }
    });

});

app.get('/thirtySecondsLeft', function (req, res) {
    exec ('echo "Testing Warn-ing, Thirty Seconds remaining for this ticket" | festival --tts', function(error, stdout, stderr) {
        if(error == null) {
            res.send("Spoke warning");
            console.log(stdout);

        }
        else {
            res.send("Error: "+ stderr);
            console.log(stderr);
        }
    });

});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
