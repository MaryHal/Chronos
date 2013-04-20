"use strict";

// index.js contains the ui for managing the schedule
// as well as ajax requests for server data.
var indexColor
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;
var currentQtr = "SPR";
var currentYear = 2013;

var classIds = [];

$(document).ready(function() {

    buildTable();
    hideRows();
    testAjax();
    $("#edit").click(editSchedule);
    $("#save").click(editBuddies);

    var visualRequest = $.ajax({
        url: "http://theinfiniteset.net/Chronos/query.php",
         type: "post",
          dataType : "json",
         data: {"userID" : user, "quarter" : currentQtr, "year" : currentYear},
      });
     visualRequest.done(visualSuccess);
     visualRequest.fail(keyError);

   
  function visualSuccess(result, a, b) {
  }

    function editSchedule() {
	
	$("#edit_schedule").css("display","block");
	$("#edit_buddies").css("display","none");
	

    }

    function editBuddies() {
	
        saveClasses(classIds, []);
	$("#edit_buddies").css("display","block");
	$("#edit_schedule").css("display","none");

    }


    function buildTable() {
		for(var i = 0; i < 48 * 6; i++ ){
		    var new_row = $("<tr id=time" + i + ">");
		    var offset = 0;
		    if ( i % 6 != 0) {
		    	offset = 1;	
		    } else {
		    	offset = 0;
		    }
		    
		    for(var p = 0; p < 8 -offset; p++) {
			var new_cell = $("<td id=day" + p + "time" + i + ">");
			new_cell.addClass("unselectable");
			new_cell.attr("unselectable", "on");
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
		var y = $("tbody").children().slice(210,288);
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
    
    function addClass() {
	    $.ajax("http://theinfiniteset.net/Chronos/printJson.php",
	       {        success : ajaxSuccess,
			error :   ajaxError,
			dataType : "jsonp",
	       }
	      )
	      var startTime = 0;
	      var endTime = 0;
	      
	      var startHour = 0;
	      var startMinute = 0;
	      startMinute = startTime % 10;
	      startMinute = (parseInt(startTime / 10) % 10 * 10);
	      startHour = time / 100;
	      
	      var endHour = 0;
	      var endMinute = 0;
	      endMinute = endTime % 10;
	      endMinute = (parseInt(endTime / 10) % 10 * 10);
	      endHour = endTime / 100;
    }

    function createBlock(startDay, startTime, endDay, endTime) {
		var x = $("#day" + startDay + "time" + startTime);
		startTime = (30/5)*Math.floor( startTime *5/30 );
		alert(startTime);
		x.attr("rowspan","" + endTime-startTime);
		x.attr("colspan","" + endDay-startDay);
		x.css("backgroundColor","gray");
		
		
		var yPix = $("td").height() * (endTime - startTime);
		var xPix = $("td").width() * (endDay - startDay) + 63;
		var startY = startTime - 90;
		var startX;
		if (startTime % 6 != 0) {
			startX = 73 * (startDay - 1) + 62;
		} else {
			startX = 73 * startDay + 62;
		}
		
		var newClass = $("<div></div>");
		newClass.css({"position":"relative", "left":"startX", "top":"startY", "height":"yPix", "width":"xPix"});
		var info = $("<p>Class ID</p>");
		newClass.append(info);
		$("tbody").append(newClass);	
    }

    function addOther(startDay, startTime, endDay, endTime) {
    	for (var i = startDay; i <= endDay; i++) {
    	    for (var j = startTime; j <= endTime; j++) {
    		if ( j % 6 == 0) {
    		    $("#day" + i + "time" + j).css({"backgroundColor":"rgb(245, 110, 110)", "color":"black"});
    		} else {
	    	    $("#day" + (i - 1) + "time" + j).css({"backgroundColor":"rgb(245, 110, 110)", "color":"black"});
    		}
    	    }
    	}
    }

    $("tbody").mousedown(function(e) {
        startX = e.pageX - this.offsetLeft;
        startY = e.pageY - 230;
	$("tbody").mousedown(function(q) {
	   var currX = q.pageX - this.offsetLeft;
	   var currY = q.pageY - 230;
	    if($("#starcraft")) {
		$("#starcraft").css({"position":"absolute","top":"startY","left":"startX", "width":""+currX-startX, "color":"red"});
	    } else {
		$("tbody").append("<div id=starcraft>");
		$("#starcraft").css("position","absolute");
		}

	})
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
	createBlock(startCol,startRow,endCol,endRow);
      // addOther(startCol, startRow, endCol, endRow);
    });
    
    $("#class_search").keyup(function() {
      var query = $('#class_search').val()
      var request = $.ajax({
         url: "http://theinfiniteset.net/Chronos/Search.php",
         type: "get",
          dataType : "json",
         data: {"query" : query},
      });
     request.done(keySuccess);
     request.fail(keyError);
    });

    $("#buddy_search").keyup(function() {
      alert(user);

	var query = $('#buddy_search').val()
	var newList = getFriends(query);
	var i = 0;
	if($("#buddy_details")) 
	    $("#buddy_details").remove();

//	} else {
	    var div = $('<div id="buddy_details">');
	    $("#buddy_details").html("");
//	}
	while(newList[i]) {

	    var friend = $('<div id='+"friend_"+newList[i]["id"]+'>');
	    friend.html(newList[i]["name"]);
	    div.append(friend);
	    if(i == 0) {
		friend.addClass("first_friend");
	    }
	    i++;
	}
	$("#edit_buddies").append(div);
    });

    $("#overlap").click(function() {
      var friend = $(".first_friend");
      if (friend[0]) {
        var fid = friend.id;
        fid = fid.substring(7, fid.length);

        var visualRequest = $.ajax({
          url: "http://theinfiniteset.net/Chronos/query.php",
            type: "post",
            dataType : "json",
            data: {"userID" : fid, "quarter" : currentQtr, "year" : currentYear},
        });
        visualRequest.done(friendSuccess);
        visualRequest.fail(keyError);
      }
    });

    function friendSuccess(request, a, b) {
      alert(JSON.stringify(request));
    }


    function getFriends(name) {
      var length = name.length;
      var newList = [];
      if (friendList != 0) {
        var friends = friendList["data"];
        for (var i = 0; i < friends.length; i++) {
          var friend = friends[i];
          var friendName = friend["name"];
          if (name.toLowerCase() == friendName.substring(0, length).toLowerCase()) {
            newList.push(friend);
          }
        }
      }
      return newList;
    }

  function saveClasses(add, remove) {
         // add = ["12444spr2013", "14070spr2013"];
         if (add.length > 0) {
           var addString = add[0];
           for (var i = 1; i < add.length; i++) {
             addString += ",";
             addString += add[i];
           }
           var request = $.ajax({
             url: "http://theinfiniteset.net/Chronos/Modify.php",
               type: "get",
               dataType : "json",
               data: {"action" : "add", "userID" : user, "classes" : addString},
           });
           request.done(addSuccess);
           request.fail(keyError);
         }

         if (remove.length > 0) {
           var removeString = remove[0];
           for (var i = 1; i < remove.length; i++) {
             removeString += ",";
             removeString += add[i];
           }
           request = $.ajax({
           url: "http://theinfiniteset.net/Chronos/Modify.php",
           type: "get",
            dataType : "json",
           data: {"action" : "remove", "userID" : user, "classes" : removeString},
            });
           request.done(addSuccess);
           request.fail(keyError);
         }
  }

  function addSuccess(results, a, b) {
    alert("success");
  }


  function keySuccess(result, a, b) {
      var i = 0;
      $('#completion').html("");
      $('#class_lookup_details');
      while(result[i]) {

          var classId = result[i]["id"];
          var shortname = result[i]["sname"];
          var section = result[i]["sec"];
          var classType = result[i]["type"];
          var button = $('<button>').text(shortname + "" + section + "" + classType);
	  
          button.click( function() { addClassToList(classId); } );
          $('#completion').append(button);
	  i++;
      }

  }

    function addClassToList(myClass)
    {
        classIds.push(myClass);

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






