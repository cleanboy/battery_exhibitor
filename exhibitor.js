/*
 * Begin Exhibitor list animations -- 
 */


$(document).ready(function(){
	var bat = 'battery';
	var evt = 'evtech';
	var ch = 'charging';
	
	var groupID;
	
	var cvalue;
	
	var letters = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
	var letter;
	var alphaPieces = new Array;
	var alphaPiece;
	var amDiv = $('.alphabetical_menu').html();
	
	var originalIDs = [];
	var duplicateIDs = [];
	
	//collect all original ID's and store in array to re-apply later
	$('.list_group').each(function(){
		var originalID = $(this).attr('id');
		originalIDs.push(originalID);
	});
	
	//the below vars convert the array to a string and then replace commas with pipes...KEEP THIS
	//var lettString = letters.toString();
	//var properString = lettString.replace(new RegExp(',','g'), '|');
	
	function makeList(expo){
		//create relevant divs and give em a wrapper div. Also gives class to each exhibitor of what letter category it is...
		$('.list_item').each(function(){
			groupID = $(this).parent().attr('id');
			if($(this).hasClass(expo)){
				$(this).clone().insertBefore('.before_me').addClass(expo+'-item ' + groupID);
			}
		});
		$('.'+expo+'-item').wrapAll('<div class="'+expo+'-wrapper item_list" style="display:none"><');
		//loop through each letter and group them into one wrapper div
		for (var i=0; i<=letters.length; i++){
			$('.' + expo + '-item' + '.' + letters[i]).wrapAll('<div class="' + expo +'-container" title="' + letters[i] + '" />');	
		}
		//and then prepend the letter to the containing div + the top button
		$('.'+expo+'-container').each(function(){
			letter = $(this).attr('title');
			$(this).prepend('<a href="#top" class="scroll to_top" title="To The Top of Page">TOP</a><h2>'+ letter +'</h2>');
		});		
	}
	
	//call functions for each exhibition
	makeList(bat);
	makeList(evt);
	makeList(ch);
	
	
	function linkLettr(title, piece){
		//reset top menu first
		$('.alphabetical_menu').html(amDiv);
		//then reset array
		alphaPieces = [];
		//get relevant letters and add to array
		$(title).each(function(){
			alphaPiece = $(this).attr(piece);
			alphaPieces.push(alphaPiece);
		});
		//then change the relevant letters into links for scrolling (scrolling functionality needs to be added as of yet)
		$('.alphabetical_menu span').each(function(){
			var appendz = $(this).text();
			var ab = $(this);
			alphaPieces.forEach(function(item){
				if(appendz == item){
					ab.replaceWith('<a href="#' + item + '" class="scroll" title="go to '+item+'">' + item + '</a>');
				}
			})
		});
	}
	
	//call function first time to give alphabetical menu at the top relevant links
	linkLettr($('.list_group'), 'id');
	
	//buttons for fade in / out each one
	function exhiButtons(button, first_min, sec_min){
		$(button).click(function(){
			var topThis = $(this);
			cvalue = $(this).attr('title');
			var currentBig = $('.maximised').attr('title');
			
			if($(this).hasClass('selected')){
				return;
			//check if any other titles are minimised
			}else if($(first_min).hasClass('minimised') || $(sec_min).hasClass('minimised')){
				//call the alphabetical menu liink function
				linkLettr('.'+cvalue+'-container', 'title');
				//animate filtered items in/out
				$('.'+currentBig+'-wrapper').fadeOut(500, function(){
					$('.'+cvalue+'-wrapper').fadeIn(500);
				});
				//sort classes in divs for appropriate selection
				topThis.addClass('maximised');
				topThis.removeClass('minimised');
				topThis.siblings().removeClass('maximised');
				topThis.siblings().addClass('minimised');
				topThis.addClass('selected');
				topThis.siblings().removeClass('selected');
				
				//remove ID's and add to relevant section...for scroller
				$('.'+cvalue+'-wrapper').siblings().children().each(function() {					
						$(this).removeAttr('id');
				});
				//detect appropriate section and apply ID's
				$('.'+cvalue+'-container').each(function(){
					var eyeDee = $(this).attr('title')
					$(this).attr('id', eyeDee);
				});
				
				return;
			}else if($('#batteryButton').hasClass('maximised') && $('#evButton').hasClass('maximised') && $('#chargeButton').hasClass('maximised') && $('#showAll').hasClass('maximised')){
				//get relevant letters and add to array
				linkLettr('.'+cvalue+'-container', 'title');
				//fade everything out and then fade in filtered results
				$('.all').fadeOut(500, function(){
					$('.'+cvalue+'-wrapper').fadeIn(500);
				});
				//sort classes in divs for appropriate selection
				topThis.addClass('selected');
				topThis.removeClass('minimised');
				topThis.addClass('maximised');
				topThis.siblings().removeClass('maximised');
				topThis.siblings().addClass('minimised');
				//remove original ID's
				$('.list_group').removeAttr('id');
				//detect appropriate section and apply ID's
				$('.'+cvalue+'-container').each(function(){
					var eyeDee = $(this).attr('title')
					$(this).attr('id', eyeDee);
				});
				return;
			}
		});
	}
	
	//Call functions for each button:
	exhiButtons('#batteryButton', '#evButton', '#chargeButton');
	exhiButtons('#evButton', '#batteryButton', '#chargeButton');
	exhiButtons('#chargeButton', '#evButton', '#batteryButton');
	
	//show all buttons resets all classes and essentially returns the page to the state it was in when it loaded...
	$('#showAll').click(function(){
		var topThis = $(this);
		cvalue = $(this).attr('title');
		var currentBig = $('.maximised').attr('title');
		if($(this).hasClass('maximised')){
			return;
		}else{
			
			//get rid of all other ID's at this level that might be duplicates
			$('.all').siblings().children().each(function() {					
				$(this).removeAttr('id');
			});
			
			//Probably not the best way to do this but I couldnt figure out any other way...
			//Gets the IDs of the original .list_group divs and stores into array then re-populates as appropriate
			//works with 2 arrays filling one as the other empties and then uses the other the same way the second time round...got the idea from my own toggle script written elsewhere...
			if(originalIDs.length != 0){
				$('.list_group').each(function(){
					var origID = originalIDs.shift();
					$(this).attr('id', origID);
					duplicateIDs.push(origID);
				});
			}else if(originalIDs.length == 0){
				$('.list_group').each(function(){
					var origID = duplicateIDs.shift();
					$(this).attr('id', origID);
					originalIDs.push(origID);
				});
			}
			
			//function that uses ID's to generate links and used for sroller
			linkLettr($('.list_group'), 'id');
			
			//animation to fade back to original state
			$('.'+currentBig+'-wrapper').fadeOut(500, function(){
				$('.all').fadeIn(500);
			});
			
			//reset all classes to original page load states
			topThis.siblings().addClass('maximised');
			topThis.siblings().removeClass('minimised');
			topThis.removeClass('minimised');
			topThis.addClass('maximised');
			topThis.siblings().removeClass('selected');
			return;
		}
	});
	
	
	//scroller between letters - NOTE - as of jQuery 1.7 live() is deprecated...use on() instead.
	$(".scroll").live('click', function(event){		
		event.preventDefault();
        if(this.hash == "#top"){
       		$('html, body').animate({scrollTop:0}, 3000, 'swing');
       		return;
        }else{
   			$('html,body').animate({scrollTop:$(this.hash).offset().top}, 3000, 'swing');
   			return;
        }
	});
	
});