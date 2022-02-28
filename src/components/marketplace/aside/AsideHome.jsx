import React, { Fragment, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

import Accordion from '../Accordion.jsx';
import Lands from './aside_home/Lands.jsx';
import Productions from './aside_home/Productions.jsx';
import Resources from './aside_home/Resources.jsx';
import Energy from './aside_home/Energy.jsx';
import Tickets from './aside_home/Tickets.jsx';

import IconSaw from '../../../assets/marketplace/icons/icon_saw.svg'
import IconClaw from '../../../assets/marketplace/icons/icon_claw.svg'
import IconLighting from '../../../assets/marketplace/icons/icon_lighting.svg'
import IconBlade from '../../../assets/marketplace/icons/icon_blade.svg'

import Coin from '../../../assets/marketplace/coin.png'


const mockWeapons = ['Lighting', 'Blade', 'Saw', 'Claw', 'Lighting', 'Claw', 'Saw', 'Claw', 'Lighting', 'Claw', 'Blade', 'Saw', 'Claw', 'Lighting', 'Blade', 'Saw', 'Claw', 'Lighting', 'Saw', 'Claw', 'Lighting', 'Blade',];
const mockToys = ['Drum', 'Shaker', 'Windmill', 'Ball', 'Lollipop', 'Ducky', 'Drum', 'Shaker', 'Windmill', 'Ball', 'Lollipop', 'Ducky', 'Windmill', 'Ball', 'Lollipop', 'Ducky'];

function AsideHome({ onClick, currentTab }) {
	const [values, setValues] = useState([0, 1400]);

	const STEP = 100;
	const MIN = 0;
	const MAX = 9999;

	const handleChange = (e, index) => {
		let newArr = [...values];
		newArr[index] = e;
		setValues(newArr);
	}

	const maxLengthCheck = (object) => {
		if (object.target.value.length > object.target.maxLength) {
			object.target.value = object.target.value.slice(0, object.target.maxLength)
		}
	}

	const onlyNumberCheck = (e) => {
		if (!/[0-9]/.test(e.key)) {
			e.preventDefault();
		}
	}

  return (
    <aside className='aside-mp'>
			{ 
				currentTab === 'Lands' ? <Lands /> : 
				currentTab === 'Productions' ? <Productions /> :
				currentTab === 'Resources' ? <Resources /> :
				currentTab === 'Energy' ? <Energy /> :
				currentTab === 'Tickets' ? <Tickets /> : 
				(
					<Fragment>
					<div className='aside-mp__filter'>
						<span className='aside-mp__filter-type'>RACE</span>
					</div>
					<div className='aside-mp__filter'>
						<span className='aside-mp__filter-type'>
							PRICE 
							<img src={Coin} alt="coin"/>
						</span>
						<div className='aside-mp__price'>
							{
								values.map((value, index) => {
									return <input className='aside-mp__price-input' key={ index } value={ value } onChange={e => handleChange(e.target.value, index)} 
									type="number" min="0" max="2000" maxLength="4" 
										onKeyPress={(event) => {
											onlyNumberCheck(event)
										}}
										onInput={maxLengthCheck}
									/>
								})
							}
						</div>
						<Range
							values={values}
							step={STEP}
							min={MIN}
							max={MAX}
							onChange={values => {
								setValues(values);
							}}
							renderTrack={({ props, children }) => (
								<div
									onMouseDown={props.onMouseDown}
									onTouchStart={props.onTouchStart}
									style={{
										...props.style,
										height: "36px",
										display: "flex",
										width: "245px",
										margin: "15px 0px 0px 7px",
									}}
								>
									<div
										ref={props.ref}
										style={{
											height: "5px",
											width: "100%",
											borderRadius: "4px",
											background: getTrackBackground({
												values: values,
												colors: ["#22323E", "#43AF01", "#22323E"],
												min: MIN,
												max: MAX
											}),
											alignSelf: "center"
										}}
									>
										{children}
									</div>
								</div>
							)}
							renderThumb={({ props, isDragged }) => (
								<div
									{...props}
									style={{
										...props.style,
										height: "16px",
										width: "16px",
										borderRadius: "100%",
										backgroundColor: "#43AF01",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
								</div>
							)}
						/>
					</div>
					<div className='aside-mp__filter'>
						<span className='aside-mp__filter-type'>RARITY</span>
						<ul>
							<li className='aside-mp__filter-rarity aside-mp__filter-rarity_true'
								onClick={() =>onClick('True')}
							>
								True
							</li>
							<li className='aside-mp__filter-rarity aside-mp__filter-rarity_rare'
								onClick={() =>onClick('Rare')}
							>
								Rare
							</li>
							<li className='aside-mp__filter-rarity aside-mp__filter-rarity_epic'
								onClick={() =>onClick('Epic')}
							>
								Epic
							</li>
							<li className='aside-mp__filter-rarity aside-mp__filter-rarity_legend'
								onClick={() => onClick('Legend')}
							>
								Legend
							</li>
						</ul>
					</div>
					<div className='aside-mp__filter'>
						<Accordion title="WEAPON" content={
							mockWeapons.map((weapon, index) => {
								return (
									<div className='badge' key={index}>
										<img src=
											{ 
											weapon === 'Lighting' ? IconLighting 
											: weapon === 'Blade' ? IconBlade 
											: weapon === 'Saw' ? IconSaw 
											: weapon === 'Claw' ? IconClaw 
											: ''
										} 
										alt="weapon icon" className='badge__img'/>
										<span className='badge__title'>{ weapon }</span>
									</div>
								)
							})
						} />
					</div>
					<div className='aside-mp__filter'>
						<Accordion title="TOYS" content={
							mockToys.map((toy, index) => {
								return (
									<div className='badge' key={index}>
										{/* <img src=
											{ 
												toy === 'Lighting' ? IconLighting 
											: toy === 'Blade' ? IconBlade 
											: toy === 'Saw' ? IconSaw 
											: toy === 'Claw' ? IconClaw 
											: ''
										} 
										alt="weapon icon" className='badge__img'/> */}
										<span className='badge__title'>{ toy }</span>
									</div>
								)
							})
						} />
					</div>
					</Fragment>
				)
			}
    </aside>
  )
}

export default AsideHome