"use strict";

// index.js contains the ui for managing the schedule
// as well as ajax requests for server data.
var indexColor
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

$(document).ready(function() {

    

    buildTable();
    hideRows();
    testAjax();
    
    
    function buildTable() {
		for(var i = 0; i < 48 * 6; i++ ){
		    var new_row = $("<tr id=time" + i + ">");
	
		    for(var p = 0; p < 8; p++) {
			var new_cell = $("<td id=day" + p + "time" + i + ">");
			if(i%6 == 0) {
			    new_cell.css("border-top","1px solid #DDDDDD");
			    if(p == 0) {
				new_cell.attr("rowspan","6");
				new_cell.css("background-color","gray");
				var hour = Math.floor(i / 12);
				if (hour > 12)
				    hour = hour % 12;
				if(i/12 > hour)
				    new_cell.html("" + hour + ":30");
				else
				    new_cell.html("" + hour + ":00");
			    }
			}
	
			new_row.append(new_cell);
		    }
		    $("tbody").append(new_row);
		}
    }
    
    function hideRows() {
		var x = $("tbody").children().slice(0,90);
		var y = $("tbody").children().slice(210,287);
		x.each(function(index){
		    $(this).css("display","none");
		});
		y.each(function(index){
		    $(this).css("display","none");
		});
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

    function addOther(startDay, startTime, endDay, endTime) {
    	for (var i = startDay; i <= endDay; i++) {
    		for (var j = startTime; j <= endTime; j++) {
    			if ( j % 6 == 0) {
    				$("#day" + (i + 1) + "time" + j).css({"backgroundColor":"rgb(245, 110, 110)", "color":"black"});
    			} else {
	    			$("#day" + i + "time" + j).css({"backgroundColor":"rgb(245, 110, 110)", "color":"black"});
    			}
    		}
    	}
    }

    $("tbody").mousedown(function(e) {
        startX = e.pageX - this.offsetLeft;
        startY = e.pageY - 230;
    });
    
    $("tbody").mouseup(function(e) {
       endX = (e.pageX - this.offsetLeft);
       endY = (e.pageY - 230);
       
       //get days.
       var startCol = Math.floor(startX / (($("tr").width() - 62)/ 7));
       var endCol = Math.floor(endX / (($("tr").width() - 62) / 7));
       if (startCol < 1) {
           startCol = 1;
       }
       if (endCol < 1) {
           endCol = 1;
       }
       
       //time
       var startRow = Math.floor(parseFloat(startY / 5)) + 90;
       var endRow = Math.floor(parseFloat(endY / 5)) + 90;

       alert("Starting Col(Days):" + startCol + "\nEnding Col:" + endCol);
       alert("Strating Row(Time):" + startRow + "\nEnding Row:" + endRow);
       addOther(startCol, startRow, endCol, endRow);
    });
    
    $("#class-search").keyup(function() {
      var query = $('#class-search').val()
      var request = $.ajax({
         url: "http://theinfiniteset.net/Chronos/Search.php",
         type: "get",
          dataType : "json",
         data: {"query" : query},
      });
     request.done(keySuccess);
     request.fail(keyError);
      /*
      $.ajax("http://theinfiniteset.net/Chronos/search.php",
	       { success : keySuccess,
           error :   keyError,
           dataType : "jsonp",
           data : {"query" : query},
	       });
         */
    });


  function keySuccess(result, a, b) {
    alert(JSON.stringify(result));
  }

  function keyError(jqxhr, type, error) {
    var msg = 0;
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






