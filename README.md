# MooTools Bootstrap plugins
**Proof of concept**

[Twitter Bootstrap](http://twitter.github.com/bootstrap) Javascript components rewritten to use [Mootools](http://mootools.com) 1.4.5.

Code style follows [Bootstrap Code guide](https://github.com/mdo/code-guide#javascript-generated%20markup) for easy diffs of origin commits

At the moment following components and unit tests are available:

| Plugin      | Base prepared | Tested by human | mooboo |
| ----------- |:-------------:|:---------------:|:------:|
| Transitions | x             |                 | [x](https://github.com/GPTechnologySolutions/mooboo/blob/development/js/bootstrap-transition.js) |
| Modal       |               |                 | [x[(https://github.com/GPTechnologySolutions/mooboo/blob/development/js/bootstrap-modal.js)      |
| Dropdown    | x             |                 | [x](https://github.com/GPTechnologySolutions/mooboo/blob/development/js/bootstrap-dropdown.js)   |
| ScrollSpy   | x             |                 | [-](https://github.com/GPTechnologySolutions/mooboo/blob/development/js/bootstrap-scrollspy.js)  |
| Tab         | x             | x               | [x](https://github.com/darrennolan/mooboo/commit/410490e61459a1f61916ca5050e9ab03785feb95)       |
| Tooltip     |               |                 | [x](https://github.com/GPTechnologySolutions/mooboo/blob/development/js/bootstrap-tooltip.js)    |
| Popover     |               |                 | [x](https://github.com/GPTechnologySolutions/mooboo/blob/development/js/bootstrap-popover.js)    |
| Alert       | x             |                 | [x](https://github.com/GPTechnologySolutions/mooboo/blob/development/js/bootstrap-alert.js)      |
| Button      | x             |                 | [-](https://github.com/GPTechnologySolutions/mooboo/blob/development/js/bootstrap-button.js)     |
| Collapse    |               |                 | [-](https://github.com/GPTechnologySolutions/mooboo/blob/development/js/bootstrap-collapse.js)   |
| Carousel    | x             | x               | [-](https://github.com/GPTechnologySolutions/mooboo/blob/development/js/bootstrap-carousel.js)   |
| Typeahead   |               |                 | [x](https://github.com/darrennolan/mooboo/commit/1ab9b15279c5b85767415c6436c8aefcf9f12a6b)       |
| Affix       | x             |                 | -
|             |               |                 | [togleButtons](https://github.com/GPTechnologySolutions/mooboo/blob/development/js/bootstrap-togglebuttons.js) |


## Quick start

- By hand

  + Download latest [Twitter Bootstrap](https://github.com/twitter/bootstrap/tags)
  + Replace [`/js`](https://github.com/twitter/bootstrap/tree/master/js) folder with this Repository's `/js` folder
  + Load `environment.js` before other components

- Using `build.php`

  + open build.php in your browser, which createst bootstrap.js file


## Motivation

To evaluate possibilities of using Mootools in Bootstrap with minimum repo maintenance efforts and a drop-in installation.


## TODO
Namespaced event delegation


## Thanks
- [Twitter Bootstrap](https://github.com/twitter/bootstrap/)
- [Mootools-Bootstrap](https://github.com/anutron/mootools-bootstrap/)
- [Dojo-Bootstrap](https://github.com/xsokev/Dojo-Bootstrap)
