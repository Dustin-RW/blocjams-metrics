(function() {
  function Metrics($rootScope, SongPlayer) {
    $rootScope.songPlays = [];

    return {
      // Function that records a metric object by pushing it to the $rootScope array
      registerSongPlay: function(songObj) {
        //only record as a played song if the selected song is longer then 60 seconds
        if (SongPlayer.currentTime > 60) {
        // Add time to event register
          songObj['playedAt'] = new Date();
          $rootScope.songPlays.push(songObj);
          console.log($rootScope.songPlays);
          console.log($rootScope.songPlays.length);
        }
      },
      listSongsPlayed: function() {
        var songs = [];
        angular.forEach($rootScope.songPlays, function(song) {
            songs.push(song.title);
        });
        return songs;
      }
    };
  }

  angular
    .module('blocJams')
    .service('Metrics', ['$rootScope', 'SongPlayer', Metrics]);
})();
