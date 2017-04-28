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

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Template.chatItems.entradas = function () {
  return chat.find({}, {sort: {timestamp: -1}, limit: 10});
};

Template.inicio.events({
	"keyup #texto": function (evt, tpl) {
		if (evt.ctrlKey && evt.keyCode == 13) {
			$("#texto").val($("#texto").val()+"\n");
		} else if (evt.keyCode == 13) {
			var val=$("#texto").val();
			if (val.trim().length==0) {
				$("#texto").val("");
        return;
      }
			val = val.replace(/(\r\n|\n|\r)/gm,"<br/>");
			Meteor.call('enviarTexto',Meteor.user().username,val,
				function (error, result) {
					if (error) {
						console.log(error);
					}
				}
			);
			$("#texto").val("");
		}
	}
});
