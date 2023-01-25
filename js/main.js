import App from './app.js';

const date = document.querySelector('h2');
const list = document.querySelector('ul');
const button = document.querySelectorAll('button');
const form = document.querySelector('form');
const input = document.querySelector('input');
const img = document.querySelector('img');

const tags = { date, list, button, form, input, img };

const application = new App(tags);
