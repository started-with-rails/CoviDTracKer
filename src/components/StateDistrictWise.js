import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import covid19indiadays from '../apis/covid19indiadays';


class StateDistrictWise extends React.Component {
    state = {
        mapOptions: {},
        data: [],
    };
    async componentDidMount() {
        const response = await covid19indiadays.get('state_district_wise.json');
        const state_district_wise = response.data['Andhra Pradesh'].districtData;
        var categories = []
        var total_cases = []
        var total_deaths = []
        var total_recovered = []
        var active_cases = []
        Object.keys(state_district_wise).map(function(keyName, keyIndex) {
            categories.push(keyName);
            total_cases.push(parseFloat((state_district_wise[keyName]['confirmed'])))
            total_deaths.push(parseFloat((state_district_wise[keyName]['deceased'])))
            total_recovered.push(parseFloat((state_district_wise[keyName]['recovered'])))
            active_cases.push(parseFloat((state_district_wise[keyName]['active']))) 
        })
        const mapOptions =  { 
            colors: ['#2f7ed8', '#ff3300', '#8bbc21', '#f5ad42'],    
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Covid-19 Cases DistrictWise in AP'
                },
                
                xAxis: {
                    categories: categories,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Cases'
                    }
                },
                legend: {
                    enabled: true
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
            this.setState({mapOptions: mapOptions})
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

export default StateDistrictWise;