const { expr } = require('cypress/types/jquery');

function onLoad() {
    console.log('script loaded');
    let express = require('express')
    let app = express()
}

window.onload = onLoad;