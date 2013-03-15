/*
!function(dollar){

	// Backup old thingy
	var backup = dollar;

	dollar = function (arg)
	{
		if (typeof arg === 'function')
		{
			window.addEvent ('domready', arg);
		}
		else
		{
			backup (arg);
		}

		return;
	}
}($);
*/


(function () {

    module("bootstrap-transition")

      test("should be defined on Browser support object", function () {
        ok(Browser.support.transition !== undefined, 'transition object is defined')
      })

      test("should provide an end object", function () {
        ok(Browser.support.transition ? Browser.support.transition.end : true, 'end string is defined')
      })

}());