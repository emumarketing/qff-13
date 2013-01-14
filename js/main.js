// Tab script based on http://css-tricks.com/organic-tabs/


(function($) {

    $.organicTabs = function(el, options) {
    
        var base = this;
        base.$el = $(el);
        base.$nav = base.$el.find(".nav");
                
        base.init = function() {
        
            base.options = $.extend({},$.organicTabs.defaultOptions, options);
            
            // Accessible hiding fix
            $(".hide").css({
                "position": "relative",
                "top": 0,
                "left": 0,
                "display": "none"
            }); 
            
            base.$nav.delegate("li > a", "click", function() {
            
                // Figure out current list via CSS class
                var curList = base.$el.find("a.current").attr("href").substring(1),
                
                // List moving to
                    $newList = $(this),
                    
                // Figure out ID of new list
                    listID = $newList.attr("href").substring(1),
                
                // Set outer wrapper height to (static) height of current inner list
                    $allListWrap = base.$el.find(".list-wrap"),
                    curListHeight = $allListWrap.height();
                $allListWrap.height(curListHeight);
                                        
                if ((listID != curList) && ( base.$el.find(":animated").length == 0)) {
                                            
                    // Fade out current list
                    base.$el.find("#"+curList).fadeOut(base.options.speed, function() {
                        
                        // Fade in new list on callback
                        base.$el.find("#"+listID).fadeIn(base.options.speed);
                        
                        // Adjust outer wrapper to fit new list snuggly
                        var newHeight = base.$el.find("#"+listID).height();
                        $allListWrap.animate({
                            height: newHeight
                        });
                        
                        // Remove highlighting - Add to just-clicked tab
                        base.$el.find(".nav li a, .nav li").removeClass("current");
                        $newList.addClass("current");
                        $newList.parent().addClass("current");
                            
                    });
                    
                }   
                
                // Don't behave like a regular link
                // Stop propegation and bubbling
                return false;
            });
            
        };
        base.init();
    };
    
    $.organicTabs.defaultOptions = {
        "speed": 100
    };
    
    $.fn.organicTabs = function(options) {
        return this.each(function() {
            (new $.organicTabs(this, options));
        });
    };
    
})(jQuery);

$(document).ready(function(){

// Smooth Scrolling from http://css-tricks.com/snippets/jquery/smooth-scrolling/#li-comment-94058
$('#header a[href*=#]').click(function() {
  if (location.pathname.replace(/^\//,") == this.pathname.replace(/^\//,")
  && location.hostname == this.hostname) {
    var $target = $(this.hash);
    $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
    if ($target.length) {
      var targetOffset = $target.offset().top;
      $('html,body').animate({scrollTop: targetOffset}, {duration:600});
      return false;
    }
  }

});

function initialize() {
  var myLatlng = new google.maps.LatLng(44.04401046666311, -123.085418343544);
  var center = new google.maps.LatLng(44.04401046666311, -123.08641834355);
  var styles = [
    {
      stylers: [
        { hue: "#eeece9" },
        { saturation: -40 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "simplified" }
      ]
    }
  ];

/*
  var contentString = '<div id="content">'+
      '<p>Bijou Cinemas <br /> 492 East 13th Avenue, Eugene OR<p>' + 
      '</div>';
  
  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });
*/

  var mapOptions = {
    center: center,
    zoom: 16,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styles
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  var marker = new google.maps.Marker({
    position: myLatlng,
    icon: "images/map-marker.png",
    map: map,
    title: "Bijou Art Cinemas"
  });
  
/*
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
*/
  
}
  
initialize();

// Init tab script  
  $("#tabs").organicTabs();

	// Single event slider
/*
	function hideAllInner() {
		$('.event-single-inner').each(function() {
			$(this).hide();
		});
	}
	
	hideAllInner();
*/
	
// On load show the first inner item
/* $('#feb-twelve :first-child').addClass('on').children('.event-single-inner').slideDown('slow'); */

/*
$('.event-single').click(function() {
	if($(this).children('.event-single-inner').is(":hidden")) {
		$(this).addClass('on').children('.event-single-inner').slideDown('fast');
	} else {
  	$(this).removeClass('on').children('.event-single-inner').slideUp('fast');
	}
});
*/
  
    
});