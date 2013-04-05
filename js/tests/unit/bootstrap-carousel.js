(function ($, $$) {

	/**
	 * @var     Object   Mock Event object
	 */
	var testEvent = {
		preventDefault		: function(){ this.preventedDefault = true },
		isDefaultPrevented	: function(){ return !!this.preventedDefault },
		stopPropagation		: function(){}
	}

	/**
	 * Helper for testing MooTools deletaged events
	 *
	 * @param   String   type
	 * @param   Element  $target
	 *
	 * @return  Element  To allow chaining
	 */
	function fireDelegated(type, $target, $base) {
		if (!$base) {
			$base = $(document)
		}

		$base.fireEvent( type, Object.merge({ target: $target }, testEvent));

		return $target;
	}


    module("bootstap-carousel")

      test("should provide no conflict", function () {
        var carousel = Element.carousel.noConflict()
        ok(!Element.carousel, 'carousel was set back to undefined (org value)')
        Element.carousel = carousel
      })

      test("should be defined on jquery object", function () {
        ok($(document.body).carousel, 'carousel method is defined')
      })

	  test("should return element", function () {
        ok($(document.body).carousel() == document.body, 'document.body returned')
      })

/*
	  // Problem: False positives
      test("should not fire sliden when slide is prevented", function () {
        Browser.support.transition = false
        stop();
        new Element('div.carousel')
          .addEvent('slide', function(e) {
		    // Problem here
            e.preventDefault();
            ok(true);
            start();
          })
          .addEvent('slid', function () {
            ok(false);
          })
          .carousel('next')
      });
/* */

      test("should fire slide event with direction", function () {
        var $template = new Element('div#myCarousel.carousel.slide', { html: '<div class="carousel-inner"><div class="item active"><img alt=""><div class="carousel-caption"><h4>{{_i}}First Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="item"><img alt=""><div class="carousel-caption"><h4>{{_i}}Second Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div><div class="item"><img alt=""><div class="carousel-caption"><h4>{{_i}}Third Thumbnail label{{/i}}</h4><p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p></div></div></div><a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a><a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a>'})
		Browser.support.transition = false;
		stop();
		$template.addEvent('slide', function (e) {
          e.preventDefault();
		  ok(e.direction)
		  ok(e.direction === 'right' || e.direction === 'left')
		  start()
		}).carousel('next')
      })

      test("should set interval from data attribute", 3,function () {
		var $template = new Element('div#myCarousel.carousel.slide', { html : '<div class="carousel-inner"> <div class="item active"> <img alt=""> <div class="carousel-caption"> <h4>{{_i}}First Thumbnail label{{/i}}</h4> <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p> </div> </div> <div class="item"> <img alt=""> <div class="carousel-caption"> <h4>{{_i}}Second Thumbnail label{{/i}}</h4> <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p> </div> </div> <div class="item"> <img alt=""> <div class="carousel-caption"> <h4>{{_i}}Third Thumbnail label{{/i}}</h4> <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p> </div> </div> </div> <a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a> <a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a>' });
		$template.set("data-interval", 1814);

		$template.inject($(document.body));
		fireDelegated('click', $$('[data-slide]')[0]);
		ok($('myCarousel').retrieve('carousel').options.interval == 1814);
		$('myCarousel').dispose();

		$template.inject($(document.body)).set("data-modal", "foobar");
		fireDelegated('click', $$('[data-slide]')[0]);
		ok($('myCarousel').retrieve('carousel').options.interval == 1814, "even in there is an data-modal attribute set");
		$('myCarousel').dispose();

		$template.inject($(document.body));
		fireDelegated('click', $$('[data-slide]')[0]);
		$('myCarousel').set('data-interval', 1860);
		fireDelegated('click', $$('[data-slide]')[0]);
		ok($('myCarousel').retrieve('carousel').options.interval == 1814, "attributes should be read only on intitialization");
		$('myCarousel').dispose();
	  })

}(document.id, document.getElements))