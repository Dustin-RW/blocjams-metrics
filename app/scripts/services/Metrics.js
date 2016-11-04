(function() {
  function Metrics($rootScope, SongPlayer) {
    $rootScope.songPlays = {};

    return {
      // Function that records a metric object by pushing it to the $rootScope array
      registerSongPlay: function(songObj) {
        //only record as a played song if the selected song is longer then 60 seconds
          songObj['playedAt'] = new Date();

          if (!$rootScope.songPlays[songObj.title]) {
            $rootScope.songPlays[songObj.title] = 0;
          }

          $rootScope.songPlays[songObj.title]++;


      },
      listSongsPlayed: function() {

        var songs = [];
        for (var title in $rootScope.songPlays) {
          songs.push({
            key: title,
            y: $rootScope.songPlays[title]
          });
        }

        return songs;
      }
    };
  }

  angular
    .module('blocJams')
    .service('Metrics', ['$rootScope', 'SongPlayer', Metrics]);
})();
