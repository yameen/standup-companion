function boop() {
    var req = new XMLHttpRequest();
    req.open("GET", "JiraTest/", false);
    req.send(null);
    var response = JSON.parse(req.responseText);

    console.log(response);

    document.getElementById("summary").innerHTML = response.fields.summary;
    document.getElementById("reporter").innerHTML = response.fields.reporter.name;
    document.getElementById("avatars").src = response.fields.reporter.avatarUrls['48x48'];
}

function loadTickets(project, status, epic) {
    var queryURL = "/LoadTickets?project=" + project + "&status=" + status + "&epic=" + epic;
    var req = new XMLHttpRequest();
    req.open("GET", queryURL, false);
    req.send(null);
    var response = JSON.parse(req.responseText);

    console.log(response);
}