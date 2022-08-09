import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({newSearch, handleSearchChange}) => {
	return (
		<div>
			find countries
			<input value={newSearch} onChange={handleSearchChange} />
		</div>
	)
}

const DisplayLanguages = ({languages}) => {
	console.log(languages)
	return (
		<ul>
			{languages.map(l => <li key={l}>{l}</li>)}
		</ul>
	)
}

const DisplayCountry = ({c}) => {
	
	return (
		<div>
			<h1>{c.name.common}</h1>
			<p>capital {c.capital}</p>
			<p>area {c.area}</p>
			<h3>languages:</h3>
			<DisplayLanguages languages={Object.values(c.languages)}/>
			<img src={c.flags.png} alt={`${c.name.common} flag`} />
		</div>
	)
}

const Display = ({numMatches, list}) => {
	if (numMatches === 1){
		console.log('found a single match')
		console.log(list[0].name.common)
		return (<DisplayCountry c={list[0]} />)
	}
	else if (numMatches > 10)
		return (<p>Too many matches, specify another filter</p>)
	else
		return (list.map(c => <div key={c.name.common}>
								{c.name.common}{' '}
								<button onClick={() => console.log('get this to show country') }>
								show
								</button>
							</div>))
}

const App = () => {
	const [all, setAll] = useState([])
	const [newSearch, setNewSearch] = useState('')

	useEffect(() => {
		console.log('effect')
		axios
			.get('https://restcountries.com/v3.1/all')
			.then(response => {
				console.log('promise fulfilled')
				setAll(response.data)
			})
	}, [])

	const handleSearchChange = (event) => setNewSearch(event.target.value)
	const lowerCaseSearch = newSearch.toLowerCase()
	const filterCounties = all.filter(country => country.name.common.toLowerCase().includes(lowerCaseSearch))
	const total = all.length

	return (
		<div>
			<Search newSearch={newSearch}
					handleSearchChange={handleSearchChange} />
			{filterCounties.length !== total
				? <Display numMatches={filterCounties.length}
							list={filterCounties} /> 
				: null
			}
		</div>
	)
}

export default App;
