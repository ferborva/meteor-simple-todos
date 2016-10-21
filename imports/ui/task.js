import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './task.html';

Template.task.events({
  /**
   * Toggle check Click event handler
   */
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this._id, !this.checked);
  },

  /**
   * Delete Click event handler
   */
  'click .delete'(){
    Meteor.call('tasks.remove', this._id);
  },

  /**
   * Toggle task privacy
   */
  'click .toggle-private'(){
    Meteor.call('tasks.setPrivate', this._id, !this.private);
  }
});

Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  }
});