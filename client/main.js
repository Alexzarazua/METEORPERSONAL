import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

Template.tweetBox.onRendered(function () {
  Session.set('numChars', 0);
});

Template.tweetBox.events({
  'input #tweetText': function(){
    Session.set('numChars', $('#tweetText').val().length);

  }
});

Template.tweetBox.helpers({
  charCount: function() {
    return 140 - Session.get('numChars');
  },

  charClass: function() {
    if (Session.get('numChars') > 140) {
      return 'errCharCount';    //css class name
    } else {
      return 'charCount';       //css class name
    }
  },

  disableButton: function() {
    if (Session.get('numChars') <= 0 ||
        Session.get('numChars') > 140) {
      return 'disabled';
    }
  }
});
