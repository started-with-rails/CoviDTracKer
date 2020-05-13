import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import covid19indiadays from '../apis/covid19indiadays';

(function(H) {
    H.Pointer.prototype.reset = function() {
      return undefined;
    };
  
    /**
     * Highlight a point by showing tooltip, setting hover state and draw crosshair
     */
    H.Point.prototype.highlight = function(event) {
      event = this.series.chart.pointer.normalize(event);
      this.onMouseOver(); // Show the hover marker
      //this.series.chart.tooltip.refresh(this); // Show the tooltip
      this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
    };
  
    H.syncExtremes = function(e) {
      var thisChart = this.chart;
  
      if (e.trigger !== "syncExtremes") {
        // Prevent feedback loop
        Highcharts.each(Highcharts.charts, function(chart) {
          if (chart && chart !== thisChart) {
            if (chart.xAxis[0].setExtremes) {
              // It is null while updating
              chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
                trigger: "syncExtremes"
              });
            }
          }
        });
      }
    };
  })(Highcharts);

class CasesTimeSeries extends React.Component {
    state = {
        mapOptions1: {},
        mapOptions2: {},
        mapOptions3: {},
        show: false
    };
    async componentDidMount() {
        const response = await covid19indiadays.get('data.json');
        const cases_time_series = response.data.cases_time_series.reverse().slice(0, 30).reverse();
        var totalconfirmed = [];
        var totaldeceased = [];
        var totalrecovered = [];
        var categories = [];
        console.log(cases_time_series);
        Object.keys(cases_time_series).map(function(keyName, keyIndex) {
            categories.push(cases_time_series[keyName]['date'])
            totalconfirmed.push(parseInt(cases_time_series[keyName]['totalconfirmed']))
            totaldeceased.push(parseInt(cases_time_series[keyName]['totaldeceased']))
            totalrecovered.push(parseInt(cases_time_series[keyName]['totalrecovered']))
        })
        var series1 = [{
            name: 'Active Cases',
            data: totalconfirmed
        }];
        var series2 = [{
            name: 'Recovered Cases',
            data: totalrecovered
        }];
        var series3 = [{
            name: 'Deaths',
            data: totaldeceased
        }];

        const mapOptions1 = {
            

            colors: ['#2f7ed8'],
            title: {
                text: 'India Covid-19 Cases Report Last 30 Days'
            },
        
            yAxis: {
                title: {
                    text: 'Cases'
                }
            },
        
            xAxis: {
                categories: categories
            },
        
             legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            },
        
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
        
            series: series1
        }
        const mapOptions2 = {
           
            title: {
                text: ''
            },
        
            colors: ['#8bbc21'],
        
            yAxis: {
                title: {
                    text: 'Cases'
                }
            },
        
            xAxis: {
                categories: categories
            },
        
             legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            },
        
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
        
            series: series2
        }
        const mapOptions3 = {
          

            colors: ['#ff3300'],
            title: {
                text: ''
            },
        
            yAxis: {
                title: {
                    text: 'Cases'
                }
            },
        
            xAxis: {
                categories: categories
            },
        
             legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            },
        
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
        
            series: series3
        }
       
        if(cases_time_series){
            this.setState({mapOptions1: mapOptions1,mapOptions2: mapOptions2,mapOptions3: mapOptions3,show: true});
            ["mousemove", "touchmove", "touchstart"].forEach(function(eventType) {
                document
                  .getElementById("container")
                  .addEventListener(eventType, function(e) {
                    var chart, point, i, event;
          
                    for (i = 0; i < Highcharts.charts.length; i = i + 1) {
                      chart = Highcharts.charts[i];
                      if (chart) {
                        // Find coordinates within the chart
                        event = chart.pointer.normalize(e);
                        // Get the hovered point
                        chart.series.forEach(series => {
                          const point = series.searchPoint(event, true);
                          if (point) {
                            try {
                              point.highlight(e);
                            } catch (err) {
                              // pass;
                            }
                          }
                        });
                      }
                    }
                  });
              });
        }
    }
 
   render(){
   
    if(!this.state.show){
        return <div>Loading....</div>
    }     
    return(
        <div id="container">
            <HighchartsReact
            options={this.state.mapOptions1}
            highcharts={Highcharts}
            />
            <HighchartsReact
            options={this.state.mapOptions2}
            highcharts={Highcharts}
            />
            <HighchartsReact
            options={this.state.mapOptions3}
            highcharts={Highcharts}
            />
        </div>
    )
   }
}

export default CasesTimeSeries;