/* Mongoose - это ODM (Object Document Mapper) для MongoDB, 
который позволяет определять схемы для коллекций и работать с документами как с объектами JavaScript. */

import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
	model: {
		type: String,
		required: [true, "Введите название."]
	},
	mileage: {
		type: Number,
		required: true,
		default: 0,
		max: 1000000
	},
	year: {
		type: Number,
		required: true,
		min: 1980,
		max: new Date().getFullYear()
	},
	color: {
		type: String,
		required: true,
		enum: ['gray', 'black', 'white', 'blue', 'red', 'silver', 'green', 'orange', 'yellow', 'bronze']
	},
	estimated_value: {
		type: Number,
		required: true,
		min: 0,
		max: 10000000
	},
	serviceable: {
		type: Boolean,
		default: function () {
			return true;
		}
	},
},
	{
		timestamps: true
	}
);

const Car = mongoose.model('Car', carSchema);

export default Car;






















// _______________________________________________________
// const mongoose = require('mongoose') // Каждый раз, используя базу данных мы обращаемся к mongoose

// const carSchema = mongoose.Schema({ // Создаем схему продукта
// 	model: { // название продукта - строка
// 		type: String,
// 		required: [true, "Введите название."]
// 	},
// 	mileage: {
// 		type: Number,
// 		required: true,
// 		default: 0,
// 		max: 1000000
// 	},
// 	year: {
// 		type: Number,
// 		required: true,
// 		min: 1980,
// 		max: new Date().getFullYear()
// 	},
// 	color: {
// 		type: String,
// 		required: true,
// 		enum: ['gray', 'black', 'white', 'blue', 'red', 'silver', 'green', 'orange', 'yellow', 'bronze']
// 	},
// 	estimated_value: {
// 		type: Number,
// 		required: true,
// 		min: 0,
// 		max: 10000000
// 	},
// 	serviceable: {
// 		type: Boolean,
// 		default: function () {
// 			return true;
// 		}
// 	},
// },
// 	{
// 		timestamps: true // timestamps автоматически создает поля createdAt и updatedAt
// 	}
// );
// const Car = mongoose.model('Car', carSchema);

// module.exports = Car;