/**
 * Theme: Zircos Admin Template
 * Author: Coderthemes
 * Real Estate Dashboard
 */

! function($) {
	"use strict";

	var RealEstateDashboard = function() {
		this.$body = $("body")
		this.$realData = []
	};

	//creates StackedBar Chart
	RealEstateDashboard.prototype.createStackBarGraph = function(selector, ticks, colors, data) {

		var options = {
			bars: {
				show: true,
				barWidth: 0.2,
				fill: 1
			},
			grid: {
				show: true,
				aboveData: false,
				labelMargin: 5,
				axisMargin: 0,
				borderWidth: 1,
				minBorderMargin: 5,
				clickable: true,
				hoverable: true,
				autoHighlight: false,
				mouseActiveRadius: 20,
				borderColor: '#f5f5f5'
			},
			series: {
				stack: 0
			},
			legend: {
				position: "ne",
				margin: [0, -24],
				noColumns: 0,
				labelBoxBorderColor: null,
				labelFormatter: function (label, series) {
					// just add some space to labes
					return '' + label + '&nbsp;&nbsp;';
				},
				width: 30,
				height: 2
			},
			yaxis: ticks.y,
			xaxis: ticks.x,
			colors: colors,
			tooltip: true, //activate tooltip
			tooltipOpts: {
				content: "%s : %y.0",
				shifts: {
					x: -30,
					y: -50
				}
			}
		};
		$.plot($(selector), data, options);
	},

	//initializing various charts and components
	RealEstateDashboard.prototype.init = function() {

		//bar chart = stacked
		var stack_ticks = {
			y: {
				axisLabel: "Sales Value (USD)",
				tickColor: '#f5f5f5',
				font: {
					color: '#bdbdbd'
				}
			},
			x: {
				axisLabel: "Last 10 Days",
				tickColor: '#f5f5f5',
				font: {
					color: '#bdbdbd'
				}
			}
		};

		//random data
		var d1 = [];
		for (var i = 0; i <= 10; i += 1)
			d1.push([i, parseInt(Math.random() * 30)]);

		var d2 = [];
		for (var i = 0; i <= 10; i += 1)
			d2.push([i, parseInt(Math.random() * 30)]);

		var d3 = [];
		for (var i = 0; i <= 10; i += 1)
			d3.push([i, parseInt(Math.random() * 30)]);

		var ds = new Array();

		ds.push({
			label: "Revenue",
			data: d1,
			bars: {
				order: 3
			}
		});
		ds.push({
			label: "Listed Properties",
			data: d2,
			bars: {
				order: 2
			}
		});
		ds.push({
			label: "User Registered",
			data: d3,
			bars: {
				order: 1
			}
		});
		this.createStackBarGraph("#ordered-bars-chart", stack_ticks, ['#26a69a', '#2abfcc', "#ebeff2"], ds);
	},

	//init RealEstateDashboard
	$.RealEstateDashboard = new RealEstateDashboard, $.RealEstateDashboard.Constructor =
	RealEstateDashboard

}(window.jQuery),

//initializing RealEstateDashboard
function($) {
	"use strict";
	$.RealEstateDashboard.init()
}(window.jQuery);