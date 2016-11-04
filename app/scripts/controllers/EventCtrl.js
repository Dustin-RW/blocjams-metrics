(function() {

        function EventCtrl(Metrics) {
            this.options = {
                chart: {
                    type: 'pieChart',
                    height: 500,
                    x: function(d) {
                        return d.key;
                    },
                    y: function(d) {
                        return d.y;
                    },
                    showLabels: true,
                    duration: 500,
                    labelThreshold: 0.01,
                    labelSunbeamLayout: true,
                    legend: {
                        margin: {
                            top: 5,
                            right: 35,
                            bottom: 5,
                            left: 0
                        }
                    }
                }
            };

            this.data = Metrics.listSongsPlayed();
        }


    angular
    .module('blocJams')
    .controller('EventCtrl', ['Metrics', EventCtrl]);
}());
