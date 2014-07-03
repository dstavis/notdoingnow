//Collection to store notdoing
Notdoing = new Meteor.Collection('notdoing');

if (Meteor.isClient) {
  Template.notdoing_list.helpers({
    notdoing: function(){
      return Notdoing.find()
    },
    notDoingAttributes: function(){
      if (this.completed){
        return {checked: true}
      }
      else{
        return {}
      }
    },
    notDoingCount: function(){
      return Notdoing.find({completed: false}).count()
    }
  })

  Template.notdoing_input.events({
    'submit form': function(event, template){
      event.preventDefault()
      var input = template.find('.add-notdoing')
      if (!input.value){ return false }
      Meteor.call('addNotdoing', input.value)
      input.value = ''
    }
  })

  Template.notdoing_list.events({
    'click .done': function(){
      Meteor.call('updateNotdoing', this._id, !this.completed)
    }
  })
}

if (Meteor.isServer) {
  Meteor.methods({
    addNotdoing: function(title){
      Notdoing.insert({
        title: title,
        completed: false
      })
    },
    updateNotdoing: function(id, value){
      Notdoing.update(id, {
        $set: {completed: value}
      })
    }
  })
}
