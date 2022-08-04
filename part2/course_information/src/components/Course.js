const Header = ({ course }) => <h2>{course}</h2>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Contents = ({parts}) => (
	parts.map((part) => <Part key={part.id} part={part} />)
)

const Total = ({parts}) => {
	const sum = parts.reduce((sum, cur) => sum + cur.exercises, 0)
	return (
		<strong>total of {sum} exercises</strong>
	)
}

const Course = ({course}) => {
	return (
		<div>
			<h1>Web Development curriculum</h1>
			<Header course={course.name} />
			<Contents parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}

export default Course