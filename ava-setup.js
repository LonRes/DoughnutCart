require('jsdom-global')()
require('babel-register')
require('babel-polyfill')

window.sessionStorage = {getItem() {}}
