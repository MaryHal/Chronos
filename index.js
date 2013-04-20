"use strict";

// index.js contains the ui for managing the schedule
// as well as ajax requests for server data.
var x = 0;
var y = 0;

$(document).ready(function() {

    alert("test");

    $("tbody").mousedown(function(e) {
        alert("clicked");
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
    });
    
    $("tbody").mouseup(function(e) {
       alert("release");
       var x -= e.pageX - this.offsetLeft;
       var y -= e.pageY - this.offsetTop;
       x = Math.abs(x);
       y = Math.abs(y);
       alert(x);
       alert(y);
    });
});






