var tickets;
var currentTicketCounter;
var haveValidNonEmptyData = false;
var totalNumberOfTickets = 0;

function resetCurrentTicketCounter() {
    currentTicketCounter = 1;
}

function updateTicketView() {
    totalNumberOfTickets = tickets.issues.length;

    var ticket = tickets.issues[currentTicketCounter-1];
    $('#summary').html(ticket.fields.summary);
    $('#reporter').html(ticket.fields.reporter.name);
    $('#avatars').attr('src', ticket.fields.reporter.avatarUrls['48x48']);
    var standupProgress = (((currentTicketCounter)/tickets.issues.length)*100) + '%';
    $('#standupProgress').css('width', standupProgress);
    $('.header__standupInfo span').text('Ticket number '+ currentTicketCounter +' of '+ totalNumberOfTickets);
}

function setStatusIndicatorToPlay(playing){
    if(playing){
        $('.header__statusIndicator').addClass('playingTimer');
    }
    else {
        $('.header__statusIndicator').removeClass('playingTimer');
    }

}

function loadTickets(project, status, epic) {
    var queryURL = "/LoadTickets?project=" + project + "&status=" + status + "&epic=" + epic;
    $.getJSON(queryURL, function(data){
        tickets = data;
        validateDataReturned(tickets);
        resetCurrentTicketCounter();
        updateTicketView();
    });
}

//TODO is totalNumberOfTickets updated?
function validateDataReturned(dataIn) {
    if(dataIn && (totalNumberOfTickets > 0))
    {
        haveValidNonEmptyData = true;
    }
    else {
        haveValidNonEmptyData = false;
    } 
}

function ticketsHaveBeenLoaded(){
    return haveValidNonEmptyData;
}

function isThereANextTicket()
{
    if(ticketsHaveBeenLoaded) {
        if((currentTicketCounter) >= totalNumberOfTickets) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}

//TODO this isn't used?
function isThereAPreviousTicket()
{
    if(ticketsHaveBeenLoaded) {
        if((currentTicketCounter) <= 0) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}

//TODO for dev only
function loadOfflineTickets() {
    $.getJSON("OfflineTickets/", function(data){
        tickets = data;
        resetCurrentTicketCounter();
        validateDataReturned(tickets);
        updateTicketView();
    });
}

function nextTicket() {
    if (currentTicketCounter < tickets.issues.length) {
        currentTicketCounter++;
        updateTicketView();
    }
}

function previousTicket() {
    if (currentTicketCounter > 1) {
        currentTicketCounter--;
        updateTicketView();
    }
}