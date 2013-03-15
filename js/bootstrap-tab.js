/* ========================================================
 * bootstrap-tab.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
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
 * ======================================================== */


!function ($, $$) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = element
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {


      var $this = this.element
        , $ul = $this.match('ul:not(.dropdown-menu)') ? $this : $this.getParent('ul:not(.dropdown-menu)')
        , selector = $this.get('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.get('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      // Problem: cannot test document fragment (no parent)
      if ($this.getParent('li').hasClass('active')) return

      previous = $ul.getLast('.active a');

      // Simple custom event
      e = {
        relatedTarget: previous
      , target: $this
      , preventDefault: function(){ this.isDefaultPrevented = true }
      }

      // Create & Fire new Event
      $this.fireEvent('show', e, 1) // when no delay, elements get mixed around

      if (e.isDefaultPrevented) return; // No access to event

      $target = document.getElement(selector);
      if (!$target) throw ('cannot find related target');

      this.activate($this.getParent('li'), $ul)
      this.activate($target, $target.getParent(), function() {
        $this.fireEvent('shown', e, 1)
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.getElements('> .active')
        , transition = callback
            && Browser.support.transition
            && container.getElements('> .active.fade').length

      function next() {

        // V1: Reversed order
/* */
        container.getElements('> .active .dropdown-menu > .active')
          .removeClass('active')
        $active
          .removeClass('active')
/* *
        // V2
        $active
            .removeClass('active')
            .each(function($sublevel){ $sublevel.getElements('> .dropdown-menu > .active')
              .removeClass('active') })
*/
        element.addClass('active');

        if (transition) {
          element.offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.getParent('.dropdown-menu') ) {
          element.getParent('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.addEvent(Browser.support.transition.end + ':once', next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  var old = Element.tab

  Element.implement('tab', function ( option ) {
    // Applies to single Element as well to Elements collection
      var $this = this
        , data = $this.retrieve('tab')
      if (!data) $this.store('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
      return $this
  })

  Element.prototype.tab.Constructor = Tab


 /* TAB NO CONFLICT
  * =============== */

  Element.tab.noConflict = function () {
    Element.tab = old
    return this
  }


 /* TAB DATA-API
  * ============ */

  $(document).addEvent('click:relay([data-toggle="tab"], [data-toggle="pill"])', function(e) {
    if ($(document.body).retrieve('.tab.data-api') === false) return
    e.preventDefault()
    $(this).tab('show')
  })

}(document.id, document.getElements);