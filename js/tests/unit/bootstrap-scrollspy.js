(function ($, $$) {

    module("bootstrap-scrollspy")

      test("should provide no conflict", function () {
        var scrollspy = Element.scrollspy.noConflict()
        ok(!Element.scrollspy, 'scrollspy was set back to undefined (org value)')
        Element.scrollspy = scrollspy
      })

      test("should be defined on jquery object", function () {
        ok($(document.body).scrollspy, 'scrollspy method is defined')
      })

      test("should return element", function () {
        ok($(document.body).scrollspy() == document.body, 'document.body returned')
      })

      test("should switch active class on scroll", function () {
        var $sectionHTML = new Element('div#masthead')
          , $section = $sectionHTML.inject('qunit-fixture')
          , $topbarHTML = new Element('div.topbar', { html:
            '<div class="topbar-inner">'
          + '<div class="container">'
          + '<h3><a href="#">Bootstrap</a></h3>'
          + '<ul class="nav">'
          + '<li><a href="#masthead">Overview</a></li>'
          + '</ul>'
          + '</div>'
          + '</div>'
		    }).inject('qunit-fixture')
			// Problem solved: won't work because not attached to body.
          , $topbar = $topbarHTML.scrollspy()
        ok($topbar.getElement('.active'))
      })

}(document.id, document.getElements))