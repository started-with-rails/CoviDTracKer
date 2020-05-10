import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import coronavirusstats from '../apis/coronavirusstats';


class GeneralStatsWorld extends React.Component {
    state = {
        mapOptions: {},
        data: [],
    };
    async componentDidMount() {
        const response = await coronavirusstats.get('general-stats');
        // console.log(response);
        console.log(response.data.data);
      
        const toatl_cases = response.data.data.total_cases.split(',').join('')
        const currently_infected = response.data.data.currently_infected.split(',').join('')
        const death_cases = response.data.data.death_cases.split(',').join('')
        const recovery_cases = response.data.data.recovery_cases.split(',').join('')
    
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
                    text: 'World Covid-19 Total Cases : '+toatl_cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
                        {name: 'Currently Active Cases = '+currently_infected.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), y: Math.round((currently_infected * 100) / toatl_cases)},
                        {name: 'Deaths = '+death_cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), y: Math.round((death_cases * 100) / toatl_cases),sliced: true,selected: true},
                        {name: 'Recovery Cases = '+recovery_cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), y: Math.round((recovery_cases * 100) / toatl_cases)},
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

export default GeneralStatsWorld;