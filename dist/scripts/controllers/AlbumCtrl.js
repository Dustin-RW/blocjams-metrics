(function() {

  function AlbumCtrl(Fixtures, SongPlayer) {
    this.albumData = Fixtures.getAlbum();
    this.songPlayer = SongPlayer; //holds the service and makes the service accessible within the Album View
  };

  angular
    .module('blocJams')
    .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);

})();
