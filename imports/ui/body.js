import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated () {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.body.helpers({
  tasks(){
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If instance state has HideCompleted, filter out all the checked documents
      return Tasks.find({checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // El return all
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },

  incompleteTasks(){
    return Tasks.find({ checked: { $ne: true } }).count();
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
    Meteor.call('tasks.insert', text);

    // Clear the form
    target.text.value = '';
  },

  /**
   * Hide Completed Checkbox change handler
   */
  'change .hide-completed input'(event, templateInstance){
    templateInstance.state.set('hideCompleted', event.target.checked);
  }
});

