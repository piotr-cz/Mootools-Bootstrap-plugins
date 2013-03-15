(function ($, $$) {

    module("bootstrap-affix")

      test("should provide no conflict", function () {
        var affix = Element.affix.noConflict()
        ok(!Element.affix, 'affix was set back to undefined (org value)')
        Element.affix = affix
      })

      test("should be defined on jquery object", function () {
        ok($(document.body).affix, 'affix method is defined')
      })

      test("should return element", function () {
        ok($(document.body).affix() == document.body, 'document.body returned')
      })

      test("should exit early if element is not visible", function () {
        var $affix = new Element('div', { styles: { display: 'none' }}).affix()
        $affix.retrieve('affix').checkPosition()
        ok(!$affix.hasClass('affix'), 'affix class was not added')
      })

}(document.id, document.getElements))