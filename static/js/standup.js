var tickets;
var currentTicketCounter;
var currentTicketJiraID;
var totalNumberOfTickets = 0;

function resetCurrentTicketCounter() {
    currentTicketCounter = 1;
}

function updateTicketView() {
    totalNumberOfTickets = tickets.issues.length;

    var ticket = tickets.issues[currentTicketCounter-1];
    $('#summary').html(ticket.fields.summary);
    $('#reporter').html(ticket.fields.reporter.name.replace("@bbc.co.uk",""));
    $('#avatars').attr('src', ticket.fields.reporter.avatarUrls['48x48']);
    var standupProgress = (((currentTicketCounter)/tickets.issues.length)*100) + '%';
    $('#standupProgress').css('width', standupProgress);
    $('#header__standupInfo').text('Ticket '+ currentTicketCounter +' of '+ totalNumberOfTickets);
    currentTicketJiraID = ticket.key;
    console.log(currentTicketJiraID);
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
        resetCurrentTicketCounter();
        updateTicketView();
    });
}

function isThereANextTicket()
{
    if(tickets) {
        if(currentTicketCounter >= totalNumberOfTickets) {
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

/*Voicing methods here*/

function audioForPlayTimer() {
    if(shouldIPlayAudio()){
        $.get('sayTimerStarted', function(data){
            console.log(data);
        });
    }
}

function audioForNextTicket(ticketNumber) {
    if(shouldIPlayAudio()){
        $.get('speakNextTicket?number='+ticketNumber || 'unknown', function(data){
            console.log(data);
        });
    }
}

function audioForEndOfStandUp() {
    if(shouldIPlayAudio()){
        $.get('soundEndOfStandUp', function(data){
            console.log(data);
        });
    }
}

function audioForThirtySecWarning() {
    if(shouldIPlayAudio()){
        $.get('thirtySecondsLeft', function(data){
            console.log(data);
        });
    }
}

function shouldIPlayAudio() {
    return !$(".standupControls--mute .glyphicon").hasClass("glyphicon-volume-up");
}
