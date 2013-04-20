"use strict";

// index.js contains the ui for managing the schedule
// as well as ajax requests for server data.
var x = 0;
var y = 0;

$(document).ready(function() {

    alert("test");

    $("tbody").mousedown(function(e) {
        //alert("clicked");
        x = e.pageX - this.offsetLeft;
        y = e.pageY - this.offsetTop;
    });
    
    $("tbody").mouseup(function(e) {
       alert("release");
       x = x - (e.pageX - this.offsetLeft);
       y = y - (e.pageY - this.offsetTop);
       x = Math.abs(x);
       y = Math.abs(y);
       alert(x);
       alert(y);
    });
});






