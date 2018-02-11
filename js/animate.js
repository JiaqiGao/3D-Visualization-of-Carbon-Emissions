function showCaret0() {
    document.getElementById("bottom").style.opacity = 0.3;
}
function showCaret1() {
    document.getElementById("bottom").style.opacity = 0.4;
}
function showCaret2() {
    document.getElementById("bottom").style.opacity = 0.5;
}
function showCaret3() {
    document.getElementById("bottom").style.opacity = 0.6;
}
function showCaret4() {
    document.getElementById("bottom").style.opacity = 0.7;
}
function showCaret5() {
    document.getElementById("bottom").style.opacity = 0.8;
}
function showCaret6() {
    document.getElementById("bottom").style.opacity = 0.9;
}
function showCaret6() {
    document.getElementById("bottom").style.opacity = 1;
}

//this calls the function above, 3000 milliseconds is 3 seconds, adjust here to make it a longer interval
setTimeout("showCaret0()", 2000);
setTimeout("showCaret1()", 2100);
setTimeout("showCaret2()", 2200);
setTimeout("showCaret3()", 2300);
setTimeout("showCaret3()", 2400);
setTimeout("showCaret2()", 2500);
setTimeout("showCaret3()", 2600);
setTimeout("showCaret3()", 2700);
setTimeout("showCaret3()", 2800);

$(document).ready(function(){
   var scroll_start = 0;
   var startchange = $('#scrolldown');
   var offset = startchange.offset();
    if (startchange.length){
      $(document).scroll(function() {
      scroll_start = $(this).scrollTop();
      if(scroll_start > 10) {
          $("#toptext").css('opacity', 0);

       } else {
          $("#toptext").css('opacity', 1);
       }
     });
    }

    $("#button").click(function(e) {
     e.preventDefault();
     $('html, body').animate({
       scrollTop: $($.attr(this, 'href')).offset().top
     }, 1500);
   });

   $(document).ready(function() {
    $("#wow").delay(20000).fadeIn(10);
    $("a#wow").on('click', function(){
     window.location = "http://www.google.com/";
});
});

});
