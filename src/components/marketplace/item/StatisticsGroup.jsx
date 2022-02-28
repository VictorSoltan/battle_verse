import React, { useState } from 'react'

import YellowSwards from '../../../assets/yellowSwards.png'

function statisticsGroup() {
	let [num, setNum] = useState(0)

  return (
	<div className="statistics-group">
		<div className="statistics-group__tabs">
			{['Duels','Racing', 'PVE'].map((item, index) => {
				return(
					<>
					{index === num?
					<button key={item} className="active">{item}</button>
					:<button key={item} onClick={() => setNum(index)}>{item}</button>}
					</>
				)
			})}
		</div>
		<div className="statistics-group__content">
			<div className="statistics-group__content_left">
				<img src={YellowSwards} alt="swards" />
				<span className='statistics-group__title'>BATTLES</span>
				<span className='statistics-group__ammount'>3518</span>
			</div>
			<div className='statistics-group__content_right'>
				<div className="statistics-group__content_rates">
					<div>
						<span>WON</span>
						<h5>1358</h5>
					</div>
					<div>
						<span>DROW</span>
						<h5>1530</h5>
					</div>
					<div>
						<span>LOSE</span>
						<h5>1000</h5>
					</div>
				</div>
			</div>
		</div>
	</div>
	)
}

export default statisticsGroup


