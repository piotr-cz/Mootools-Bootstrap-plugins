/* =============================================================
 * bootstrap-collapse.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;

 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = Object.extend({}, Element.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning || this.$element.hasClass('in')) return

      dimension = this.dimension()
      scroll = ['scroll', dimension].join('-').camelCase()
	  actives = this.$parent && this.$parent.getElements('> .accordion-group > .in')

	  if (actives && actives.length) {
	    hasData = actives.retrieve('collapse')
		if (hasData && hasData.transitioning) return
		actives.collapse('hide')
		hasData || actives.store('collapse', null)
	  }

	  this.$element.setStyle(dimension, 0)
// TODO
//	  this.transition('addClass', 
//      Browser.support.transition && this.$element[dimension](this.$element[scroll])
    }

  , hide: function () {
      var dimension
	  if (this.transitioning || !this.$element.hasClass('in')) return
	  dimension = this.dimension()
	  this.reset(this.$element[dimension]())
//	  TODO
//	  this.transition('removeClass', 
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

	  this.$element
	    .removeClass('collapse')
		[dimension](size || 'auto')
		[0].offsetWidth

	  this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

	  return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
	    , complete = function () {
		    if (startEvent.type == 'show') that.reset()
			that.transitioning = 0
			that.$element.fireEvent(completeEvent)
		  }

	  this.$element.trigger(startEvent)

//	  if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

	  this.$element[method]('in')

	  Browser.support.transition && this.$element.hasClass('collapse') ? 
	    this.$element.addEvent(Browser.support.transition.end + ':once', complete) :
		complete()

    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }
  }


  /* COLLAPSE PLUGIN DEFINITION
  * ========================== */ 

  var old = Element.collapse

  Element.implement('collapse', function( option ) {
    // Applies to single Element as well to Elements collection
	var $this = this
      , data = $this.retrieve('collapse')
      , options = Object.merge({}, Element.collapse.defaults, dataset($this), typeof option == 'object' && option)
    if (!data) $this.store('collapse', (data = new Collapse(this, options)))
    if (typeof option == 'string') data[option]()
  })

  Element.collapse.defaults = {
      toggle: true
  }

  Element.collapse.Contrstructor = Collapse


  /* COLLAPSE NO CONFLICT
  * ==================== */

  Element.collapse.noConflict = function () {
    Element.collapse = old
    return this
  }


  /* COLLAPSE DATA-API
  * ================= */
  $(document).addEvent('click:relay(".collapse.data-api")', function (e) {
    var $this = this, href
      , target = $this.get('data-target')
        || e.preventDefault()
        || (href = $this.get('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
      , option = $(target).retrieve('collapse') ? 'toggle' : dataset($this)
    $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed') // ???
    $(target).collapse(option)
  })

  // Helper. Relies on dataset support (IE8+)
  function dataset ($el) {
    var data = {};

    // jQuery auto typecast & camelcase (haha)
    for (var k in $el.dataset) {
      data[k.camelCase()] = (!isNaN($el.dataset[k]))
        ? Number($el.dataset[k])
        : $el.dataset[k]
      ;
    }

    return data;
  }

}(document.id, document.getElements);