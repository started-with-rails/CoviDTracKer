import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import covid19indiadays from '../apis/covid19indiadays';


class IndiaSearch extends React.Component {
    state = {
        mapOptions: {},
    };
    async componentDidMount() {
        const response = await covid19indiadays.get('data.json');
        const states = response.data.statewise;
        var categories= []
        var total_cases= []
        var total_deaths= []
        var total_recovered= []
        var active_cases = []
        Object.keys(states).map(function(keyName, keyIndex) {
            if(keyName > 0 && keyName <  6) {
                categories.push(states[keyName]['state'])
                total_cases.push(parseFloat((states[keyName]['confirmed'])))
                total_deaths.push(parseFloat((states[keyName]['deaths'])))
                total_recovered.push(parseFloat((states[keyName]['recovered'])))
                active_cases.push(parseFloat((states[keyName]['active'])))
            }
        })
        this.setState({
            mapOptions: {
            colors: ['#2f7ed8', '#ff3300', '#8bbc21', '#f5ad42'],    
            chart: {
                type: 'column'
            },
            title: {
                text: 'Top 5 Covid-19 Effected States in India'
            },
            xAxis: {
                categories: categories,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'cases'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [
                {name: 'Total Cases', data: total_cases},
                {name: 'Total Deaths', data: total_deaths},
                {name: 'Total Recovred Cases', data: total_recovered},
                {name: 'Total Active Cases', data: active_cases},
            ]
        }
        })
    };
   
   render(){
    return(
        <HighchartsReact
        options={this.state.mapOptions}
        highcharts={Highcharts}
      />
    )
   }
}

export default IndiaSearch;