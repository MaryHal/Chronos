"use strict";

// index.js contains the ui for managing the schedule
// as well as ajax requests for server data.

/*$(document).ready(function() {
    alert("test");
    //$("body").click(function() {
      //  alert("You clicked down!");
    //});
    var body = document.getElementById("body");
    body.onmousedown = makeDiv;
});*/

(function() {
    window.onlaod = function() {
      var body = document.getelementById("body");
      body.onclick = success;
    };
    
    function success() {
        alert("Success!");
    }
}) ();
