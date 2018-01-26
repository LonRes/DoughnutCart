require('jsdom-global')()
require('babel-register')

window.sessionStorage = {getItem() {}}
