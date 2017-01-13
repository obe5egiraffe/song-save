songsList = new Mongo.Collection('songs');
notesList = new Mongo.Collection('notes');

if (Meteor.isClient) {
  Template.songList.helpers({
    'song': function(){
      return songsList.find({}, {sort: {title: 1} })
    },
    'note': function(){
      return notesList.find({});
    },
    'selected': function(){
      var songId = this._id;
      var selectedSong = Session.get('selectedSong');
      if(songId == selectedSong){
        return 'select'
      }
    }
  });

  Template.songList.events({
    'click .song': function(){
      var songId = this._id;
      Session.set('selectedSong', songId);
      var selectedSong = Session.get('selectedSong');
    },
    'click .note': function(){
      var noteName = this.name;
      var selectedSong = Session.get('selectedSong');
      //console.log(noteName);
      songsList.update(selectedSong, {$push: {notes: noteName}});
    },
    'click #clearNotes': function(){
      var selectedSong = Session.get('selectedSong');
      songsList.update(selectedSong, { $set: {notes: [] } });
    },
    'click #removeSong': function(){
      var selectedSong = Session.get('selectedSong');
      songsList.remove(selectedSong);
    }
  });
  Template.addSongForm.events({
    'submit form': function(event){
      event.preventDefault();
      var songNameVar = event.target.songName.value;
      songsList.insert({
        title: songNameVar,
        notes: []
      });
      event.target.songName.value = '';
    }
  }); 

}

if (Meteor.isServer) {
  
}
