/* ============================================================
 * bootstrap-button.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
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


!function ($, $$) {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = Object.append({}, Element.prototype.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , attrName = 'data-' + state + '-text' // Mimic jQuery mixed storage
      , attrResetText = 'data-reset-text'
      , data = $el.getProperties(attrName, attrResetText)
      , val = $el.match('input') ? 'value' : 'html'

    state = state + 'Text'
    data[attrResetText] || $el.setProperty(attrResetText, $el.get(val))

    $el.set(val, data[attrName] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).setProperty(d, d) :
        $el.removeClass(d).removeProperty(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.getParent('[data-toggle="buttons-radio"]')

    $parent && $parent
      .getElements('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  var old = Element.prototype.button

  Element.implement('button', function (option) {
    var $this = $(this)
      , data = $this.retrieve('button')
      , options = typeof option == 'object' && option
    if (!data) $this.store('button', (data = new Button(this, options)))
    if (option == 'toggle') data.toggle()
    else if (option) data.setState(option)
    return $this
  })

  Element.prototype.button.defaults = {
    loadingText: 'loading...'
  }

  Element.prototype.button.Constructor = Button


 /* BUTTON NO CONFLICT
  * ================== */

  Element.button.noConflict = function () {
    Element.button = old
    return this
  }


 /* BUTTON DATA-API
  * =============== */

  $(document).addEvent('click:relay([data-toggle^="button"])', function (e) { // OR ~=
    if ($(document.body).retrieve('.button.data-api') === false) return
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.getParent('.btn')
    $btn.button('toggle')
  })

}(document.id, document.getElements);