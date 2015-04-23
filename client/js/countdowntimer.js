    var timePerTicket;

    function createTimePerTicketSelector() {
        $('.header__timer').append($("<input>")
            .attr("id", "timerSelect")
            .attr("type", "text")
            .attr("value", "2")
            .attr("name", "ticketTime"));
        $("input[name='ticketTime']").TouchSpin({
            min: 1,
            max: 6,
            step: 1,
            decimals: 0,
            booster: false,
            postfix: 'Minutes'
        });
    }

    function destroyAndClearInnerHtmlOfTimerCircles() {
        var countDown_timer = $('.header__timer',window.parent.document);
        countDown_timer.TimeCircles().destroy();
        $('.header__timer').empty();
    }

    function removeTimerAndReDisplaySelector() {
        destroyAndClearInnerHtmlOfTimerCircles();
        createTimePerTicketSelector();
    }

    function playWithCurrentTimePerTicket() {
        getTimeSetPerTicketInSeconds();
        destroyAndClearInnerHtmlOfTimerCircles();
        startTicketCountDownTimer(timePerTicket);
    }

    function getTimeSetPerTicketInSeconds(){
        if($('#timerSelect').length){
            var inputValue = parseInt($('#timerSelect').val(), 10);
            timePerTicket = inputValue * 60;
        }
        else if (timePerTicket) {
            timePerTicket = timePerTicket <= 0 ? 45 : timePerTicket;
        }
        else {
            timePerTicket = 45;
        }
        
    }

    function tickOverToNextTicketOrEnd(){
        if(isThereANextTicket()) {
            nextTicket();
            playWithCurrentTimePerTicket();
        }
        else {
            playingTimer = false;
            setStatusIndicatorToPlay(false);
            console.log('finished playing all tickets!');
        }
    }

    function startTicketCountDownTimer(timeInSeconds) {
        var countDown_timer = $('.header__timer',window.parent.document);
        countDown_timer.data('timer',timeInSeconds || 120);
        countDown_timer.TimeCircles({ time: { Days: { show:false }, Hours: { show:false }, Minutes: { color: '#4D8DC1' }, Seconds: { color: '#4D8DC1' } } })
        .addListener(
            function(unit,value,total) {
                switch(unit)
                {
                    case "Minutes":
                    if (value<=0)
                    {
                        countDown_timer.TimeCircles({time: { Days: {show: false}, Hours: {show:false}, Minutes: {show:false}}, Seconds: {show:true}}).rebuild();
                    }
                    break;
                    case "Seconds":
                    if(total==59)
                        countDown_timer.TimeCircles.rebuild();
                    //({time: { Days: {show: false}, Hours: {show:false}, Minutes: {show:false}}, Seconds: {show:true}}).rebuild();
                    if (total == 30) {
                        countDown_timer.data('timer',30);
                        countDown_timer.TimeCircles({ time: { Days: { show:false }, Hours: { show:false }, Minutes: { color: '#900' }, Seconds: { color: '#900' } } })
                    }
                    if (total<=0)
                    {
                        countDown_timer.TimeCircles().destroy();
                        tickOverToNextTicketOrEnd();
                    }
                    break;
                }
            }
        );
        playingTimer = true;
    }