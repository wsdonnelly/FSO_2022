import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Display from './components/Display'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import infoService from './services/info'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')
	const [message, setMessage] = useState(null)
	const [error, setError] = useState(false)
	
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
						setMessage(`${newName}'s number has been upated`)
						setTimeout(() => {
							setMessage(null)
						}, 5000)
						setError(false)
					})
					.catch(error => {
						console.log(error)
						setMessage(`${newName}'s number was unable to update`)
						setTimeout(() => {
							setMessage(null)
						}, 5000)
						setError(true)
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
					setMessage(`${newName} has been added to the phonbook`)
					setTimeout(() => {
						setMessage(null)
					}, 5000)
					setError(false)
				})
				.catch(error => {
					console.log(error.response.data.error)
					setMessage(error.response.data.error)
						setTimeout(() => {
							setMessage(null)
						}, 5000)
						setError(true)
				})
		}
	}

	const handleRemove = (id) => {
		const name = persons.find(p => p.id ===id).name
		if (window.confirm(`Do you really want to delete ${name} ?`)) {
			infoService
				.remove(id)
				.then(returned => {
					setPersons(persons.filter(person => person.id !== id))
					setMessage(`${name} has been deleted from the phonebook`)
					setTimeout(() => {
						setMessage(null)
					}, 5000)
				}
				)
				.catch(error => {
						setMessage(error.response.data.error)
						setTimeout(() => {
							setMessage(null)
						}, 5000)
						setError(true)
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
			<Notification message={message} error={error}/>
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
