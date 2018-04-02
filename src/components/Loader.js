import React from 'react'

const Loader = ({shouldShow}) => {

	return (
		<div id='loader' className='loader-container'>
			<div className='loader-style'>
				<img src="/images/loader.gif" alt="loader" style={{width: 200, height: 200}}/>
			</div>
		</div>
	)
}

export default Loader