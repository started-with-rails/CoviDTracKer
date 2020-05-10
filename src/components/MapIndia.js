import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import IndiaMap from '../maps/IndiaMap';
import covid19india from '../apis/covid19india';

// Load Highcharts modules
require('highcharts/modules/map')(Highcharts);


class MapIndia extends React.Component {
    state = {
        mapOptions: {}
    }
    async componentDidMount() {
        const response = await covid19india.get('/states');
        const states = response.data.state;
        var data = [];
        Object.keys(states).map(function(keyName, keyIndex) {
          data.push({key: states[keyName]['name'].toLowerCase(), value: states[keyName]['confirmed']})
        })
        const mapOptions = {
            title: {
                text: 'India State Wise Covid-19 Cases'
            },

            chart: {
                backgroundColor: null,
                width: 1000,
                height: 650
            },

            mapNavigation: {
                enabled: true
            },

            colorAxis: {
                min: 0,
                dataClasses: [{
                    to: 1000
                }, {
                    from: 1000,
                    to: 5000
                }, {
                    from: 5000,
                    to: 10000
                }, {
                    from: 10000,
                    to: 50000
                }]
            },

            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'bottom'
            },

            series: [{
                data: data,
                mapData: IndiaMap,
                joinBy: ['hc-key', 'key'],
                name: 'Covid-19 Cases',
                states: {
                    hover: {
                        color: Highcharts.getOptions().colors[2]
                    }
                }
            }]
        };
         this.setState({mapOptions: mapOptions});
        
    };
   render(){
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