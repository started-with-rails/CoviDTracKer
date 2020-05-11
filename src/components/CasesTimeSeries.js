import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import covid19indiadays from '../apis/covid19indiadays';


class CasesTimeSeries extends React.Component {
    state = {
        mapOptions: {},
        show: false
    };
    async componentDidMount() {
        const response = await covid19indiadays.get('data.json');
        const cases_time_series = response.data.cases_time_series;
        var totalconfirmed = [];
        var totaldeceased = [];
        var totalrecovered = [];
        var categories = [];

        Object.keys(cases_time_series).map(function(keyName, keyIndex) {
            categories.push(cases_time_series[keyName]['date'])
            totalconfirmed.push(parseInt(cases_time_series[keyName]['totalconfirmed']))
            totaldeceased.push(parseInt(cases_time_series[keyName]['totaldeceased']))
            totalrecovered.push(parseInt(cases_time_series[keyName]['totalrecovered']))
        })
        var series = [{
            name: 'Active Cases',
            data: totalconfirmed
        }, {
            name: 'Deaths',
            data: totaldeceased
        },{
            name: 'Recovered Cases',
            data: totalrecovered
        }];

        const mapOptions = {
            chart: {
                backgroundColor: null,
                height: 500,
            },

            colors: ['#2f7ed8', '#ff3300', '#8bbc21'],
            title: {
                text: 'India Covid-19 Cases by Day 1'
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
        
            series: series
        }
        if(cases_time_series){
            this.setState({mapOptions: mapOptions, show: true});
        }
    }
   
   render(){
    if(!this.state.show){
        return <div>Loading....</div>
    }     
    return(
        <HighchartsReact
        options={this.state.mapOptions}
        highcharts={Highcharts}
      />
    )
   }
}

export default CasesTimeSeries;