(function ($, $$) {

    module("bootstrap-buttons")

      test("should provide no conflict", function () {
        var button = Element.button.noConflict()
        ok(!Element.button, 'button was set back to undefined (org value)')
        Element.button = button
      })

      test("should be defined on jquery object", function () {
        ok($(document.body).button, 'button method is defined')
      })

      test("should return element", function () {
        ok($$(document.body).button()[0] == document.body, 'document.body returned')
      })

      test("should return set state to loading", function () {
        var btn = new Element('button.btn[data-loading-text="fat"][text="mdo"]')
        equals(btn.get('html'), 'mdo', 'btn txt rquals mdo')
        btn.button('loading')
        equals(btn.get('html'), 'fat', 'btn text equals fat')
        stop()
        setTimeout(function () {
          ok(btn.get('disabled'), 'btn is disabled')
          ok(btn.hasClass('disabled'), 'btn has disabled class')
          start()
        }, 0)
      })

      test("should return reset state", function () {
        var btn = new Element('button.btn[data-loading-text="fat"][text="mdo"]')
        equals(btn.get('html'), 'mdo', 'btn text equals mdo')
        btn.button('loading')
        equals(btn.get('html'), 'fat', 'btn text equals fat')
        setTimeout(function () {
          ok(btn.get('disabled'), 'btn is disabled')
          ok(btn.hasClass('disabled'), 'btn has disabled class')
          start()
          stop()
        }, 0)
        btn.button('reset')
        equals(btn.get('html'), 'mdo', 'btn text equals mdo')
        setTimeout(function () {
          ok(!btn.get('disabled'), 'btn is not disabled')
          ok(!btn.hasClass('disabled'), 'btn does not have disabled class')
          start()
        }, 0)
      })

      test("should toggle active", function () {
        var btn = new Element('button.btn[text="mdo"]')
        ok(!btn.hasClass('active'), 'btn does not have active class')
        btn.button('toggle')
        ok(btn.hasClass('active'), 'btn has class active')
      })

      test("should toggle active when btn children are clicked", function () {
        var btn = new Element('button.btn[data-toggle="button"][text="mdo"]')
          , inner = new Element('i')
        btn
          .grab(inner)
          .inject('qunit-fixture')
        ok(!btn.hasClass('active'), 'btn does not have active class')
        document.fireEvent('click', { target: inner, stopPropagation: function(){} })
        ok(btn.hasClass('active'), 'btn has class active')
      })


      test("should check for closest matching toggle", function () {
        var group = new Element('div[data-toggle="buttons-radio"]')
          , btn1  = new Element('button.btn.active')
          , btn2  = new Element('button.btn')
          , wrap  = new Element('div')

        wrap.adopt(btn1, btn2)

        group
          .grab(wrap)
          .inject('qunit-fixture')

        ok(btn1.hasClass('active'), 'btn1 has active class')
        ok(!btn2.hasClass('active'), 'btn2 does not have active class')
        document.fireEvent('click', { target: btn2 })
        ok(!btn1.hasClass('active'), 'btn1 does not have active class')
        ok(btn2.hasClass('active'), 'btn2 has active class')
      })

}(document.id, document.getElements))