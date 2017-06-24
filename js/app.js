
// for pop making draggable
$(".draggable-pop").draggable({
    //revert: true,
    stop: function(event, ui) {
       
    }
});

// for capture event and hide table data
var tabdata="";
var count=0;
var v;
var score=0;
var tries=0;
var x=0;
var y=0;
$('.column').click(function () {

	if (count == 0) {
	tabdata = this.innerHTML;

	this.innerHTML="";
	$(this).addClass("selected-number");		
	$('.inputvalue').css('opacity',1);
	$('.inputvalue').css('pointer-events','auto');
	$('.label-1').css('display','none');
	$('.label-2').css('display','block');
	$('.refresh').css('opacity',1);
	$('.answere-section').css('opacity',1);
	$('.refresh').css('pointer-events','auto');
	 x = getOffset(this).left;
	 y = getOffset(this).top;
	
	 v=	this;
	count++;
	}
	else{
			if($(this).hasClass("selected-number")){

	this.innerHTML=tabdata;
	$(this).removeClass("selected-number");
	$('.label-1').css('display','block');
	$('.label-2').css('display','none');
	$('.inputvalue').css('opacity',0.5);
	$('.inputvalue').css('pointer-events','none');
	$('.answere-section').css('opacity',0.5);
	$('.pop').css('display', 'none');
	document.getElementsByClassName("inputvalue")[0].innerHTML="";
	count=0;
}
		
	}

});

//toggle functionlity

//for showing keypad onclick event

$('.inputvalue').click(function () {
	$('.inputvalue').css('background','rgb(204, 204, 204) none repeat scroll 0% 0%');
	$(this).addClass('highlighted');
	
	$('.pop').css({display: 'block',left: -320, top: 210, 'z-index': 1000, position: 'absolute'});
	 $('.label-2').animate({scrollTop:0}, '500', 'swing');
	$('.label-2').animate({scrollTop:$('.table').position().top}, 'slow');
});
	
// make pop up close button


$("#close").click(function(){
    $("#keypad-pop").hide();
$('.inputvalue').css('background','white');
    $('.total-drop').removeClass('highlighted');
});

//dom read value from keypad

(function(){

var presskey = document.getElementsByClassName('keypad');

for (var i = 0; i < presskey.length; i++) {
    var keyvalue = presskey[i];
    keyvalue.onclick = function() {
        var keydata = this.innerHTML;
        //alert($(".total-drop").hasClass("highlighted"));
        console.log(keydata);
        if (keydata.indexOf("img")>=1) {
          var check = document.getElementsByClassName("highlighted")[0].innerHTML.trim();
           document.getElementsByClassName("highlighted")[0].innerHTML=check.substring(0, check.length - 1);
         // console.log(check.length);
        }
        else{
        if ((document.getElementsByClassName("highlighted")[0].innerHTML).trim().length<2) {
        document.getElementsByClassName("highlighted")[0].innerHTML+=keydata;
        }}
        //this is for enable and disble submit-default button
        if (document.getElementsByClassName("highlighted")[0].innerHTML.trim().length>=1) {
        	$('.submit-default').css('opacity',1);
        	$('.inputvalue').css('pointer-events','auto');

        }else
        $('.submit-default').css('opacity',0.5);
		//$('.inputvalue').css('pointer-events','none');
}}

})();

$('.instruct').click(function() {
  $(".question").show();
    });

//finding answere true and wrong
$('.submit-default').click(function() {
  	//alert("fjgd");
  	var data = document.getElementsByClassName("highlighted")[0].innerHTML.trim();
  	calculate(data,tabdata);
    });

function calculate(data,tabdata){
	//var count = 0;
	 $('.table').css('pointer-events','none');
	if(parseInt(data) == parseInt(tabdata)){
			 $('.submit-default').css('display','none');
			 $('.right').css('display','block');
			 $('.tryagain').css('display','block');
			 $('.swtplyr').css('display','block');
			 document.getElementsByClassName("swing")[0].innerHTML=tabdata;
			  $('.swing').css('display','block');
			  $('.inputvalue').css('pointer-events','none');

			  $(".swing").stop().animate({'left': (x-10) + 'px'},1000,function(){
    	 $(".swing").stop().animate({'top':  (y)  + 'px'},1000,function() {
    });
    });

			  tries++;
			  score++;
		}
	else{
		$('.submit-default').css('display','none');
		$('.wrong').css('display','block');
		$('.tryagain').css('display','block');
		$('.swtplyr').css('display','block');
		tries++;

	}
		
	}

//	calling of reset button

	$(".tryagain").click(function(){
   	reset(tabdata);
   	
});

// this is the play again button action 

	function reset(tabdata){

		$('.label-1').css('display','block');
		$('.label-2').css('display','none');
		$('.wrong').css('display','none');
		$('.right').css('display','none');
		$('.tryagain').css('display','none');
		$('.swtplyr').css('display','none');
		$('.swing').css('display','none');
		$('.submit-default').css('display','block');
		$('.answere-section').css('opacity',0.5);
		$('.submit-default').css('opacity',0.5);
		$('.table').css('pointer-events','auto');
		document.getElementsByClassName("highlighted")[0].innerHTML="";
		$('.swing').css({'top':'200px','left':'200px'});
		v.innerHTML=tabdata;
		count = 0;

	}

	// for swtch the user

	$(".swtplyr").click(function(){
  	$('.evalution').css('display','block'); 
  	document.getElementsByClassName("score")[0].innerHTML=score;
  	document.getElementsByClassName("tries")[0].innerHTML=tries;
   	
});

//for playing new game

$(".newgame").click(function(){
  	reset(tabdata);
  	$('.evalution').css('display','none'); 
  	score=0;
  	tries=0;
});

//for refresh

$(".refresh").click(function(){
  	reset(tabdata);
  	
  	$('.evalution').css('display','none');
  	$('.refresh').css('opacity',0.5); 
  	$('.refresh').css('pointer-events','none');
  	score=0;
  	tries=0;
});


//for closing question popup

$(".closeBtn").click(function(){
	    $(".question").hide();
});

// get value of posiotn
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}