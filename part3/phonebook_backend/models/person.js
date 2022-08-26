const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('conecting to', url)

mongoose.connect(url)
	.then(() => {
		console.log('conected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})


const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		minLength: 9,
		validate: {
			validator: ((num) => {
				return /\d{2,3}-\d+/.test(num)
			})
		},
		required: true
	}

})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)