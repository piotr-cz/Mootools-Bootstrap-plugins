/* ==========================================================
 * bootstrap-affix.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#affix
 * ==========================================================
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
 * ========================================================== */


!function ($, $$) {

  "use strict"; // jshint ;_;


 /* AFFIX CLASS DEFINITION
  * ====================== */

  var Affix = function (element, options) {
    var self = this

    this.options = Object.append({}, Element.prototype.affix.defaults, options)
    this.$window = $(window)
      .addEvent('scroll', function(){ self.checkPosition.apply(self, arguments) })
      .addEvent('click', function(){ setTimeout( self.checkPosition.apply(self, arguments), 1) })
    this.$element = $(element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if ((!this.$element.offsetHeight && !this.$element.offsetWidth) || this.$element.style.display == 'none') return

    var scrollHeight = $(document).getSize().y
      , scrollTop = this.$window.getScroll().y
      , position = this.$element.getPosition() // {x,y}
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.y + this.$element.getSize().y >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.y - scrollTop : null

    this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
  }


 /* AFFIX PLUGIN DEFINITION
  * ======================= */

  var old = Element.prototype.affix

  Element.implement('affix', function (option) {
    var $this = $(this)
      , data = $this.retrieve('affix')
      , options = typeof option == 'object' && option
    if (!data) $this.store('affix', (data = new Affix(this, options)))
    if (typeof option == 'string') data[option]()
    return $this
  })

  Element.prototype.affix.Constructor = Affix

  Element.prototype.affix.defaults = {
    offset: 0
  }


 /* AFFIX NO CONFLICT
  * ================= */

  Element.affix.noConflict = function () {
    Element.affix = old
    return this
  }


 /* AFFIX DATA-API
  * ============== */

  window.addEvent('load', function () {
    document.getElements('[data-spy="affix"]').each(function () {
      var $spy = $(this)
        , rawdata = $spy.getProperties('data-offset', 'data-offset-bottom', 'data-offset-top')
        , data = {}

      data.offset = rawdata['data-offset'] || {}
      rawdata['data-offset-bottom'] && (data.offset.bottom = rawdata['data-offset-bottom'])
      rawdata['data-offset-top'] && (data.offset.top = rawdata['data-offset-top'])

      $spy.affix(data)
    })
  })


}(document.id, document.getElements);