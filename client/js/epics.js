
function listEpics(json) {
    $.each(json.epics, function(index, value){
        if(!value.hidden){
            $("#epicList").children('tbody')
                .append($('<tr>')
                    .append($('<td class="btn btn-default btn-block">')
                        .text(value.epicLabel)
                        .data('epicJson', value)
                        .click(function(){console.log($(this).data('epicJson'))})
                )
            );
        }
    });
}

function loadEpics() {
    $.getJSON("ListEpics/", function(data){
        listEpics(data)
    });
}

//TODO for dev only
function loadOfflineEpics() {
    $.getJSON("OfflineEpics/", function(data){
        listEpics(data)
    });
}