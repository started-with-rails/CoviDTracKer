import React from 'react'
import Footer from './Footer'
import Menu from './Menu'

function PageContents(){
    return(
			<div className="pusher">
			<div className="ui inverted vertical masthead center aligned segment">
				<div className="ui container">
					<Menu />
				</div>
				<div className="ui text container">
					{/* World Map */}
				</div>
			</div>
			<div className="ui vertical stripe segment">
				<div className="ui middle aligned stackable grid container">
					{/* Block1 */}
				</div>
			</div>
			<div className="ui vertical stripe quote segment">
				<div className="ui equal width stackable internally celled grid">
					<div className="center aligned row">
						<div className="column">
						{/* BC1 */}
						</div>
						<div className="column">
						{/* BC2 */}
						</div>
					</div>
				</div>
			</div>
			<div className="ui vertical stripe segment">
				<div className="ui text container">
					{/* BB123*/}
				</div>
			</div>
			<Footer />
		</div>
    )
}

export default PageContents;