import React from 'react'

const Display = ({name, number, handleRemove}) => {
	return (
		<p>
			{name}{'\t'}{number}{'\t'}
			<button onClick={handleRemove}>delete</button>
		</p>
	)
}

export default Display
