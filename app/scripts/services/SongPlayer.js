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
                stopSong(SongPlayer.currentSong);
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
         * @function stopSong
         * @desc stops currently playing song
         * @param {Object} song
         */
        var stopSong = function(song) {
          currentBuzzObject.stop();
          song.playing = null
        }

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
            stopSong(SongPlayer.currentSong)
          } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
          }
        };

        /**
        * @function .next
        * @desc changes currentSong to next song within object
        */
        SongPlayer.next = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;

          if (currentSongIndex >= currentAlbum.songs.length) {
            stopSong(SongPlayer.currentSong);
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
