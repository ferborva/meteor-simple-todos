import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.boyd.onCreated(function bodyOnCreated () {
  this.state = new ReactiveDict();
});

Template.body.helpers({
  tasks(){
    return Tasks.find({}, { sort: { createdAt: -1 } });
  }
});

Template.body.events({
  'submit .new-taks'(event) {
    // Prevent default submission action
    event.preventDefault();

    // Get values from the form
    const target = event.target;
    const text = target.text.value;

    // Insert taks into local collection
    Tasks.insert({
      text,
      checked: false,
      createdAt: new Date() // current device time
    });

    // Clear the form
    target.text.value = '';
  }
});