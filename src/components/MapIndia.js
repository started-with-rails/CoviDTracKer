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
        show: false,
        total: 0,
        confirmed: 0,
        cured: 0,
        death: 0
    }
    async componentDidMount() {

        const stats_response = await covid19indiadays.get('data.json');
        const stats = stats_response.data.statewise[0];
        var total = stats['confirmed'];
        var confirmed = stats['active'];
        var cured = stats['recovered'];
        var death = stats['deaths'];


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
                min: 5000,
                dataClasses: [{
                    to: 10000,
                    color: '#ffd503'
                }, {
                    from: 10000,
                    to: 50000,
                    color: '#ffa703'
                }, {
                    from: 50000,
                    to: 100000,
                    color: '#eb8934'
                }, {
                    from: 100000,
                    to: 500000,
                    color: '#eb7134',
                },
                , {
                    from: 500000,
                    to: 10000000,
                    color: '#db2828',
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
             this.setState({mapOptions: mapOptions,show:true,total: total,confirmed:confirmed,cured:cured,death:death});
        }
        
    };
   render(){
    if(!this.state.show){
        return <div>Loading....</div>
    }   
    return(
        <dvi>
            <div className="ui segment" style={{textAlign:"center"}}>
                <div className="ui blue statistic">
                    <div className="value">
                    {this.state.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>
                    <div className="label">
                    Total Confirmed
                    </div>
                </div>
                <div className="ui orange  statistic">
                    <div className="value">
                    {this.state.confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>
                    <div className="label">
                    Currently Infected
                    </div>
                </div>
                <div className="ui green  statistic">
                    <div className="value">
                    {this.state.cured.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>
                    <div className="label">
                    Total Recovered
                    </div>
                </div>
                <div className="ui red  statistic">
                    <div className="value">
                    {this.state.death.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>
                    <div className="label">
                    Total Deaths
                    </div>
                </div>
            </div>
            <HighchartsReact
        options={this.state.mapOptions}
        constructorType={'mapChart'}
        highcharts={Highcharts}/>
        </dvi>
        
    )
   }
}
export default MapIndia;