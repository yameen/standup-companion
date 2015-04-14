function boop() {
    var req = new XMLHttpRequest();
    req.open("GET", "JiraTest/", false);
    req.send(null);
    console.log(JSON.parse(req.responseText))
}