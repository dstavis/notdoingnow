//Collection to store notdoing
Notdoing = new Meteor.Collection('notdoing');

if (Meteor.isClient) {
  Template.notdoing_list.helpers({
    notdoing: function(){
      return Notdoing.find()
    }
  })

  Template.notdoing_input.events({
    'submit form': function(event, template){
      event.preventDefault()
      var input = template.find('.add-notdoing')
      if (!input.value){ return false }
      Meteor.call('addNotdo', input.value)
      input.value = ''
    }
  })

  Template.notdoing_list.events({
    'click .done': function(){
      Meteor.call('updateNotdo', this._id, !this.completed)
    }
  })
}

if (Meteor.isServer) {
  Meteor.methods({
    addNotdo: function(title){
      Notdoing.insert({
        title: title,
        completed: false
      })
    },
    updateNotdo: function(id, value){
      Notdoing.update(id, {
        $set: {completed: value}
      })
    }
  })
}
