import { useState } from 'react'

const Display = ({name, number}) => {
	return (
		<p>{name} {number}</p>
	)
}

const Filter = ({newFilter, handleFilterChange}) => {
	return (
		<div>
			filter shown with<input
				value={newFilter}
				onChange={handleFilterChange}/>
		</div>
	)
}

const PersonForm = (props) => {
	return (
		<form onSubmit={props.addNameNumber}>
				<div>
					name:<input 
							value={props.newName}
							onChange={props.handleNameChange}/>
				</div>
				<div>
					number: <input 
							value={props.newNumber}
							onChange={props.handleNumberChange}/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
	)
}

const Persons = ({filteredPersons}) => 
	filteredPersons.map(person => <Display key={person.name}
											name={person.name}
											number={person.number} />)
	
const App = () => {
	const [persons, setPersons] = useState([
		{
			name: 'Arto Hellas',
			number: '39-44-2343456'
		}
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')
	

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

	const handleFilterChange = (event) => {
		console.log(event.target.value)
		setNewFilter(event.target.value)
	}

	const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter))

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
			<h2>add a new</h2>
			<PersonForm
				addNameNumber={addNameNumber}
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange} />
			<h2>Numbers</h2>
			<Persons filteredPersons={filteredPersons} />
		</div>
	)
}

export default App
