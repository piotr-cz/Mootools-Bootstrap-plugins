(function($, $$){

    module("bootstrap-tabs")

      test("should provide no conflict", function () {
        var tab = Element.tab.noConflict()
        ok(!Element.tab, 'tab was set back to undefined (org value)')
        Element.tab = tab
      })

      test("should be defined on jquery object", function () {
        ok($(document.body).tab, 'tabs method is defined')
      })

      test("should return element", function () {
        ok($(document.body).tab() == document.body, 'document.body returned')
      })

      test("should activate element by tab id", function () {
        var $tabsHTML = new Element('ul.tabs', { html: 
            '<li><a href="#home">Home</a></li>'
          + '<li><a href="#profile">Profile</a></li>'
        })

        $("qunit-fixture").set('html', '<ul><li id="home"></li><li id="profile"></li></ul>')

        $tabsHTML.getElement('li:last-child a').tab('show')
        equals($("qunit-fixture").getElement('.active').get('id'), "profile")

        $tabsHTML.getElement('li:first-child a').tab('show')
        equals($("qunit-fixture").getElement('.active').get('id'), "home")
      })

      test("should activate element by tab id", function () {
        var $pillsHTML = new Element('ul.pills', { html:
            '<li><a href="#home">Home</a></li>'
          + '<li><a href="#profile">Profile</a></li>'
        })

        $("qunit-fixture").set('html' , '<ul><li id="home"></li><li id="profile"></li></ul>')

        $pillsHTML.getElement('li:last-child a').tab('show')
        equals($("qunit-fixture").getElement('.active').get('id'), "profile")

        $pillsHTML.getElement('li:first-child a').tab('show')
        equals($("qunit-fixture").getElement('.active').get('id'), "home")
      })

/* *
      // Note: not a good test (missing html structure)
      test("should not fire closed when close is prevented", function () {
        Browser.support.transition = false
        stop();

        new Element('div.tab')
          .addEvent('show', function (e) {
            e.preventDefault();
            ok(true);
            start();
          })
          .addEvent('shown', function() {
            ok(false);
          })
          .tab('show')
      })
/* */
      // @see  http://twitter.github.com/bootstrap/javascript.html#tabs
      // @note Related target is previous tab
      test("show and shown events should reference correct relatedTarget", function () {
        var $dropHTML = new Element('ul.drop', { html:
            '<li class="dropdown"><a data-toggle="dropdown" href="#">1</a>' // This is being selected
            + '<ul class="dropdown-menu">'
              + '<li><a href="#1-1" data-toggle="tab">1-1</a></li>' // Instead of this as relatedTarget
              + '<li><a href="#1-2" data-toggle="tab">1-2</a></li>'
            + '</ul>'
          + '</li>'
        })

        // Test
        $("qunit-fixture2").grab($dropHTML);

        // Need to create content for tabs target
        $("qunit-fixture3").set('html',
            '<div class="tab-content">'
            + '<div id="1-1" class="tab-pane">content 1-1</div>'
            + '<div id="1-2" class="tab-pane">content 1-2</div>'
          + '</div>'
        )

        $dropHTML.getElement('ul>li:first-child a').tab('show')

        $dropHTML.getElement('ul>li:last-child a')
          .addEvent('show', function(event){
            equals(event.relatedTarget.hash, "#1-1")
          })
          .addEvent('shown', function(event){
            equals(event.relatedTarget.hash, "#1-1")
          })
          .tab('show')

      })

})(document.id, document.getElements);