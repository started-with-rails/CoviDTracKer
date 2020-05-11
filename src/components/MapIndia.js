import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import IndiaMap from '../maps/IndiaMap';
import covid19indiadays from '../apis/covid19indiadays';

// Load Highcharts modules
require('highcharts/modules/map')(Highcharts);


class MapIndia extends React.Component {
    state = {
        mapOptions: {},
        show: false
    }
    async componentDidMount() {
        const response = await covid19indiadays.get('data.json');
        const states = response.data.statewise;
        var data = [];
        Object.keys(states).map(function(keyName, keyIndex) {
          data.push({key: states[keyName]['state'].toLowerCase(), value: states[keyName]['confirmed']})
        })
        const mapOptions = {
            title: {
                text: 'India State Wise Covid-19 Cases'
            },

            // chart: {
            //     backgroundColor: null,
            //     width: 1000,
            //     height: 650
            // },

            mapNavigation: {
                enabled: true
            },

            colorAxis: {
                min: 0,
                dataClasses: [{
                    to: 1000,
                    color: '#ffd503'
                }, {
                    from: 1000,
                    to: 5000,
                    color: '#ffa703'
                }, {
                    from: 5000,
                    to: 10000,
                    color: '#eb8934'
                }, {
                    from: 10000,
                    to: 50000,
                    color: '#eb7134',
                }]
            },

            // legend: {
            //     layout: 'horizontal',
            //     align: 'center',
            //     verticalAlign: 'bottom'
            // },

            series: [{
                data: data,
                mapData: IndiaMap,
                nullColor: '#ebd634',
                joinBy: ['hc-key', 'key'],
                name: 'Covid-19 Total Cases',
                states: {
                    hover: {
                        color: '#34abeb'
                    }
                }
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        chart: {
                            height: 300
                        },
                        subtitle: {
                            text: null
                        },
                        navigator: {
                            enabled: false
                        }
                    }
                }]
            }
        };
        if(states){
             this.setState({mapOptions: mapOptions,show:true});
        }
        
    };
   render(){
    if(!this.state.show){
        return <div>Loading....</div>
    }   
    return(
        <HighchartsReact
        options={this.state.mapOptions}
        constructorType={'mapChart'}
        highcharts={Highcharts}
      />
    )
   }
}
export default MapIndia;