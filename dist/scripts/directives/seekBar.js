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
      replace: true, //specifies what the template should replace.  If "true," the template replaces the directives element.  If "false," the template replaces the content of the directives element
      restrict: 'E', //Restricts the directive to a specefic declaration style (ie element = 'E')
      scope: { //specifies that a new scope be create for the directive
        onChange: '&' //'&' = type of directive scope binding. (The 3 types are @, =, and &)
      },
      link: function(scope, element, attributes) { //link: responsible for the registering DOM listeners and updating the DOM.  This is where we put most of our directive logic
        //directives here
        scope.value = 0;
        scope.max = 100;

        var seekBar = $(element); //holds the element that matches the directive as a jQuery object so we can call jQuery methods on it

        attributes.$observe('value', function(newValue) {
          scope.value = newValue;
        })

        attributes.$observe('max', function(newValue) {
          scope.max = newValue
        });

        var percentString = function() {
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;
          return percent + "%";
        };

        scope.fillStyle = function() {
          return {width: percentString()};
        };

        scope.thumbStyle = function() {
          return {left: percentString()};
        };

        scope.onClickSeekBar = function(event) {
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
          notifyOnChange(scope.value);
        };

        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event) {
            var percent = calculatePercent(seekBar, event);
            scope.$apply(function() {  //$apply constantly applys the change in value of scope.value as the user drags the seek bar thumb
              scope.value = percent * scope.max;
              notifyOnChange(scope.value);
            });

            $document.unbind('mousemove.thumb');
            $document.unbind('mouseup.thumb');
          });
        };

        var notifyOnChange = function(newValue) {
          if (typeof scope.onChange === 'function') { //If a future developer fails to pass a function to the on-change attribute in the HTML, the next line will not be reached, and no error will be thrown
            scope.onChange({value: newValue}); //scope.onChange() calls the function in the attribute.  We pass the HTML argument 'value'.
          }
        };
      }
    };
  }

  angular
    .module('blocJams')
    .directive('seekBar', ['$document', seekBar]);

})();
