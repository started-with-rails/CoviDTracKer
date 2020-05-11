import React from 'react'
import Footer from './Footer'
import Menu from './Menu'
import WorldMap from  './WorldMap';
import MapIndia from  './MapIndia';
import GeneralStats from './GeneralStatsWorld';
import CountriesSearch from './CountriesSearch';
import GeneralStatsIndia from './GeneralStatsIndia';
import IndiaSearch from './IndiaSearch';
import CasesTimeSeries from './CasesTimeSeriesNew';
import StateDistrictWise from './StateDistrictWise';

function PageContents(){
    return(
			<div className="pusher">
			<div className="ui inverted vertical masthead center aligned segment">
				<div className="ui container">
					<Menu />
				</div>
				<div className="ui container" style={{marginTop: '100px'}}>
					<WorldMap />
				</div>
			</div>
			{/* <div className="ui vertical stripe segment">
				<div className="ui middle aligned stackable grid container">
					
					
				</div>
			</div> */}
			<div className="ui vertical stripe quote segment">
				<div className="ui equal width stackable internally celled grid">
					<div className="center aligned row">
						<div className="column">
						<GeneralStats />
						</div>
						<div className="column">
						<CountriesSearch />
						</div>
					</div>
				</div>
			</div>
			<div className="ui vertical stripe segment">
				<div className="ui middle container">
					<MapIndia />
				</div>
			</div>
			<div className="ui vertical stripe quote segment">
				<div className="ui equal width stackable internally celled grid">
					<div className="center aligned row">
						<div className="column">
						<GeneralStatsIndia />
						</div>
						<div className="column">
						<IndiaSearch />
						</div>
					</div>
				</div>
			</div>
			<div className="ui vertical stripe segment">
				<div className="ui middle container">
					<CasesTimeSeries />
				</div>
			</div>
			<div className="ui vertical stripe segment">
				<div className="ui">
					<StateDistrictWise />
				</div>
			</div>
			<Footer />
		</div>
    )
}

export default PageContents;