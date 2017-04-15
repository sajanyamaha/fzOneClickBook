$(document).ready(function(){
	var minOnepageW = 991;
	//enable full page slides
	$(".main").onepage_scroll({
		sectionContainer: ".watch-section",
		easing: "ease-in",
		animationTime: 1000,
		pagination: true,
		updateURL: true,
		beforeMove: function(index) {
			if($(window).width() >= minOnepageW){
				var footer = $('.footer');
				var footerH = footer.height();
				var speed = 600;
				if(index != 1){
					if(!footer.hasClass('active')){
						footer.animate({'bottom': '0px'}, speed);
						footer.addClass('active');
					}
				}else{
					if(footer.hasClass('active')){
						footer.animate({'bottom': (-footerH) + 'px'}, speed);
						footer.removeClass('active');
					}
				}
			}
		},
		loop: false,
		keyboard: true,
		responsiveFallback: minOnepageW 
	});

	//animate footer(hide on first slide)
	$(window).scroll(function(){
		if($(window).width() < minOnepageW){
			var footer = $('.footer');
			var footerH = footer.height();
			var speed = 300;
			var marker = $('.watch-intro').height(); // y pos where to show/hide footer
			if($(window).scrollTop() >= (marker / 2)){
				if(!footer.hasClass('active')){
					footer.addClass('active').animate({'bottom': '0px'}, speed);
				}
			} else {
				if(footer.hasClass('active')){
					footer.removeClass('active').animate({'bottom': (-footerH) + 'px'}, speed);
				}
			}
		}
	});

	//animate hash links on small screens
	$('.more').on('click', function(e){
		if($(window).width() <= minOnepageW){
			e.preventDefault();
			var $target = $(this).closest('section').next();

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, 300, 'swing', function () {
					//window.location.hash = target;
			});
		}
	});
	//scroll page when down arrow is clicked
	$('.more').on('click', function(e){
		var idx = $(this).data('index');
		if(idx){
			e.preventDefault();
			$('main').moveTo(idx);
		}
	});

    //animate hash links on small screens
	$('.more-nxt').on('click', function (e) {
	    if ($(window).width() <= minOnepageW) {
	        e.preventDefault();

	        var $target = $(this).closest('section').next();
	        $target.show();
	        $('html, body').stop().animate({
	            'scrollTop': $target.offset().top
	        }, 300, 'swing', function () {
	            //window.location.hash = target;
	        });
	        
	        var timeoutDur = 5000;
	        $('.forDay').each(function () {

	            var $nextTarget = $(this).next();
	            var $prevTarget = $(this).prev();
	            var $currentTarget = $(this);
	           
	            setTimeout(function () {
	                $currentTarget.show();
	                $('html, body').stop().animate({
	                    'scrollTop': $currentTarget.offset().top
	                }, 300, 'swing', function () {
	                    //window.location.hash = target;
	                });

	                if ($currentTarget.hasClass("typeForDate")){
	                    callTypedFor("typeForDate");
	                }
	                else if ($currentTarget.hasClass("typeForSeat")) {
	                    callTypedFor("typeForSeat");
	                }
	                else if ($currentTarget.hasClass("typeForMeal")){
	                    callTypedFor("typeForMeal");
	                }
	                else if ($currentTarget.hasClass("typeForCard")) {
	                    callTypedFor("typeForCard");
	                }

	                if ($prevTarget.hasClass("forDay wait") || $prevTarget.hasClass("firstwait"))
	                {
	                    $prevTarget.hide();
	                }
	                
	            }, timeoutDur);

	            if ($currentTarget.hasClass("wait"))
	            {
	                timeoutDur = timeoutDur + 10000;
	            } else {
	                timeoutDur = timeoutDur + 18000;
	            }
	             
	        });
	    }
	});
    //scroll page when down arrow is clicked
	$('.more-nxt').on('click', function (e) {
	    var idx = $(this).data('index');
	    if (idx) {
	        e.preventDefault();
	        $('main').moveTo(idx);
	    }
	});

	//enable typewritter effect
	$(".watch-name-typed").typed({
		strings: ["Planning to fly?", "DXB-TRV?", "Let's do this !"],
		typeSpeed: 80,
		backDelay: 1500,
		loop: false
	});

	$(".select-seats-typed-hh").typed({
	    strings: ["How about this weekend ?", "Thursday night 11.30PM ?", "Expect small showers!"],
	    typeSpeed: 80,
	    backDelay: 1500,
	    loop: false
	});

	function callTypedFor(calledArea) {

	    var typedArray = ["Please wait"];
	    switch (calledArea) {
	        case 'typeForDate':
	            typedArray = ["How about this weekend ?", "Thursday night 11.30PM ?", "Expect small showers !"]
	            break;
	        case 'typeForSeat':
	            typedArray = ["Let me book you your usual Business window seat 3F", "Yaay! it's available", "Enjoy the view"]
	            break;
	        case 'typeForMeal':
	            typedArray = ["Your favourite Chicken-Tikka Biriyani is ready", "Lets add some drinks to it for free!", "Bon appetit !"]
	            break;
	        case 'typeForCard':
	            typedArray = ["Let's make the payment", "Using your Mastercard (-3343)", "Total AED 1500.00 "]
	            break;
	    }

	    $("." + calledArea+"-TypeArea").typed({
	        strings: typedArray,
	        typeSpeed: 80,
	        backDelay: 1500,
	        loop: false
	    });
	}
	//limit number of checked options
	$('.limit-checkboxes').on('click', 'label', function(){
		var parent = $(this).closest('section');
		var maxOptions = $(this).closest('.limit-checkboxes').data('max-checkboxes') | 0;
		var selectedOptions = $(this).closest('.limit-checkboxes').find('input').filter(function(){
			return $(this).prop('checked') == true
		}).length;
		var isChecked = $(this).siblings('input').prop('checked');
		if(maxOptions > 0 && selectedOptions == maxOptions && !isChecked){
			if(parent.data('last-checked')){
				var lastChecked = parent.data('last-checked');
				lastChecked.siblings('input').prop('checked', false);
			}
			else{
				return false;
			}
		}
		parent.data('last-checked', $(this));
	});

	//show/hide info box
	var infoBox =   $('.watch-info');
	var infoBoxW = infoBox.innerWidth();
	function showInfoBox(speed){
		var _speed = speed || 400;
		infoBox.stop().animate({'right': 0}, speed).removeClass('is-hidden');
	}
	function hideInfoBox(speed){
		var _speed = speed || 400;
		infoBox.stop().animate({'right': -infoBoxW}, speed).addClass('is-hidden');
	}
	$('.info-close').on('click', hideInfoBox);
	$('.info').on('click', showInfoBox);

	//show info box when form not submitted
	//setTimeout(function(){ showInfoBox(1000); }, 2000);


	// SNAPSVG.JS Clock Layout 

	//clock 1
	var clock1   = Snap("#clock1");
	var hours1   = clock1.rect(79, 35, 2, 55).attr({fill: "#282828", transform: "r" + 10 * 30 + "," + 80 + "," + 80});
	var minutes1 = clock1.rect(79, 20, 2, 70).attr({fill: "#282828", transform: "r" + 10 * 6 + "," + 80 + "," + 80});
	var seconds1 = clock1.rect(80, 10, 1, 80).attr({fill: "#ff6400"});
	var middle1 =   clock1.circle(80, 80, 2).attr({fill: "#ff6400"});

	//clock 2
	var clock2   = Snap("#clock2");
	var hours2   = clock2.rect(79, 35, 3, 45).attr({fill: "#282828", transform: "r" + 10 * 30 + "," + 80 + "," + 80});
	var minutes2 = clock2.rect(79, 20, 3, 60).attr({fill: "#535353", transform: "r" + 10 * 6 + "," + 80 + "," + 80});
	var seconds2 = clock2.rect(80, 10, 1, 80).attr({fill: "#ff6400"});
	var middle2 =   clock2.circle(80, 80, 2).attr({fill: "#ff6400"});

	//clock 3
	var clock3   = Snap("#clock3");
	var hours3   = clock3.rect(79, 35, 3, 46).attr({fill: "#282828", transform: "r" + 10 * 30 + "," + 80 + "," + 80});
	var minutes3 = clock3.rect(79, 20, 3, 60).attr({fill: "#535353", transform: "r" + 10 * 6 + "," + 80 + "," + 80});
	//var seconds3 = clock3.rect(80, 10, 1, 80).attr({fill: "#ff6400"});
	var middle3 =   clock3.circle(81, 80, 3).attr({fill: "#535353"});

	//clock 4
	var clock4   = Snap("#clock4");
	var hours4   = clock4.rect(79, 35, 3, 55).attr({fill: "#282828", transform: "r" + 10 * 30 + "," + 80 + "," + 80});
	var minutes4 = clock4.rect(79, 20, 3, 70).attr({fill: "#535353", transform: "r" + 10 * 6 + "," + 80 + "," + 80});
	//var seconds4 = clock4.rect(80, 10, 1, 80).attr({fill: "#ff6400"});
	var middle4 =   clock4.circle(81, 80, 3).attr({fill: "#535353"});

	//clock 5
	var clock5   = Snap("#clock5");
	var hours5   = clock5.rect(79, 35, 3, 55).attr({fill: "#282828", transform: "r" + 10 * 30 + "," + 80 + "," + 80});
	var minutes5 = clock5.rect(79, 20, 3, 70).attr({fill: "#535353", transform: "r" + 10 * 6 + "," + 80 + "," + 80});
	var seconds5 = clock5.rect(80, 10, 1, 80).attr({fill: "#ff6400"});
	var middle5 =   clock5.circle(80, 80, 2).attr({fill: "#ff6400"});


	// CLOCK Timer
	var updateTime = function(_clock, _hours, _minutes, _seconds) {
		var currentTime, hour, minute, second;
		currentTime = new Date();
		second = currentTime.getSeconds();
		minute = currentTime.getMinutes();
		hour = currentTime.getHours();
		hour = (hour > 12)? hour - 12 : hour;
		hour = (hour == '00')? 12 : hour;

		if(second == 0){
			//got to 360deg at 60s
			second = 60;
		}else if(second == 1 && _seconds){
			//reset rotation transform(going from 360 to 6 deg)
			_seconds.attr({transform: "r" + 0 + "," + 80 + "," + 80});
		}
		if(minute == 0){
			minute = 60;
		}else if(minute == 1){
			_minutes.attr({transform: "r" + 0 + "," + 80 + "," + 80});
		}
		if(hour == 1){
			_hours.attr({transform: "r" + 0 + "," + 80 + "," + 80});
		}
		_hours.animate({transform: "r" + hour * 30 + "," + 80 + "," + 80}, 200, mina.elastic);
		_minutes.animate({transform: "r" + minute * 6 + "," + 80 + "," + 80}, 200, mina.elastic);
		if(_seconds){
			_seconds.animate({transform: "r" + second * 6 + "," + 80 + "," + 80}, 500, mina.elastic);
		}
	}
	var updateSeconds = function(_clock, _seconds){
		var currentTime, second;
		currentTime = new Date();
		second = currentTime.getSeconds();

		if(second == 0){
			//got to 360deg at 60s
			second = 60;
		}else if(second == 1 && _seconds){
			//reset rotation transform(going from 360 to 6 deg)
			_seconds.attr({transform: "r" + 0 + "," + 80 + "," + 80});
		}
		if(_seconds){
			_seconds.attr({transform: "r" + second * 6 + "," + 80 + "," + 80});
		}
	}

	//update the clocks
	setInterval(function(){
		updateSeconds(clock1, seconds1);
		updateSeconds(clock2, seconds2);
		updateSeconds(clock5, seconds5);
	}, 1000);

	/*
	//submit watch form
	$('#watch-form').on('submit', function(){
		var formData = $(this).serializeArray();
		$("#watch-submit").attr('disabled', 'disabled');
		$.ajax({
			url : siteURL + 'submit.php',
			type: "POST",
			data : formData,
			success: function(data, textStatus, jqXHR){
				//data - response from server
				$('.form-submitted').fadeIn();
			},
			error: function (jqXHR, textStatus, errorThrown){
				alert('OOPS! Something went wrong, please try again!')
			}
		});
		return false;
	});
	//submit email subscribtion
	$('#email-form').on('submit', function(){
		var formData = $(this).serializeArray();
		$("#email-submit").attr('disabled', 'disabled');
		$("#email-field").attr('disabled', 'disabled');
		$.ajax({
			url : siteURL + 'subscribe.php',
			type: "POST",
			data : formData,
			success: function(data, textStatus, jqXHR){
				//data - response from server
				$("#email-submit").text('Thanks!');
			},
			error: function (jqXHR, textStatus, errorThrown){
				alert('OOPS! Something went wrong, please try again!')
			}
		});
		return false;
	});
	
	*/
	//set first slide 100% height
	$(window).resize(adjustSlideResp);

	function adjustSlideResp(){
		var winH = $(window).height();
		$('.watch-intro').css({'min-height': winH, 'height': winH});
	}
	adjustSlideResp();

});
