/*
---

name: MooTools Bootstrap plugins

...
*/

(function(){

	// Slick pseudos
	Slick.definePseudo('visible', function(){
		return ((!this.offsetHeight && !this.offsetWidth) || this.style.display == 'none');
	});


	window.addEvent('domready', function(){

		// Global switch
		// @see  http://twitter.github.com/bootstrap/javascript.html
		var $body = document.id(document.body);

		$body.on = function(namespace) {
			this.store(namespace, true);

			return;
		}

		$body.off = function(namespace) {
			this.store(namespace, false);

			return;
		}
	});

}())

