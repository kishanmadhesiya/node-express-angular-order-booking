
/**
* Theme: Zircos Admin Template
* Author: Coderthemes
* Blog Dashboard
*/

!function($) {
    "use strict";

    var BlogDashboard = function() {};


    //creates Stacked chart
    BlogDashboard.prototype.createStackedChart  = function(element, data, xkey, ykeys, labels, lineColors) {
        Morris.Bar({
            element: element,
            data: data,
            xkey: xkey,
            ykeys: ykeys,
            stacked: true,
            labels: labels,
            hideHover: 'auto',
            barSizeRatio: 0.5,
            resize: true, //defaulted to true
            gridLineColor: '#eeeeee',
            barColors: lineColors
        });
    },
    BlogDashboard.prototype.init = function() {

        //creating Stacked chart
        var $stckedData  = [
            { y: 'Jan', a: 45, b: 140 },
            { y: 'Feb', a: 75,  b: 65 },
            { y: 'Mar', a: 100, b: 90 },
            { y: 'Apr', a: 75,  b: 65 },
            { y: 'May', a: 100, b: 90 },
            { y: 'Jun', a: 75,  b: 65 },
            { y: 'Jul', a: 50,  b: 40 },
            { y: 'Aug', a: 75,  b: 65 },
            { y: 'Sep', a: 50,  b: 40 },
            { y: 'Oct', a: 75,  b: 65 },
            { y: 'Nov', a: 100, b: 90},
            { y: 'Dec', a: 70, b: 52 }
        ];
        this.createStackedChart('morris-bar-stacked', $stckedData, 'y', ['a', 'b'], ['Page Views', 'Visitors'], ['#26a69a', '#ebeff2']);

    },
    //init
    $.BlogDashboard = new BlogDashboard, $.BlogDashboard.Constructor = BlogDashboard
}(window.jQuery),

//initializing
function($) {
    "use strict";
    $.BlogDashboard.init();
}(window.jQuery);


! function($) {
	"use strict";

	var VectorMap = function() {
	};

	VectorMap.prototype.init = function() {
		//various examples
		$('#world-map-markers').vectorMap({
			map : 'world_mill_en',
			scaleColors : ['#4bd396', '#4bd396'],
			normalizeFunction : 'polynomial',
			hoverOpacity : 0.7,
			hoverColor : false,
			regionStyle : {
				initial : {
					fill : '#3ac9d6'
				}
			},
			 markerStyle: {
                initial: {
                    r: 9,
                    'fill': '#f5707a',
                    'fill-opacity': 0.9,
                    'stroke': '#fff',
                    'stroke-width' : 7,
                    'stroke-opacity': 0.4
                },

                hover: {
                    'stroke': '#fff',
                    'fill-opacity': 1,
                    'stroke-width': 1.5
                }
            },
			backgroundColor : 'transparent',
			markers : [{
				latLng : [41.90, 12.45],
				name : 'Vatican City'
			}, {
				latLng : [43.73, 7.41],
				name : 'Monaco'
			}, {
				latLng : [15.3, -61.38],
				name : 'Dominica'
			}, {
				latLng : [-20.2, 57.5],
				name : 'Mauritius'
			}, {
				latLng : [26.02, 50.55],
				name : 'Bahrain'
			}, {
				latLng : [0.33, 6.73],
				name : 'SÃ£o TomÃ© and PrÃ­ncipe'
			}]
		});
	},
	//init
	$.VectorMap = new VectorMap, $.VectorMap.Constructor =
	VectorMap
}(window.jQuery),

//initializing
function($) {
	"use strict";
	$.VectorMap.init()
}(window.jQuery);