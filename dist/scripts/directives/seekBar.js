(function() {
  function seekBar($document) {
    var calculatePercent = function(seekBar, event) {
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;
    };

    return {
      templateUrl: '/templates/directives/seek_bar.html', //specifies a URL from which the directive will load a template
      replace: true, //specifies what the template should replace.  If "true," the template replaces the directives element.  If "false," the template replaces the content of the direcgives element
      restrict: 'E', //Restricts the directive to a specefic declaration style (ie element = 'E')
      scope: { }, //specifies that a new scope be create for the directive
      link: function(scope, element, attributes) { //link: responsible for the registering DOM listeners and updating the DOM.  This is where we put most of our directive logic
        //directives here
        scope.value = 0;
        scope.max = 100;

        var seekBar = $(element);

        var percentString = function() {
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;
          return percent + "%";
        };

        scope.fillStyle = function() {
          return {width: percentString()};
        };

        scope.onClickSeekBar = function(event) {
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
        };

        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event) {
            var percent = calculatePercent(seekBar, event);
            scope.$apply(function() {  //$apply constantly applys the change in value of scope.value as the user drags the seek bar thumb
              scope.value = percent * scope.max;
            });

            $document.unbind('mousemove.thumb');
            $document.unbind('mouseup.thumb');
          });
        };
      }
    };
  }

  angular
    .module('blocJams')
    .directive('seekBar', ['$document', seekBar]);

})();
