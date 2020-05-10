import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import covid19indiadays from '../apis/covid19indiadays';


class CasesTimeSeries extends React.Component {
    state = {
        mapOptions: {},
        data: [],
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
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
            
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
            
                series: [{
                    name: 'Active Cases',
                    data: totalconfirmed
                }, {
                    name: 'Deaths',
                    data: totaldeceased
                },, {
                    name: 'Recovered Cases',
                    data: totalrecovered
                }],
            
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            }
        this.setState({mapOptions: mapOptions});
    }
   
   render(){
    return(
        <HighchartsReact
        options={this.state.mapOptions}
        highcharts={Highcharts}
      />
    )
   }
}

export default CasesTimeSeries;