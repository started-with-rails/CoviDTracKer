import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import mapDataWorld from '../maps/mapDataWorld';
import covid19api from '../apis/covid19api';

// Load Highcharts modules
require('highcharts/modules/map')(Highcharts);


class WorldMap extends React.Component {
    state = {
        mapOptions: {}
    }
    async componentDidMount() {
        const response = await covid19api.get('/summary');
        const coutries = response.data.Countries;
        var data = [];
        Object.keys(coutries).map(function(keyName, keyIndex) {
          data.push({"hc-key": coutries[keyName]['CountryCode'].toLowerCase(), value: coutries[keyName]['TotalConfirmed']})
        })
        const mapOptions = {
            chart: {
                backgroundColor: null,
                width: 1000,
                height: 650
            },
            title: {
                text: 'World Wise Covid-19 Cases',
                color: '#fff'
            },
            mapNavigation: {
            enabled: true
            },
            colorAxis: {
                min: 0,
                dataClasses: [{
                    to: 50000
                }, {
                    from: 50000,
                    to: 100000
                }, {
                    from: 100000,
                    to: 500000
                }, {
                    from: 500000,
                    to: 1000000
                }, {
                    from: 1000000,
                    to: 5000000
                }, {
                    from: 10000000,
                    to: 50000000
                }, {
                    from: 50000000
                }]
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'bottom'
            },
        
            series: [
            {
                data : data,
                mapData: mapDataWorld,
                joinBy: 'hc-key',
                name: 'CoviD -19',
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
            ]
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
export default WorldMap;