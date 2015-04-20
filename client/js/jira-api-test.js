var tickets;
var ticketCounter;

function resetTicketCounter() {
    ticketCounter = 1;
}

function updateTicketView() {
    var ticket = tickets.issues[ticketCounter-1];
    $('#summary').html(ticket.fields.summary);
    $('#reporter').html(ticket.fields.reporter.name);
    $('#avatars').attr('src', ticket.fields.reporter.avatarUrls['48x48']);
    var standupProgress = (((ticketCounter)/tickets.issues.length)*100) + '%';
    $('#standupProgress').css('width', standupProgress);
}

function loadTickets(project, status, epic) {
    var queryURL = "/LoadTickets?project=" + project + "&status=" + status + "&epic=" + epic;
    var req = new XMLHttpRequest();
    req.open("GET", queryURL, false);
    req.send(null);
    tickets = JSON.parse(req.responseText);
    resetTicketCounter();
    updateTicketView();
}

function loadFakeData() {
    var req = new XMLHttpRequest();
    req.open("GET", "FakeData/", false);
    req.send(null);
    tickets = JSON.parse(req.responseText);
    resetTicketCounter();
    updateTicketView();
}

function nextTicket() {
    if (ticketCounter < tickets.issues.length) {
        ticketCounter++;
        updateTicketView();
    }
}

function previousTicket() {
    if (ticketCounter > 1) {
        ticketCounter--;
        updateTicketView();
    }
}