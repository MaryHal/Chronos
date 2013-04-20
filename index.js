"use strict";

// index.js contains the ui for managing the schedule
// as well as ajax requests for server data.
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

$(document).ready(function() {
    alert("Start?");
    $("tbody").mousedown(function(e) {
        startX = e.pageX - this.offsetLeft;
        startY = e.pageY - this.offsetTop;
    });
    
    $("tbody").mouseup(function(e) {
        alert("Beginning.");
       endX = (e.pageX - this.offsetLeft);
       endY = (e.pageY - this.offsetTop);
       
       //get days.
       var startCol = Math.floor(startX / (($(tr).width() / 8)));
       var endCol = Math.floor(endX / (($(tr).width() / 8)));
       if (startCol < 1) {
           startCol = 1;
       }
       if (endCol < 1) {
           endCol = 1;
       }
       
       //time
       var startRow = Math.floor(startY / 5);
       var endRow = Math.floor(endY / 5);
       alert("Starting Col(Days):" + startCol + "\nEnding Col:" + endCol);
       alert("Strating Row(Time):" + startRow + "\nEnding Row:" + endRow);
    });
});






