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
	return (
		<ul>
			{languages.map(l => <li key={l}>{l}</li>)}
		</ul>
	)
}

const DisplayCountry = ({c}) => {

	const [weather, setWeather] = useState({})
	const apiKey = process.env.REACT_APP_API_KEY

	const lat = c.capitalInfo.latlng[0]
	const lon = c.capitalInfo.latlng[1]
	

	const apiCall = 
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

	useEffect(() => {
		console.log('weather use effect')
		axios
			.get(apiCall)
			.then(response => {
				console.log('weather promise fulfilled')
				setWeather(response.data)
			})
	}, [])


	
//	console.log('here', weather.main.temp)
	return (
		<div>
			
			<h1>{c.name.common}</h1>
			<p>capital {c.capital}</p>
			<p>area {c.area}</p>
			<h3>languages:</h3>
			<DisplayLanguages languages={Object.values(c.languages)}/>
			<img src={c.flags.png} alt={`${c.name.common} flag`} />
			
			{weather.main ? (
				<div>
					<h2>Weather in {weather.name}</h2>
					<p>Temperature {weather.main.temp} Celcius</p>
					<img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
						alt="weather icon" />
					<p>Wind Speed {weather.wind.speed} m/s</p>
				</div>
				): null}
		</div>
	)
}

const ShowMatches = ({matches, setToShow}) => {
	return(
		matches.map(c =>
			<div key={c.name.common}>
				{c.name.common}{' '}
				<button onClick={() => {
					const arr = []
					arr.push(c)
					setToShow(arr)
				}}>
				show
				</button>
			</div>
		)
	)
}

const Display = ({toShow, setToShow}) => {
		if (toShow.length === 1)
			return (<DisplayCountry c={toShow[0]} />)		
		else if ((toShow.length > 10))
			return (<p>Too many matches, specify another filter</p>)
		else
			return (<ShowMatches matches={toShow} setToShow={setToShow}/>)
}

const App = () => {
	const [all, setAll] = useState([])
	const [newSearch, setNewSearch] = useState('')
	const [toShow, setToShow] = useState([])

	useEffect(() => {
		console.log('effect')
		axios
			.get('https://restcountries.com/v3.1/all')
			.then(response => {
				console.log('promise fulfilled')
				setAll(response.data)
			})
	}, [])

	const handleSearchChange = (event) => {
		setNewSearch(event.target.value)
		setToShow(all.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
	}

	return (
		<div>
			<Search newSearch={newSearch}
					handleSearchChange={handleSearchChange} />
			<Display toShow={toShow} setToShow={setToShow}/>
			
		</div>
	)
}

export default App;
