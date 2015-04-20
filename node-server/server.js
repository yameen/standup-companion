var express = require('express')
    , app = express()
    , fs = require('fs')
    , path = require('path')
    , pfxFilePath = path.resolve(__dirname, 'ssl/client.p12')
    , pfxPasswordPath = path.resolve(__dirname, 'ssl/password')
    , request = require('request');

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

app.get('/LoadTickets', function (req, res) {
    var project = req.query.project;
    var status = req.query.status;
    var epic = req.query.epic;

    var queryUrl = config.jiradomain + "/rest/api/2/search?jql=";
    queryUrl += "project=" + config.projects[project];
    queryUrl += " AND status=" + config.statuses[status];
    queryUrl += " AND \"Epic Link\"=" + config.epics[epic];

    console.log("URL: " + req.url);
    console.log("JIRA URL: " + encodeURI(queryUrl));

    request.get(urlWithSSLOptions(encodeURI(queryUrl)), function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body));
        }
    });
});

app.get('/FakeData', function (req, res) {
    fs.readFile('fakedata.json', 'utf8', function (err, data) {
        if (err) throw err;
        res.send(JSON.parse(data));
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});