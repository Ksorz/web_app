import React, { useState, useEffect } from "react"; // Импортируем React и хуки useState и useEffect
import axios from "axios"; // Импортируем axios для работы с API

interface Car {
	_id: string;
	model: string;
	mileage: number;
	year: number;
	color: string;
	estimated_value: number;
	serviceable: string;
}

const CarsTable = () => { // Создаем функциональный компонент CarsTable 
	const [cars, setCars] = useState<Car[]>([]); // Создаем локальный стейт для хранения массива машин 
	useEffect(() => { // Используем хук useEffect для получения данных при первом рендеринге компонента 
		const fetchData = async () => { // Создаем асинхронную функцию для получения данных с сервера
			try {
				// const response = await fetch("/carsApi");
				const response = await axios.get("http://localhost:5000/carsApi"); // Отправляем GET-запрос к серверу по адресу /carsApi 
				// const data = await response.json();
				const data = response.data; // Получаем массив машин из ответа сервера 
				setCars(data); // Обновляем стейт с массивом машин
			} catch (err) {
				console.error(err); // Обрабатываем ошибки и выводим их в консоль
			}
		};
		fetchData(); // Вызываем функцию для получения данных
	}, []); // Передаем пустой массив в качестве зависимости, чтобы функция вызывалась только один раз

	// const updateCar = async (id: any, car: any) => {
	// 	try {
	// 		// Создаем новый объект с данными о машине
	// 		// console.log(`http://localhost:5000/cars/update/${id}`, car);
	// 		await axios.post(`http://localhost:5000/cars/update/${id}`, car).then((response) => {
	// 			console.log(response.status, response.data.token);
	// 		});
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	// const updateCar = async (id: any, car: any) => {
	// 	try {
	// 		// Создаем новый объект с данными о машине
	// 		// console.log(`http://localhost:5000/cars/update/${id}`, car);
	// 		await axios.post(`http://localhost:5000/cars/update/${id}`, car).then((response) => {
	// 			console.log(response.status, response.data.token);
	// 			// Находим индекс машины с заданным id в массиве cars
	// 			const index = cars.findIndex((c) => c["_id"] === id);
	// 			// Создаем копию массива cars
	// 			const newCars = [...cars];
	// 			// Заменяем машину с найденным индексом на новый объект car
	// 			newCars[index] = car;
	// 			// Обновляем стейт с массивом машин
	// 			setCars(newCars);
	// 		});
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };
	const updateCar = async (id: any, car: any) => {
		try {
			// Создаем новый объект с данными о машине
			// console.log(`http://localhost:5000/cars/update/${id}`, car);
			await axios.post(`http://localhost:5000/cars/update/${id}`, car).then((response) => {
				console.log(response.status, response.data.token);
				// Обновляем все машины, получая их с сервера
				axios.get("http://localhost:5000/carsApi").then((response) => {
					setCars(response.data);
				});
				// Выводим сообщение об успешном обновлении
				setTimeout(() => {
					alert("Машина успешно обновлена!");
				}, 50);
			});
		} catch (err) {
			console.error(err);
		}
	};


	const deleteCar = async (id: any) => { // Создаем асинхронную функцию для удаления машины по id
		try {
			await axios.get(`http://localhost:5000/cars/delete/${id}`).then((response) => {
				console.log(response.status, response.data.token)
			}); // Отправляем GET-запрос к серверу по адресу /cars/delete/id
			setCars(cars.filter(car => car['_id'] !== id)); // Обновляем стейт с массивом машин, удаляя машину с заданным id
		} catch (err) {
			console.error(err); // Обрабатываем ошибки и выводим их в консоль
		}
	};

	const onChange = (index: any, e: any) => { // Создаем функцию для обработки изменений в инпутах
		const serviceable: string = e.target.checked ? 'on' : '';
		const newCars: any = [...cars]; // Создаем копию массива машин
		newCars[index][e.target.name] = e.target.name === 'serviceable' ? serviceable : e.target.value; // Изменяем свойство машины с заданным индексом в соответствии с именем и значением инпута
		console.log(e.target.value)
		// 
		setCars(newCars); // Обновляем стейт с массивом машин
	};

	return ( // Возвращаем JSX с нашей таблицей

		<table>
			<thead>
				<tr>
					<th>Модель</th>
					<th>Пробег</th>
					<th>Год</th>
					<th>Цвет</th>
					<th>Стоимость</th>
					<th>Исправен</th>
					<th>Удалить</th>
					<th>Изменить</th>
				</tr>
			</thead>

			<tbody>
				{/* Проходимся по массиву машин и создаем по строке таблицы для каждой машины */}
				{cars.map((car: any, index: any) => (
					<tr key={car['_id']}>
						{/* Добавляем инпуты для изменения свойств машины */}
						<td><div className="div__B"><input type="text" name="model" value={car['model']} onChange={(e) => onChange(index, e)} readOnly /></div></td>
						<td><div className="div__B"><input type="number" name="mileage" value={car['mileage']} onChange={(e) => onChange(index, e)} /></div></td>
						<td><div className="div__B"><input type="number" name="year" value={car['year']} onChange={(e) => onChange(index, e)} readOnly /></div></td>
						<td><select name="color" value={car['color']} onChange={(e) => onChange(index, e)}>
							<option value="gray">Серый</option>
							<option value="black">Черный</option>
							<option value="white">Белый</option>
							<option value="blue">Синий</option>
							<option value="red">Красный</option>
							<option value="silver">Серебристый</option>
							<option value="green">Зеленый</option>
							<option value="orange">Оранжевый</option>
							<option value="yellow">Желтый</option>
							<option value="bronze">Бронзовый</option>
						</select></td>
						{/* <td><input type="number" value={car['estimated_value']} onChange={(e) => car['estimated_value'] = e.target.value} /></td> */}
						<td><div className="div__B"><input type="number" name="estimated_value" value={car['estimated_value']} onChange={(e) => onChange(index, e)} /></div></td>
						<td><div className="div__B"><input type="checkbox" name="serviceable" checked={car['serviceable']} onChange={(e) => onChange(index, e)} /></div></td>
						{/* Добавляем кнопку для удаления машины по id */}
						<td><button onClick={() => deleteCar(car['_id'])}>Удалить</button></td>
						{/* Добавляем кнопку для изменения машины по id */}
						<td><button onClick={() => updateCar(car['_id'], car)}>Изменить</button></td>
					</tr>
				))}
			</tbody>
		</table>

	);
};

export default CarsTable; // Экспортируем компонент для использования в других файлах