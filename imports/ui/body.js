import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './body.html';

Template.body.helpers({
  tasks(){
    return Tasks.find({});
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
      createdAt: new Date() // current device time
    });

    // Clear the form
    target.text.value = '';
  }
});