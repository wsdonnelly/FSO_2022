import React from 'react'

const Notification = ({message, error}) => {
	const messageStyle = {
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	}

	if(error)
		messageStyle.color = 'red'
	else
	messageStyle.color = 'green'

	if (message === null){
		return null
	}
	return (
		<div style={messageStyle}>
			{message}
		</div>
	)
}

export default Notification
