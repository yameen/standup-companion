var tickets;
var ticketCounter;

function updateTicketView(ticket) {
    document.getElementById("summary").innerHTML = ticket.fields.summary;
    document.getElementById("reporter").innerHTML = ticket.fields.reporter.name;
    document.getElementById("avatars").src = ticket.fields.reporter.avatarUrls['48x48'];
}

function boop() {
    var req = new XMLHttpRequest();
    req.open("GET", "JiraTest/", false);
    req.send(null);
    var response = JSON.parse(req.responseText);

    console.log(response);

    updateTicketView(response);
}

function loadTickets(project, status, epic) {
    var queryURL = "/LoadTickets?project=" + project + "&status=" + status + "&epic=" + epic;
    var req = new XMLHttpRequest();
    req.open("GET", queryURL, false);
    req.send(null);
    tickets = JSON.parse(req.responseText);

    console.log(tickets);

    ticketCounter = 0;
    updateTicketView(tickets.issues[ticketCounter]);
}

function nextTicket() {
    if (ticketCounter < tickets.issues.length-1) {
        updateTicketView(tickets.issues[++ticketCounter]);
    }
}

function previousTicket() {
    if (ticketCounter > 0) {
        updateTicketView(tickets.issues[--ticketCounter]);
    }
}