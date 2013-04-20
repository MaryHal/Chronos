 $(function() {
  $( "#draggable" ).draggable({ revert: "valid" });
  $( "#draggable2" ).draggable({ revert: "invalid" });
  
  $( "#droppable" ).droppable({
    activeClass: "ui-state-hover",
    hoverClass: "ui-state-active",
    drop: function( event, ui ) {
      $( this )
      .addClass( "ui-state-highlight" )
      .find( "p" )
        .html( "Dropped!" );
    }
  });
});
