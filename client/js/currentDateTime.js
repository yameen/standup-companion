function startTime() {
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var today = new Date();
    var hour = today.getHours();
    var minute = forceTwoDigits(today.getMinutes());
    var second = forceTwoDigits(today.getSeconds());
    var day = today.getDate();
    var month = monthNames[today.getMonth()];
    var weekDay = dayNames[today.getDay()];

    $('#timeclock').html(hour+":"+minute+":"+second+"&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;"+weekDay+" "+day+" "+month);
    var t = setTimeout(function(){startTime()},500);
}

function forceTwoDigits(i) {
    if (i<10) {i = "0" + i}  // add zero in front of numbers < 10
    return i;
}