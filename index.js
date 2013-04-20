"use strict";

// index.js contains the ui for managing the schedule
// as well as ajax requests for server data.

$(document).ready(function() {
    buildTable();
    testAjax();
    
    
    function buildTable() {
	for(var i = 0; i <48*6; i++ ){
	    var new_row = $("<tr id=time" + i + ">");
	    for(var p = 0; p<8;p++) {
		var new_cell = $("<td id=day" + p + "time" + i + ">");
		if(i%6 == 0) {
		    new_cell.css("border-top","1px solid #DDDDDD");
		}
		new_row.append(new_cell);
	    }
	    $("tbody").append(new_row);
	}


    }
    
    function testAjax() {
	/*$.ajax("http://theinfiniteset.net/Chronos/printJson.php",
	       {        success : ajaxSuccess,
			error :   ajaxError,
			dataType : "jsonp",
	       }
	      )*/
    }
    
    function ajaxSuccess(param) {
		alert(JSON.stringify(param));

    }
    // Provided Ajax error handler function. (Attempts to display a useful debugging
    // message.)
    function ajaxError(jqxhr, type, error) {
	var msg = "An Ajax error occurred!\n\n";
	if (type == 'error') {
	    if (jqxhr.readyState == 0) {
		// Request was never made - security block?
		msg += "Looks like the browser security-blocked the request.";
	    } else {
		// Probably an HTTP error.
		msg += 'Error code: ' + jqxhr.status + "\n" +
		    'Error text: ' + error + "\n" +
		    'Full content of response: \n\n' + jqxhr.responseText;
	    }
	} else {
	    msg += 'Error type: ' + type;
	    if (error != "") {
		msg += "\nError text: " + error;
	    }
	}
	alert(msg);
    }
});
