import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId }
      ]
    });
  });
}

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    // Make sure the user is logged in
    if (!this.userId) {
      // On server
      throw new Meteor.Error(403, 'Not Authorized');
    }

    Tasks.insert({
      text, 
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username
    });
  },

  'tasks.remove'(taskId){
    check(taskId, String);

    const task = Tasks.findOne(taskId);
    if (task.owner !== this.userId) {
      throw new Meteor.Error(403, 'Not Authorized');
    }

    Tasks.remove(taskId);
  },

  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      throw new Meteor.Error(403, 'Not Authorized');
    }

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },

  'tasks.setPrivate'(taskId, setPrivate) {
    check(taskId, String);
    check(setPrivate, Boolean);

    const task = Tasks.findOne(taskId);

    if (task.private && task.owner !== this.userId) {
      // On server
      throw new Meteor.Error(403, 'Not Authorized');
    }

    Tasks.update(taskId, { $set: { private: setPrivate } });
  }
});