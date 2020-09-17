import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import mapDataWorld from '../maps/mapDataWorld';
import covid19api from '../apis/covid19api';
import coronavirusstats from '../apis/coronavirusstats';


// Load Highcharts modules
require('highcharts/modules/map')(Highcharts);


class WorldMap extends React.Component {
    state = {
        mapOptions: {},
        show: false,
        TotalConfirmed: 0,
        TotalDeaths: 0,
        TotalRecovered: 0,
        CurrentlyInfected: 0

    }
    async componentDidMount() {

        const general_stats = await coronavirusstats.get('general-stats');
        const TotalConfirmed = general_stats.data.data.total_cases.split(',').join('')
        const CurrentlyInfected = general_stats.data.data.currently_infected.split(',').join('')
        const TotalDeaths = general_stats.data.data.death_cases.split(',').join('')
        const TotalRecovered = general_stats.data.data.recovery_cases.split(',').join('')

        const response = await covid19api.get('/summary');
        const coutries = response.data.Countries;
        var data = [];
        if(coutries) {
            Object.keys(coutries).map(function(keyName, keyIndex) {
             data.push({"hc-key": coutries[keyName]['CountryCode'].toLowerCase(), value: coutries[keyName]['TotalConfirmed']})
            })
        }
        const mapOptions = {
            chart: {
                backgroundColor: null,
                // width: 1000,
                // height: 650
            },
            title: {
                text: 'Country Wise Covid-19 Cases',
                style: { "color": "#FFF"}
            },
            mapNavigation: {
            enabled: true
            },
            colorAxis: {
                min: 0,
                dataClasses: [{
                    to: 50000,
                    color: '#ffd503'
                }, {
                    from: 50000,
                    to: 100000,
                    color: '#ffa703'
                }, {
                    from: 100000,
                    to: 1000000,
                    color: '#eb8934'
                }, {
                    from: 1000000,
                    to: 10000000,
                    color: '#eb7134',
                }]
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
                itemStyle:{"color": "#FFF"}
            },
        
            series: [
            {
                data : data,
                mapData: mapDataWorld,
                joinBy: 'hc-key',
                name: 'CoviD -19',
                nullColor: '#ffd503',
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
        if(response){
            this.setState({mapOptions: mapOptions,show: true,TotalConfirmed: TotalConfirmed, TotalDeaths: TotalDeaths, TotalRecovered: TotalRecovered, CurrentlyInfected: CurrentlyInfected});
        }
    };
   render(){
       
    if(!this.state.show){
        return <div>Loading Map....</div>
    }
    return(
        <div>
            <div className="ui inverted segment">
                <div className="ui inverted statistic">
                    <div className="value">
                    {this.state.TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>
                    <div className="label">
                    Total Confirmed
                    </div>
                </div>
                <div className="ui orange inverted statistic">
                    <div className="value">
                    {this.state.CurrentlyInfected.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>
                    <div className="label">
                    Currently Infected
                    </div>
                </div>
                <div className="ui green inverted statistic">
                    <div className="value">
                    {this.state.TotalRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>
                    <div className="label">
                    Total Recovered
                    </div>
                </div>
                <div className="ui red inverted statistic">
                    <div className="value">
                    {this.state.TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>
                    <div className="label">
                    Total Deaths
                    </div>
                </div>
        </div>
        <HighchartsReact
        options={this.state.mapOptions}
        constructorType={'mapChart'}
        highcharts={Highcharts}  />
        </div>
    )
   }
}
export default WorldMap;