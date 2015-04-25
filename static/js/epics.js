
function listEpics(json) {
    $.each(json.epics, function(index, value){
        if(!value.hidden){
            $("#epicList").children('tbody').append($('<tr>')
                    .append($('<td>')
                        .addClass('btn btn-default btn-block')
                        .text(value.epicLabel)
                        .data('epicJson', value)
                        .click(function(){
                            $.post('/standup', JSON.stringify($(this).data('epicJson')))
                                .done(function(data){
                                    console.log(data);
                                });
                        })
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