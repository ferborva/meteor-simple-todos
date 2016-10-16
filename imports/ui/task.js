import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.html';

Template.task.events({
  /**
   * Toggle check Click event handler
   */
  'click .toggle-checked'() {
    Tasks.update(this._id, {
      $set: { checked: !this.checked }
    });
  },

  /**
   * Delete Click event handler
   */
  'click .delete'(){
    Tasks.remove(this._id);
  }
});