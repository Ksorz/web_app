import xmlbuilder from 'xmlbuilder';
import Car from '../models/car_model';
import { cars_html } from '../html/htmlTemplates';

export { addCar, deleteCar, updateCar, showCarTable, serviceableCarsJSON, carsByYearJSON, carsByValueAndMileageXML, getAllCars };


async function getAllCars(req: any, res: any) {
	try {
		const cars = await Car.find(); // Ищем все документы в коллекции Car
		res.json(cars); // Отправляем клиенту JSON-объект с массивом машин
	} catch (err) {
		console.error(err); // Обрабатываем ошибки и отправляем статус 500
		res.status(500).send("Server error");
	}
};

// Scripts
async function serviceableCarsJSON(req: any, res: any) {
	let serviceable = req.params.serviceable;
	// console.log(serviceable)
	if (serviceable === 'true' || serviceable === 'false') {
		serviceable = serviceable === 'true';
		let cars = await Car.find({ serviceable: serviceable });
		res.json(cars);
	} else {
		res.status(400).send('Invalid parameter');
	}
};
// async function serviceableCarsJSON(req: any, res: any) {
// 	// Получить параметр serviceable из строки запроса
// 	let serviceable = req.query.serviceable;
// 	console.log(serviceable)
// 	// Проверить, что параметр serviceable равен 'on'
// 	if (serviceable === 'on') {
// 		// Найти автомобили с соответствующим значением serviceable в базе данных
// 		let cars = await Car.find({ serviceable: serviceable });
// 		// Отправить найденные автомобили в формате JSON в ответе
// 		res.json(cars);
// 	} else {
// 		// Отправить статус ошибки 400 и сообщение об ошибке в ответе
// 		res.status(400).send('Invalid parameter');
// 	}
// };

async function carsByYearJSON(req: any, res: any) {
	let start_year = req.params.start_year;
	let end_year = req.params.end_year;
	if (isNaN(start_year) || isNaN(end_year)) {
		res.status(400).send('Invalid parameters');
	} else {
		start_year = Number(start_year);
		end_year = Number(end_year);
		let cars = await Car.find({ year: { $gte: start_year, $lte: end_year } });
		res.json(cars);
	}
};

async function carsByValueAndMileageXML(req: any, res: any) {
	let min_value = req.params.min_value;
	let max_value = req.params.max_value;
	let min_mileage = req.params.min_mileage;
	let max_mileage = req.params.max_mileage;
	if (isNaN(min_value) || isNaN(max_value) || isNaN(min_mileage) || isNaN(max_mileage)) {
		res.status(400).send('Invalid parameters');
	} else {
		min_value = Number(min_value);
		max_value = Number(max_value);
		min_mileage = Number(min_mileage);
		max_mileage = Number(max_mileage);

		let cars = await Car.find({ estimated_value: { $gte: min_value, $lte: max_value }, mileage: { $gte: min_mileage, $lte: max_mileage } });
		let xml = xmlbuilder.create('cars');
		for (let car of cars) {
			xml.ele('car', { model: car.model, year: car.year, color: car.color, estimated_value: car.estimated_value, mileage: car.mileage });
		}
		let xml_string = xml.end({ pretty: true });
		res.type('application/xml').send(xml_string);
	}
}

function addCar(req: any, res: any) {
	const { model, mileage, year, color, estimated_value, serviceable } = req.body;

	const car = new Car({
		model,
		mileage,
		year,
		color,
		estimated_value,
		serviceable: serviceable === 'on' ? true : false
	});
	car.save()
		.then(() => res.redirect('/cars'))
		.catch((err: Error) => console.error(err));
};

function deleteCar(req: any, res: any) {
	const carId = req.params.id;
	Car.deleteOne({ _id: carId })
		.then(() => res.redirect("/cars"))
		.catch((err: Error) => console.error(err));
}

function updateCar(req: any, res: any) {

	const carId = req.params.id;
	// console.log("----------------------- 111111111111111111111")
	// console.log(carId)
	// console.log("----------------------- 222222222222222222222")
	// console.log(req.body)
	const carData = {
		model: req.body.model,
		mileage: req.body.mileage,
		year: req.body.year,
		color: req.body.color,
		estimated_value: req.body.estimated_value,
		serviceable: req.body.serviceable === "on" ? true : false,
	};
	Car.updateOne({ _id: carId }, carData)
		.then(() => res.redirect("/cars"))
		.catch((err: Error) => console.error(err));
	// console.log(carData)
}

// import Car from '../models/car_model';
// import { cars_html } from '../html/htmlTemplates';

function showCarTable(req: any, res: any) {
	Car.find()
		.then(cars => {
			const carsHtml = cars.map(car => `
				<form action="/cars/update/${car._id}" method="POST">
					<input type="hidden" name="_method">
					<tr>
						<td><label for="model"></label>
						<div class="divB"><input type="text" class="form-control" id="model" name="model" value="${car.model}" readonly></div></td>
						<td><label for="mileage"></label>
						<div class="divB"><input type="number" class="form-control" id="mileage" name="mileage" value="${car.mileage}" size="8" maxlength="8"></div></td> 
						<td><label for="year"></label>
						<div class="divB"><input type="number" class="form-control" id="year" name="year" value="${car.year}" size="4" maxlength="4" readonly></div></td> 
						<td><label for="color"></label>
						<select id="color" name="color"> 
							<option value="gray" ${car.color === 'gray' ? 'selected' : ''}>Серый</option>
							<option value="black" ${car.color === 'black' ? 'selected' : ''}>Черный</option>
							<option value="white" ${car.color === 'white' ? 'selected' : ''}>Белый</option>
							<option value="blue" ${car.color === 'blue' ? 'selected' : ''}>Синий</option>
							<option value="red" ${car.color === 'red' ? 'selected' : ''}>Красный</option>
							<option value="silver" ${car.color === 'silver' ? 'selected' : ''}>Серебристый</option>
							<option value="green" ${car.color === 'green' ? 'selected' : ''}>Зеленый</option>
							<option value="orange" ${car.color === 'orange' ? 'selected' : ''}>Оранжевый</option>
							<option value="yellow" ${car.color === 'yellow' ? 'selected' : ''}>Желтый</option>
							<option value="bronze" ${car.color === 'bronze' ? 'selected' : ''}>Бронзовый</option>
						</select></td>
						<td><label for="estimated_value"></label>
						<div class="divB"><input type="number" class="form-control" id="estimated_value" name="estimated_value" value="${car.estimated_value}"></div></td>
						<td><label for="serviceable"></label>
						<div class="divB"><input type="checkbox" class="form-control" id="serviceable" name="serviceable" ${car.serviceable ? 'checked' : ''}></div></td>
						<td><button onclick="window.location.href='/cars/delete/${car._id}'">Удалить</button></td>
						<td><button type="submit" class="btn btn-default">Изменить</button></td>
					</tr>
				</form>`).join('');

			const html = cars_html.replace('{{cars}}', carsHtml); // Заменяем плейсхолдер {{cars}} на строку с автомобилями в шаблоне HTML

			res.send(html); // Отправляем HTML клиенту
		})
		.catch((err: Error) => console.error(err));
};











// _______________________________________________________
// const Car = require('../models/car_model');
// const { cars_html } = require('../html/htmlTemplates'); // const htmlTemplates = require('./html/htmlTemplates');
// const xmlbuilder = require('xmlbuilder'); // Подключаем модуль xmlbuilder, который позволяет создавать XML документы
// const MongoClient = require('mongodb'); // Импортируем mongoose
// // const { MongoClient } require('mongodb');

// module.exports = { addCar, deleteCar, updateCar, showCarTable, serviceableCarsJSON, carsByYearJSON, carsByValueAndMileageXML };


// async function serviceableCarsJSON(req, res) {
// 	let serviceable = req.params.serviceable; // Получаем параметр serviceable из запроса
// 	if (serviceable === 'true' || serviceable === 'false') { // Проверяем, является ли он строкой 'true' или 'false'
// 		serviceable = serviceable === 'true'; // Преобразуем строку в булево значение
// 		let cars = await Car.find({ serviceable: serviceable }); // Используем метод find() модели Car для поиска всех автомобилей с полем serviceable равным значению параметра
// 		res.json(cars); // Отправляем массив автомобилей в ответе в формате JSON
// 	} else {
// 		res.status(400).send('Invalid parameter'); // Если параметр не равен 'true' или 'false', отправляем сообщение об ошибке
// 	}
// };

// async function carsByYearJSON(req, res) { // Создаем асинхронную функцию, которая принимает два параметра: начальный и конечный год
// 	let start_year = req.params.start_year; // Получаем параметры из запроса
// 	let end_year = req.params.end_year;
// 	if (isNaN(start_year) || isNaN(end_year)) { // Проверяем, являются ли они числами
// 		res.status(400).send('Invalid parameters'); // Если нет, отправляем сообщение об ошибке
// 	} else {
// 		start_year = Number(start_year); // Если да, преобразуем их в числа
// 		end_year = Number(end_year);
// 		let cars = await Car.find({ year: { $gte: start_year, $lte: end_year } }); // Используем метод find() модели Car для поиска всех автомобилей с полем year в заданном диапазоне
// 		res.json(cars);
// 	}
// };

// async function carsByValueAndMileageXML(req, res) { // Создаем асинхронную функцию, которая принимает четыре параметра: минимальную и максимальную стоимость и пробег
// 	let min_value = req.params.min_value;
// 	let max_value = req.params.max_value;
// 	let min_mileage = req.params.min_mileage;
// 	let max_mileage = req.params.max_mileage;
// 	if (isNaN(min_value) || isNaN(max_value) || isNaN(min_mileage) || isNaN(max_mileage)) {
// 		res.status(400).send('Invalid parameters');
// 	} else {
// 		min_value = Number(min_value);
// 		max_value = Number(max_value);
// 		min_mileage = Number(min_mileage);
// 		max_mileage = Number(max_mileage);

// 		let cars = await Car.find({ estimated_value: { $gte: min_value, $lte: max_value }, mileage: { $gte: min_mileage, $lte: max_mileage } });
// 		let xml = xmlbuilder.create('cars'); // Создаем объект XML с корневым элементом cars
// 		for (let car of cars) { // Для каждого автомобиля в массиве cars

// 			xml.ele('car', { model: car.model, year: car.year, color: car.color, estimated_value: car.estimated_value, mileage: car.mileage }); // Создаем дочерний элемент car с атрибутами model, year, color, estimated_value и mileage
// 		}
// 		let xml_string = xml.end({ pretty: true }); // Преобразуем объект XML в строку
// 		res.type('application/xml').send(xml_string); // Отправляем строку в ответе с типом контента application/xml
// 	}
// }








// function addCar(req, res) { // POST
// 	const { model, mileage, year, color, estimated_value, serviceable } = req.body; // Получаем данные из тела запроса

// 	const car = new Car({ // Создаем новый автомобиль с данными из запроса
// 		model,
// 		mileage,
// 		year,
// 		color,
// 		estimated_value,
// 		serviceable: serviceable === 'on' ? true : false // Передаем булево значение
// 	});
// 	car.save() // Сохраняем автомобиль в базе данных и перенаправляем на список автомобилей
// 		.then(() => res.redirect('/cars'))
// 		.catch(err => console.error(err));
// };

// function deleteCar(req, res) {
// 	const carId = req.params.id; // Получаем идентификатор автомобиля из параметра запроса
// 	// Car.findByIdAndDelete(carId)
// 	Car.deleteOne({ _id: carId }) // Удаляем автомобиль из базы данных по идентификатору
// 		.then(() => {
// 			res.redirect("/cars"); // Перенаправляем на список автомобилей
// 		})
// 		.catch((err) => console.error(err));
// }

// function updateCar(req, res) { // POST /cars/update/:id
// 	const carId = req.params.id; // Получаем идентификатор автомобиля из параметра запроса
// 	const carData = { // Получаем данные об автомобиле из тела запроса
// 		model: req.body.model,
// 		mileage: req.body.mileage,
// 		year: req.body.year,
// 		color: req.body.color,
// 		estimated_value: req.body.estimated_value,
// 		serviceable: req.body.serviceable === "on" ? true : false,
// 	};
// 	// Car.findByIdAndUpdate(carId, carData)
// 	Car.updateOne({ _id: carId }, carData) // Обновляем автомобиль в базе данных по идентификатору
// 		.then(() => {
// 			res.redirect("/cars"); // Перенаправляем на список автомобилей
// 		})
// 		.catch((err) => console.error(err));
// }

// function showCarTable(req, res) { // Определяем маршрут GET /cars для получения списка всех автомобилей
// 	Car.find() // Ищем все автомобили в базе данных
// 		.then(cars => {
// 			// Создаем строку HTML для каждого автомобиля и объединяем их в одну строку
// 			const carsHtml = cars.map(car => `
// 				<form action="/cars/update/${car._id}" method="POST">
// 					<input type="hidden" name="_method">
// 					<tr>
// 						<td><label for="model"></label>
// 						<div class="divB"><input type="text" class="form-control" id="model" name="model" value="${car.model}" readonly></div></td>
// 						<td><label for="mileage"></label>
// 						<div class="divB"><input type="number" class="form-control" id="mileage" name="mileage" value="${car.mileage}" size="8" maxlength="8"></div></td>
// 						<td><label for="year"></label>
// 						<div class="divB"><input type="number" class="form-control" id="year" name="year" value="${car.year}" size="4" maxlength="4" readonly></div></td>
// 						<td><label for="color"></label>
// 						<select id="color" name="color">
// 							<option value="gray" ${car.color === 'gray' ? 'selected' : ''}>Серый</option>
// 							<option value="black" ${car.color === 'black' ? 'selected' : ''}>Черный</option>
// 							<option value="white" ${car.color === 'white' ? 'selected' : ''}>Белый</option>
// 							<option value="blue" ${car.color === 'blue' ? 'selected' : ''}>Синий</option>
// 							<option value="red" ${car.color === 'red' ? 'selected' : ''}>Красный</option>
// 							<option value="silver" ${car.color === 'silver' ? 'selected' : ''}>Серебристый</option>
// 							<option value="green" ${car.color === 'green' ? 'selected' : ''}>Зеленый</option>
// 							<option value="orange" ${car.color === 'orange' ? 'selected' : ''}>Оранжевый</option>
// 							<option value="yellow" ${car.color === 'yellow' ? 'selected' : ''}>Желтый</option>
// 							<option value="bronze" ${car.color === 'bronze' ? 'selected' : ''}>Бронзовый</option>
// 						</select></td>
// 						<td><label for="estimated_value"></label>
// 						<div class="divB"><input type="number" class="form-control" id="estimated_value" name="estimated_value" value="${car.estimated_value}"></div></td>
// 						<td><label for="serviceable"></label>
// 						<div class="divB"><input type="checkbox" class="form-control" id="serviceable" name="serviceable" ${car.serviceable ? 'checked' : ''}></div></td>
// 						<td><button onclick="window.location.href='/cars/delete/${car._id}'">Удалить</button></td>
// 						<td><button type="submit" class="btn btn-default">Изменить</button></td>
// 					</tr>
// 				</form>`).join('');

// 			const html = cars_html().replace('{{cars}}', carsHtml); // Заменяем плейсхолдер {{cars}} на строку с автомобилями в шаблоне HTML

// 			res.send(html); // Отправляем HTML клиенту
// 		})
// 		.catch(err => console.error(err));
// };

