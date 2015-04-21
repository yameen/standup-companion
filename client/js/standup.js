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
    $.getJSON(queryURL, function(data){
        tickets = data;
        resetTicketCounter();
        updateTicketView();
    });
}

function loadFakeData() {
    $.getJSON("FakeData/", function(data){
        tickets = data;
        resetTicketCounter();
        updateTicketView();
    });
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