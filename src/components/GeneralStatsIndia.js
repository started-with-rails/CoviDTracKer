import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import covid19indiadays from '../apis/covid19indiadays';


class GeneralStatsIndia extends React.Component {
    state = {
        mapOptions: {},
        data: [],
    };
    async componentDidMount() {
        const response = await covid19indiadays.get('data.json');
        const states = response.data.statewise[0];
        var total = states['confirmed'];
        var confirmed = states['active'];
        var cured = states['recovered'];
        var death = states['deaths'];

        this.setState({
            mapOptions: { 
                colors: ['#2f7ed8', '#ff3300', '#8bbc21'],
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'India Covid-19 Total Cases : '+total
                },
                tooltip: {
                    pointFormat: '',
                    animation:true
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true
                        },
                        showInLegend: false
                    }
                },
                series: [{
                    name: '%',
                    colorByPoint: true,
                    data:  [
                        {name: 'Currently Active Cases = '+confirmed, y: Math.round((confirmed * 100) / total)},
                        {name: 'Deaths = '+death, y: Math.round((death * 100) / total),sliced: true,selected: true},
                        {name: 'Recovery Cases = '+cured, y: Math.round((cured * 100) / total)},
                    ]
                }]
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

export default GeneralStatsIndia;