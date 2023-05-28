// Import modules
import express from "express"; // Импортируем модуль express из папки node_modules
import bodyParser from "body-parser";
import cors from 'cors';
import path from 'path';


// Import scripts
import db from "./scripts/connection"; // MongoDB mongoose
import {
	addCar,
	deleteCar,
	updateCar,
	showCarTable,
	serviceableCarsJSON,
	carsByYearJSON,
	carsByValueAndMileageXML,
	getAllCars,
} from "./scripts/general_scripts";



// Create express app
const app = express(); // Создаем объект приложения express
const port = 5000; // Определяем номер порта для сервера
// const path = require('path');

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.use(cors());
// Добавить заголовки CORS для всех маршрутов
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешить доступ для всех происхождений
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Разрешить методы запроса
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Разрешить заголовки запроса
	next(); // Передать управление следующему middleware
});
// Connect to database
db(app, port);

app.get("/api", (req, res) => {
	// Отправляем клиенту JSON объект с сообщением
	res.json({ message: "Hello from server!" });
});


app.get("/carsApi", getAllCars);

// Использовать middleware для парсинга URL-кодированных данных из тела запроса
app.use(bodyParser.urlencoded({ extended: false })); // Настраиваем парсер тела запроса (для работы showCarTable)
app.use(bodyParser.json())
// Define routes and handlers
app.get("/cars", showCarTable); // Отобразить html с формой добавления, удаления и модификации записей
app.post("/cars", addCar); // Добавление записи
app.post("/cars/update/:id", updateCar); // Обновление информации о записи
app.get("/cars/delete/:id", deleteCar); // Удаление записи
app.get("/cars/:serviceable", serviceableCarsJSON); // JSON (ex --- localhost:3000/cars/false )
app.get("/cars/:start_year/:end_year", carsByYearJSON); // JSON (ex --- localhost:3000/cars/2015/2017 )
app.get(
	"/cars/:min_value/:max_value/:min_mileage/:max_mileage",
	carsByValueAndMileageXML
); // XML (ex --- localhost:3000/cars/0/50000/0/35000 )

app.get("/", (req: express.Request, res: express.Response) => { // Функция принимает два параметра: req (объект запроса) и res (объект ответа)
	res.send("Hello World!"); // Отправляем текстовый ответ с 'Hello World!'
});












// _______________________________________________________
// const express = require("express") // Импортируем модуль express из папки node_modules
// const bodyParser = require('body-parser')

// const app = express() // Создаем объект приложения express
// const port = 3000 // Определяем номер порта для сервера
// const db = require('./scripts/connection'); // MongoDB
// const { addCar, deleteCar, updateCar, showCarTable, serviceableCarsJSON, carsByYearJSON, carsByValueAndMileageXML } = require('./scripts/general_scripts');

// db(app, port);

// app.use(bodyParser.urlencoded({ extended: false })); // Настраиваем парсер тела запроса (для работы showCarTable)
// app.get('/cars', showCarTable); // Отобразить html с формой добавления, удаления и модификации записей
// app.post('/cars', addCar); // Добавление записи
// app.post('/cars/update/:id', updateCar); // Обновление информации о записи
// app.get('/cars/delete/:id', deleteCar); // Удаление записи

// app.get('/cars/:serviceable', serviceableCarsJSON); // JSON (ex --- localhost:3000/cars/false )
// app.get('/cars/:start_year/:end_year', carsByYearJSON); // JSON (ex --- localhost:3000/cars/2015/2017 )
// app.get('/cars/:min_value/:max_value/:min_mileage/:max_mileage', carsByValueAndMileageXML); // XML (ex --- localhost:3000/cars/0/50000/0/35000 )

// app.get('/', (req, res) => { // Функция принимает два параметра: req (объект запроса) и res (объект ответа)
// 	res.send('Hello World!') // Отправляем текстовый ответ с 'Hello World!'
// })
