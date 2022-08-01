import {useState} from 'react'

const Display = (props) => <h1>{props.text}</h1>

const Button = (props) => (
	<button onClick={props.handelClick}>{props.text}</button>
)

const StatisticLine = (props) => (
	<tr>
		<td>{props.text}</td> 
		<td>{props.value}</td>
	</tr>
)

const Statistics = ({good, bad, all}) => {
	const average = (good - bad) / all
	const positive = (good / all) * 100

	if (all === 0)
		return <p>No feedback given</p>
	return (
		<table>
			<tbody>
				<StatisticLine text="good" value={good} />
				<StatisticLine text="neutral" value={all - good - bad} />
				<StatisticLine text="bad" value={bad} />
				<StatisticLine text="all" value={all} />
				<StatisticLine text="average" value={average} />
				<StatisticLine text="positive" value={positive + "%"} />
			</tbody>
		</table>
	)
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
			<Display text="give feedback" />
			<Button handelClick={() => setGood(good + 1)} text="good" />
			<Button handelClick={() => setNeutral(neutral + 1)} text="neutral" />
			<Button handelClick={() => setBad(bad + 1)} text="bad" />
			<Display text="statistics" />
			<Statistics good={good} bad={bad} all={good + bad + neutral}/>
		</div>
	)
}

export default App;
