import { useState, useEffect } from 'react'
import infoService from './services/info'

const Display = ({name, number, handleRemove}) => {
	return (
		<p>
			{name}{number}{'            '}
			<button onClick={handleRemove}>delete</button>
		</p>
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

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')
	
	useEffect(() => {
		infoService
			.getAll()
			.then(initialInfo => {
				setPersons(initialInfo)
			})
	}, [])

	const addNameNumber = (event) => {
		event.preventDefault()
		if (persons.some(person => person.name === newName)){
			if(window.confirm(`${newName} is already added to phonebook, do you want to replace the old number with a new one?`)){
				const person = persons.find(p => p.name === newName)
				person.number = newNumber
				infoService
					.update(person.id, person)
					.then( returned => {
						console.log('returned', returned)
						setPersons(persons.map(p => p.id !== person.id ? p : returned))
						setNewName('')
						setNewNumber('')
					})
			}
		}
		else {
			const personObject = {
				name: newName,
				number: newNumber
				}
			infoService
				.create(personObject)
				.then(returned => {
					setPersons(persons.concat(personObject))
					setNewName('')
					setNewNumber('')
				})
		}
	}

	const handleRemove = (id) => {
		const name = persons.find(p => p.id ===id).name
		if (window.confirm(`Do you really want to delete ${name} ?`)) {
			infoService
				.remove(id)
				.then(
					setPersons(persons.filter(person => person.id !== id))
				)
				.catch(error => {
					alert(
						`the id# ${id} was already deleted`
					)
				})
		}
	}

	const handleNameChange = (event) => setNewName(event.target.value)
	const handleNumberChange = (event) => setNewNumber(event.target.value)
	const handleFilterChange = (event) => setNewFilter(event.target.value)

	const filteredPersons = persons.filter(person =>
		person.name.toLowerCase().includes(newFilter))

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
				handleNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			{filteredPersons.map(person => 
				<Display
					key={person.name}
					name={person.name}
					number={person.number}
					handleRemove={() => handleRemove(person.id)}
				/>
			)}
		</div>
	)
}

export default App
