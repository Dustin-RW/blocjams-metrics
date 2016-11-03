(function() {

  function AlbumCtrl(Fixtures, SongPlayer, Metrics) {
    this.albumData = Fixtures.getAlbum();
    this.songPlayer = SongPlayer; //holds the service and makes the service accessible within the Album View
    this.metric = Metrics;
  };

  angular
    .module('blocJams')
    .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', 'Metrics', AlbumCtrl]);

})();
