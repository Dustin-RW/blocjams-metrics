(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};

        /**
        * @desc grabs Album object from Fixtures
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();

        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        };

        /**
         * @function playSong
         * @desc plays current audioUrl, sets currently playing song to true
         * @param {Object} song
         */
        var playSong = function(song) {
          currentBuzzObject.play();
          song.playing = true;
        };

        /**
        * @function .getSongIndex
        * @desc returns the current song number
        * @param {Object} song
        */
        var getSongIndex = function(song) {
          return currentAlbum.songs.indexOf(song);
        }

        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /**
         * @function .play
         * @desc plays new or paused song
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
            console.log(song);
            playSong(song);
        };

        /**
         * @function .pause
         * @desc pauses song if currently playing
         * @param {Object} song
         */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        }

        /**
        * @function .previous
        * @desc changes current song being played by subtracting 1
        */
        SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;

          if (currentSongIndex < 0) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null
          } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
          }
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);

})();