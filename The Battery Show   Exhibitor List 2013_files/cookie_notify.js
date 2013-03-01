/**
 * @author Matt.Jonat
 */
$(document).ready(function(){
	//Check if form has already been submitted
if( $.cookie('cookiebar') != 'hide'  ) { // force test 1 == 1

// cookiebar

        $('body').prepend('<div class="cookie-message" style="display:none; position:fixed; bottom:0; left:0; right:0; background-color:#000; color:#FFF; height:50px; border-top:2px solid #FFF; z-index:10"><p style="font-weight: bold; width:930px; margin:17px auto 0 auto; text-align:right;">We use cookies. By browsing this site you agree to the use of cookies<a class="cookiebar-close" style="cursor:pointer; color:#FFF; background-color:red; text-decoration:none; border:2px solid #FFF; width:23px; text-align:center; padding:5px; font-weight:bold; margin-left:10px;">Accept cookies and continue</a><a href="privacy-policy" style="color:#FFF; text-decoration:none; border:2px solid #FFF; width:23px; text-align:center; padding:5px; margin-left:10px; font-weight:bold;">More Information</a></p></div>');
        $('.cookie-message').css({opacity:0.9});
        $('.cookie-message').delay(4000).fadeIn(1000);  

        //cookiebar close function
        $('.cookiebar-close').click(function() {
               $('.cookie-message').fadeOut('slow');
               $.cookie( 'cookiebar', 'hide',  { expires: 365, path: '/' } );//write a 356 day cookie so we dont show cookiebar again
        });

	}// end cookie check

});
