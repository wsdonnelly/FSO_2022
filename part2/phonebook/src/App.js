import { useState } from 'react'

const Display = ({name, number}) => {
	return (
		<p>{name} {number}</p>
	)
}

const App = () => {
	const [persons, setPersons] = useState([
		{
			name: 'Arto Hellas',
			number: '39-44-2343456'
		}
	])
	const [newName, setNewName] = useState('')

	const [newNumber, setNewNumber] = useState('')
	

	const addNameNumber = (event) => {
		event.preventDefault()
		if (persons.some(person => person.name === newName)){
			alert(`${newName} is already added to phonebook`)
		}
		else {
			const personObject = {
			name: newName,
			number: newNumber
			}
			setPersons(persons.concat(personObject))
			
		}
		setNewName('')
		setNewNumber('')
	}

	const handleNameChange = (event) => {
		console.log(event.target.value)
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		console.log(event.target.value)
		setNewNumber(event.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addNameNumber}>
				<div>
					name: <input 
						value={newName}
						onChange={handleNameChange}
						/>
				</div>
				<div>
					number: <input 
							value={newNumber}
							onChange={handleNumberChange}/>
				</div>
				
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map(person => <Display key={person.name} name={person.name} number={person.number}/>)}
		</div>
	)
}

export default App
