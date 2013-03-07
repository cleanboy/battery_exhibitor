$(document).ready(function() { 

	//SLIDE OUT PANEL ON RIGHT OF HOME PAGE
	$("#slide_out_btn").toggle(
		function(){ 
			$("#slide_out_box, #slide_out_btn").stop(true,true).animate({right: '+=600'}, 300); 
			 $('#lights_out').css({ opacity: 0.7, 'width':$(document).width(),'height':$(document).height()});	
       		 $('body').css({'overflow':'hidden'});

		},
		function(){ 
			$("#slide_out_box, #slide_out_btn").stop(true,true).animate({right: '-=600'}, 300);
			$('#lights_out').css({ opacity: 0.7, 'width':0,'height':0});	
       		        $('body').css({'overflow':'visible'});
		}
	);

//MAKE GREY OVERLAY CLICK ABLE TO HIDE SLIDE OUT REG BOX
$("#lights_out").click(function () {
         $("#slide_out_btn").trigger('click');
});

	//MAIN MENU
	$("#menu ul li").hover(
				  function () {
					$('ul', this).stop(true, true).fadeIn(400);//stop()
				  },
			
				  function () {
					$('ul', this).stop(true, true).fadeOut(300);	
				  }
			);

	//HOME PAGE MAIN SLIDE SHOW
	$('#main_slide_show_slides').cycle({ 
		fx:     'fade', 
		speed:  500, 
		timeout: 6000, 
		hover: '1',
		pager:  '#main_slide_show_nav',
		pagerEvent: 'mouseover', 
		allowPagerClickBubble: true,  
		pagerAnchorBuilder: function(idx, slide) { 
			// return selector string for existing anchor 
			return '#main_slide_show_nav li:eq(' + idx + ') a'; 
		} 
	});
	
	
	//HOME PAGE TESTIMONIAL CENTER IN LI - MAYBE SHOULD HAVE TRIED JUST CSS BUT THIS JUST WORKS...
	//NOW CALL FUNCTION OM EACH TESTIMONIAL BOX
	//IMPORTANT THIS NEEDS TO HAPPEN BEFORE THE .CYCLE CALL
	  
	  $(".home_testimonials_content").each(function(index) {
		$(this).css({
			position:'absolute',
			left: (350 - 300)/2,
			top: (230 - $(this).height())/2
		});
		//alert($(this).height());
		$('.test').remove();
		});
		
	//HOME PAGE TESTIMONIAL SLIDE SHOW
	//REMOVED AS TESTIMONIALS ARE NOW RANDOMISED ON PAGE LOAD
	$('#home_testimonials ul').cycle({ 
		fx:     'fade', 
		speed:  '1000', 
		timeout: 6000, 
		hover: '1'
	});
	
	//HOME PAGE AJAX LOGO SCROLLER
	
/*	if ($("#home_exhibitors ul").length) {
	
	setInterval(function() {
	
		//EXHIBITOR LOGO GRABBER
		$.ajax({url:"http://www.thebatteryshow.com/ajax-exhibitor-logo-loader", cache:false, success:function(result){		
			 $("#home_exhibitors ul").fadeOut(300, function(){				  
				  $("#home_exhibitors ul").html(result).fadeIn();    
			   });
		}});//END EXHIB LOGO AJAX
		
		//SUPPORTERS LOGO GRABBER	
		$.ajax({url:"http://www.thebatteryshow.com/ajax-supporter-logo-loader", cache:false, success:function(result){		
			 $("#home_supporters ul").fadeOut(300, function(){				  
				  $("#home_supporters ul").html(result).fadeIn();    
			   });
		}});//END SUPPORTERS LOGO AJAX
	
	}, 5000); //5 seconds
	}
*/

	//CHARGING EXPO HOME PAGE MAIN SLIDE SHOW
	$('#main_photo_slider').cycle({ 
		fx:     'fade', 
		speed:  '5000', 
		timeout: 6000, 
		hover: '1'
	});

        
        
 $('.hotel_slider').cycle({ 
		fx:     'fade', 
		speed:  '1000', 
		timeout: 6000
	});


	
	
	

	// The Amazingly complex rewrite of the conference program

	$(".session_holder").each(function() {
		numLeftBlocks = 0;
		numRightBlocks = 0;
		unExpandedMaxHeight = 0;
		unExpandedLeftHeight = 0;
		unExpandedRightHeight = 0;
		expandedMaxHeight = 0;
		expandedLeftHeight = 0;
		expandedRightHeight = 0;
		$(this).children().each(function() {
			topContentH = $(this).find('.list_body_expand').outerHeight(true);
			topContentExpandedH = $(this).find('.list_expanded_body').outerHeight(true);
			bottomContentH = $(this).find('.list_bottom_content').outerHeight(true);
			if ($(this).hasClass('left')) {
				unExpandedLeftHeight = unExpandedLeftHeight + topContentH +  bottomContentH;
				expandedLeftHeight = expandedLeftHeight + topContentExpandedH + bottomContentH;
				numLeftBlocks = numLeftBlocks + 1;
			} else {
				unExpandedRightHeight = unExpandedRightHeight + topContentH +  bottomContentH;
				expandedRightHeight = expandedRightHeight + topContentExpandedH + bottomContentH;
				numRightBlocks = numRightBlocks + 1;
			}
		});
		unExpandedMaxHeight = (Math.max(unExpandedLeftHeight, unExpandedRightHeight));
		expandedMaxHeight = (Math.max(expandedLeftHeight, expandedRightHeight));
		$(this).height(unExpandedMaxHeight);
		$(this).css('max-height', expandedMaxHeight +'px');
		$(this).css('min-height', unExpandedMaxHeight +'px');
		
		if(numLeftBlocks < numRightBlocks) {
			$(this).children().each(function() {
				bottomContentH = $(this).find('.list_bottom_content').outerHeight(true);
				topContentH =  $(this).find('.list_body_expand').outerHeight(true);
				if ($(this).hasClass('left')) {
					$(this).css('min-height', (unExpandedMaxHeight / numLeftBlocks +'px'));
					$(this).css('max-height', (expandedMaxHeight  / numLeftBlocks +'px'));
					$(this).find('.list_body_expand').css('max-height',$(this).find('.list_expanded_body').height());
				} else {
				   
					if (unExpandedRightHeight < unExpandedMaxHeight) {
						$(this).find('.list_body_expand').css('height', (((unExpandedMaxHeight - unExpandedRightHeight) / numRightBlocks)  - bottomContentH  +'px'));
						$(this).find('.list_body_expand').css('min-height', (((unExpandedMaxHeight - unExpandedRightHeight) / numRightBlocks) - bottomContentH  +'px'));
					}
					if (expandedRightHeight < expandedMaxHeight) {
						  $(this).find('.list_body_expand').css('max-height', ($(this).find('.list_expanded_body').outerHeight(true) + ((expandedMaxHeight - expandedRightHeight) / numRightBlocks)  +'px'));
					} else {
						  $(this).find('.list_body_expand').css('max-height', ($(this).find('.list_expanded_body').outerHeight(true)  + 'px'));
					}
					
					$(this).css('min-height',$(this).height());
					$(this).css('max-height',$(this).find('.list_expanded_body').outerHeight(true)+bottomContentH  +'px');
				}
			});
		} else  if (numLeftBlocks > numRightBlocks) {
			$(this).children().each(function() {
				bottomContentH = $(this).find('.list_bottom_content').outerHeight(true);
				topContentH =  $(this).find('.list_body_expand').outerHeight(true);
				if ($(this).hasClass('right')) {
					$(this).css('min-height', (unExpandedMaxHeight / numRightBlocks +'px'));
					$(this).css('max-height', (expandedMaxHeight  / numRightBlocks +'px'));
					$(this).find('.list_body_expand').css('max-height',$(this).find('.list_expanded_body').height());
				} else {
					if (unExpandedLeftHeight < unExpandedMaxHeight) {
						$(this).find('.list_body_expand').css('height', (((unExpandedMaxHeight - unExpandedLeftHeight) / numLeftBlocks)  - bottomContentH  +'px'));
						$(this).find('.list_body_expand').css('min-height', (((unExpandedMaxHeight - unExpandedLeftHeight) / numLeftBlocks) - bottomContentH  +'px'));
					}
					if (expandedLeftHeight < expandedMaxHeight) {
						$(this).find('.list_body_expand').css('max-height', ($(this).find('.list_expanded_body').outerHeight(true) + ((expandedMaxHeight - expandedLeftHeight) / numLeftBlocks)  +'px'));
					} else {
						  $(this).find('.list_body_expand').css('max-height', ($(this).find('.list_expanded_body').outerHeight(true)  + 'px'));
					}
					
					$(this).css('min-height',$(this).height() + 'px');
					$(this).css('max-height',$(this).find('.list_expanded_body').outerHeight(true)+bottomContentH  +'px');
				}
			});
		} else if (numLeftBlocks == numRightBlocks)  {
			$(this).children().each(function() {
							
				if ($(this).hasClass('left')) {
					$(this).find('.list_body_expand').css('max-height',Math.max($(this).find('.list_expanded_body').outerHeight(true) , $(this).next().find('.list_expanded_body').outerHeight(true))  + 'px');
					$(this).find('.list_bottom_content').css('height',Math.max($(this).find('.list_bottom_content').outerHeight(true) , $(this).next().find('.list_bottom_content').outerHeight(true)) -40 + 'px');
					$(this).css('max-height', Math.max($(this).find('.list_expanded_body').outerHeight(true) , $(this).next().find('.list_expanded_body').outerHeight(true)) + $(this).find('.list_bottom_content').outerHeight(true) + 'px');
				   
				} else if ($(this).hasClass('right')){
					$(this).find('.list_body_expand').css('max-height',Math.max($(this).find('.list_expanded_body').outerHeight(true) , $(this).prev().find('.list_body_expand').outerHeight(true))  + 'px');
					$(this).find('.list_bottom_content').css('height',Math.max($(this).find('.list_bottom_content').outerHeight(true) , $(this).prev().find('.list_bottom_content').outerHeight(true)) -40 +'px');
					$(this).css('max-height', Math.max($(this).find('.list_expanded_body').outerHeight(true) , $(this).next().find('.list_expanded_body').outerHeight(true)) + $(this).find('.list_bottom_content').outerHeight(true) + 'px');
				};
			
		    $(this).css('height',$(this).find('.list_body_expand').outerHeight(true) + $(this).find('.list_bottom_content').outerHeight(true) +'px');
			$(this).css('min-height',$(this).height()+ 'px');
			
			});
		};
	});



	
	//LIST SHOW HIDE
	$(".expand_button").toggle(function(event, mouseclicked){

	        mouseclicked = typeof mouseclicked !== 'undefined' ? mouseclicked : true;
			maxChange = 0;
            thisChange= 0;
			numLeftBlocks = 0;
	        numRightBlocks = 0;
            $container = $container = $(this).closest('.session_holder, .list_item');
                
            if (mouseclicked == true) {
				                                				
				if($container.hasClass('session_holder')) {

					$container.children().each(function() {
						newHeight = $(this).find('.list_body_expand').css('max-height');
						$(this).find('.list_body_expand').stop(true,true).animate({ height: newHeight}, 1000 );
						$(this).stop(true,true).animate({ height: $(this).css('max-height')}, 1000 );
						
					});
				} else if ($container.hasClass('list_item')) {
					newHeight = $container.find('.list_expanded_body').height();  
					$container.find('.list_body_expand').stop(true,true).animate({ height: newHeight + 'px' }, 1000 );
				}
				
					$($container).find('.expand_button').not(this).trigger('click',['false']);
				
			};
			$(this).removeClass('down_arrow').addClass('up_arrow');   
        	return false;       
		},
		function(event, mouseclicked){
			mouseclicked = typeof mouseclicked !== 'undefined' ? mouseclicked : true;
			numRightBlocks = 0;
			$container = $container = $(this).closest('.session_holder, .list_item');

			if (mouseclicked == true) {
				if($container.hasClass('session_holder')) {

					$container.children().each(function() {
						newHeight = $(this).find('.list_body_expand').css('min-height');
						$(this).find('.list_body_expand').stop(true,true).animate({ height: newHeight}, 1000 );
						$(this).stop(true,true).animate({ height: $(this).css('min-height')}, 1000 );
						
					});
				} else if ($container.hasClass('list_item')) {
					newHeight = $container.find('.list_body_expand').css('min-height');
					$container.find('.list_body_expand').stop(true,true).animate({ height: newHeight }, 1000 );
				}
				
					$($container).find('.expand_button').not(this).trigger('click',['false']);
				
			};
			$(this).removeClass('up_arrow').addClass('down_arrow');      

			return false;
	});

    	//TAB MENU
	
	$(".tab_content").hide(); //Hide all content
	$("ul.tabs li:first").addClass("active").show(); //Activate first tab
	$(".tab_content:first").show(); //Show first tab content
	
	//On Click Event
	$("ul.tabs li").click(function() {
		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab_content").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		$(activeTab).fadeIn(); //Fade in the active content
		return false;
	});


       //COLOR BOX
	$("a.colorbox").colorbox({title: false});

	$("a.colorboxiframe").colorbox({iframe:true, width:"80%", height:"80%"});

//Gallery
		 	if ($('#galleria').length) {
									Galleria.loadTheme('assets/js/galleria/themes/classic/galleria.classic.min.js');
									Galleria.configure({
       					autoplay: 5000,
       					width:940,
       					height:550,
       					transition: 'fade',
												debug: false,
												showInfo: false
    					}); 
    					Galleria.run('#galleria');
					};


/********************************
BEHOLD THE NOT SO AMAZING POP UP
********************************/
/*
//CHECK FOR SHOWN COOKIE IF NOT SET SHOW POPUP AND THEN DROP COOKIE SO IT DOESNT SHOW AGIAN FOR A WEEK
if( $.cookie('shown') == null  ) {
	$.cookie( 'shown', '1',  { expires: 7, path: '/' } );
	$('#lights_out_popup').css({ opacity: 0.8, 'width':$(document).width(),'height':$(document).height()});
	$('#site_switcher').css({'display': 'block'});	
}
//ADD CLICK FUNCTION TO THE CALL BACK 
$("#popup_bsx_usa").click(function() {
  	$('#site_switcher').css({'display': 'none'});	
	$('#lights_out_popup').css({'display': 'none'});	
	return false;
});
*/
/********************************/

/************************
POP UP FOR POSTPONED SHOW
************************/
//CHECK FOR SHOWN COOKIE IF NOT SET SHOW POPUP AND THEN DROP COOKIE SO IT DOESNT SHOW AGIAN FOR A WEEK

if((/^http:\/\/www.thebatteryshow.com\/kr-kr\//.test(window.location)) || (/^http:\/\/www.thebatteryshow.com\/kr-en\//.test(window.location))) {
	if($.cookie('shown_postponed') == null ){
		$.cookie( 'shown_postponed', '1',  { expires: 1, path: '/' } );
		$('#lights_out_popup').css({ opacity: 0.8, 'width':$(document).width(),'height':$(document).height()});
		$('#site_postponed').css({'display': 'block'});	
	}
}

//ADD CLICK FUNCTION TO THE CALL BACK 
$("#lights_out_popup").click(function() {
  	$('#site_postponed').css({'display': 'none'});	
	$('#lights_out_popup').css({'display': 'none'});	
	return false;
});

/*****************************
QUICK SIGN UP FORM AJAX SUBMIT
*****************************/

	//SHOW / HIDE INLINE FORM FIELD
	$("input.input").focus(function(){
		if($(this).val()==$(this).attr('title')){$(this).val('');}
	});
	$("input.input").blur(function(){
		if($(this).val()==''){$(this).val($(this).attr('title'));}
	});

	//ON QUICK SIGN UP SUBMIT
	$(".quick_sign_up_button").click(function() {		

		//SET DEFAULTS
		var email_address = $("input#email_address").val();
		var referer = $("input#language").val();
		var hasError = false;
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;	

		//CHECK FOR VALUE
		if(email_address == '' || email_address == "sign up to email updates – enter your email here" || email_address == "SIGN UP TO EMAIL UPDATES") {
		
			hasError = true;
			//alert(email_address);
			alert('Please enter an email address...');
        
		//CHECK EMAIL ADDRESS IS VALID
		}else if(!emailReg.test(email_address)) {

			hasError = true;
			//alert(email_address);
			alert('Please enter a vailid email address...');

        }
		//PREVENT DEFAULT SUBMIT ACCTION
        if(hasError == true) { return false; }

		//BUILD UP DATA STRING
		var dataString = 'email_address=' + email_address + '&referer=' + referer;

		//alert(dataString);

		//DETERMIN WHICH DOMAIN SUBMITED REQUEST AND REWRITE URL TO GET ROUND SAME ORIGIN POLICY.
		if(referer == "michigan") {
				var url = "http://www.thebatteryshow.com/assets/scripts/email_submit.php";	
			}else if(referer == "charging"){	
				var url = "http://www.chargingexpo.com/assets/scripts/email_submit.php"	;			
			}else if(referer == "evtech"){	
				var url = "http://www.evtechexpo.com/assets/scripts/email_submit.php"	;			
			}

		$.ajax({
		  type: "POST",
		  url: url,
		  data: dataString,//{ email_address: email_address, referer: referer },
		  success: function(data) {
				$("input.input").val('Thank you...');
		  },
		  error: function (data) {
		  		alert('There has been an error please try again');
				//alert(data);
		  }
		});

		//PREVENT DEFAULT ACTION
		return false;

	});// END ON QUICK SIGN UP SUBMIT

/*********************************
END QUICK SIGN UP FORM AJAX SUBMIT
*********************************/

/*************************************
THE AMAZINGLY SIMPLE SCROLL TO THE TOP
*************************************/

/* $('a[href=#top]').click(function(){
        $('html, body').animate({scrollTop:0}, 'slow');
        return false;
    }); */

$(".scroll").click(function(event){		
		event.preventDefault();
                if(this.hash == "#top"){
                   $('html, body').animate({scrollTop:0}, 3000, 'swing');
                }else{
		   $('html,body').animate({scrollTop:$(this.hash).offset().top}, 3000, 'swing');
                }
	});
	
/*
 * Call for papers -- 
 */

	//validation call
	$('#speakerForm').validationEngine();
	
    //character countdown for call for papers
    $('.word_count').keyup(function(){
		var maxChars = $(this).attr('maxChar');
		var max = maxChars;
		var len = $(this).val().length;
		if (len >= max) {
			$left = max-len;
			$(this).next('.counter').html('<span style="color: red;">' + $left + '</span> characters left');
		}else {
			var char = max - len;
			$(this).next('.counter').text( char + ' characters left');
		}								  
	});
	
	//other text box slide down
	var toggle = 1;	
	$('#tick14').click(function(){
		if(toggle === 1){
			$('#tick_box_other').slideDown(200);
			toggle = 2;
			return;
		}else if(toggle === 2){
			$('#tick_box_other').slideUp(200);
			toggle = 1;
			return;
		}
	});

	//replicate submitter details for speaker
	$('#speakercopy').click(function(){
		var title = $('#title option:selected').val();
		var first_name = $('#first_name').val();
		var family_name = $('#family_name').val();
		var job_title = $('#job_title').val();
		var company_name = $('#company_name').val();
		var email = $('#email').val();
		var phone = $('#phone').val();
		if($(this).attr('checked')){
			$('#sTitle').val(title);
			$('#sFirst_name').val(first_name);
			$('#sFamily_name').val(family_name);
			$('#sJob_title').val(job_title);
			$('#sCompany_name').val(company_name);
			$('#sEmail').val(email);
			$('#sPhone').val(phone);
		}else{
			$('#sTitle').val('');
			$('#sFirst_name').val('First Name');
			$('#sFamily_name').val('Family Name');
			$('#sJob_title').val('');
			$('#sCompany_name').val('');
			$('#sEmail').val('');
			$('#sPhone').val('');
		}
	})
		
});//END DOC READY



$(window).load(function() {


/*****************************
THE AMAZING LOGO SCROLLER - CALL FROM WINDOW LOAD AS NEED TO WAIT FOR IMAGES TO LOAD TO GET WIDTHS
*****************************/
	
	var total_li_width = 0;
	var total_count = 0;

	$('#sponsors ul li img').each(function(){
		total_li_width += $(this).width();
		total_count += 1;
	});
	
	var padding_sum = total_count*40; // FACTOR PADDING INTO TOTAL WIDTH
	var total_width = (total_li_width+padding_sum);
	/*alert('total width of all lis = ' + total_li_width);
	alert('total count of all lis = ' + total_count);
	alert('total width = ' + total_width);*/
	
    $('#sponsors ul').width(total_width).addClass('first_list');
	$('#sponsors ul').clone().insertAfter('#sponsors ul').addClass('last_list').removeClass('first_list');


	function animate_logos() {
		//START ANNIMATION
		$('#sponsors ul.first_list').animate({"marginLeft": - total_width + "px"},(5000*total_count), 'linear', 
		function() { // THE CALL BACK
		   // alert('done');
			$('.last_list').removeClass('last_list').addClass('first_list');
			$(this).removeClass('first_list').addClass('last_list').css("marginLeft","0");
			$(this).appendTo('#sponsors_wrapper');
			animate_logos();//LOOP ANIMATE LOGO FUNCTION
		});
	}//END ANNIMATE LOGOS

	animate_logos();//CALL ANIMATE LOGO FUNCTION 

/*****************************
END THE AMAZING LOGO SCROLLER
*****************************/

});//END WILDOW LOAD FUNCTION

//Proceedings empty href alert

jQuery('#proceedings-2012 a').click(function() {

 var link = jQuery(this).attr("href");

 if(link === "") {
        alert('This Speaker has requested their presentation is not made publicly available');
								return false;
    }

});



