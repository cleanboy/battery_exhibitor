/*
 * Begin Exhibitor list animations -- 
 */
$(document).ready(function(){
	
	var bat = 'battery';
	var evt = 'evtech';
	var ch = 'charging';
	
	var letters = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
	var letter;
	
	function makeList(expo){
		//create relevant divs and give em a wrapper div. Also gives class to each exhibitor of what letter category it is...
		$('.list_item').each(function(){
			var groupID = $(this).parent().attr('id');
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
	
	//buttons for fade in / out each one
	function exhiButtons(button, first_min, sec_min){
		$(button).click(function(){
			var topThis = $(this);
			var cvalue = $(this).attr('title');
			var currentBig = $('.maximised').attr('title');
			if($(this).hasClass('selected')){
				return;
			//check if any other titles are minimised
			}else if($(first_min).hasClass('minimised') || $(sec_min).hasClass('minimised')){
				$('.'+currentBig+'-wrapper').fadeOut(500, function(){
					$('.'+cvalue+'-wrapper').fadeIn(500);
				});
				topThis.addClass('maximised');
				topThis.removeClass('minimised');
				topThis.siblings().removeClass('maximised');
				topThis.siblings().addClass('minimised');
				topThis.addClass('selected');
				topThis.siblings().removeClass('selected');
				return;
			}else if($('#batteryButton').hasClass('maximised') && $('#evButton').hasClass('maximised') && $('#chargeButton').hasClass('maximised') && $('#showAll').hasClass('maximised')){
				$('.all').fadeOut(500, function(){
					$('.'+cvalue+'-wrapper').fadeIn(500);
				});
				topThis.addClass('selected');
				topThis.removeClass('minimised');
				topThis.addClass('maximised');
				topThis.siblings().removeClass('maximised');
				topThis.siblings().addClass('minimised');
				return;
			}
		});
	}
	
	//Call functions for each button:
	exhiButtons('#batteryButton', '#evButton', '#chargeButton');
	exhiButtons('#evButton', '#batteryButton', '#chargeButton');
	exhiButtons('#chargeButton', '#evButton', '#batteryButton');
	
	//show all buttons resets all classes and essentially returns the page to the state it was in when it loaded essentially...
	$('#showAll').click(function(){
		var topThis = $(this);
		var currentBig = $('.maximised').attr('title');
		if($(this).hasClass('maximised')){
			return;
		}else{
			$('.'+currentBig+'-wrapper').fadeOut(500, function(){
				$('.all').fadeIn(500);
			});
			topThis.siblings().addClass('maximised');
			topThis.siblings().removeClass('minimised');
			topThis.removeClass('minimised');
			topThis.addClass('maximised');
			topThis.siblings().removeClass('selected');
			return;
		}
	});
	
	
	
});
