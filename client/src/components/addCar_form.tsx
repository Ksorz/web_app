import React, { useState } from 'react';
import axios from 'axios';

// Определить тип для данных об автомобиле
type CarData = {
	model: string;
	mileage: number;
	year: number;
	color: string;
	estimated_value: number;
	serviceable: string;
};

// Определить компонент для формы добавления автомобиля
const CarForm = () => {
	// Создать стейт для хранения данных об автомобиле
	const [carData, setCarData] = useState<CarData>({
		model: '',
		mileage: 0,
		year: new Date().getFullYear(),
		color: 'gray',
		estimated_value: 0,
		serviceable: 'on',
	});

	// Функция для обработки изменения инпутов
	const onChange = (e: any) => {
		// Получить имя и значение инпута из события
		const { name, value } = e.target;
		// Обновить стейт с данными об автомобиле в зависимости от имени инпута
		switch (name) {
			case 'model':
				setCarData({ ...carData, model: value });
				break;
			case 'mileage':
				setCarData({ ...carData, mileage: value });
				break;
			case 'year':
				setCarData({ ...carData, year: value });
				break;
			case 'color':
				setCarData({ ...carData, color: value });
				break;
			case 'estimated_value':
				setCarData({ ...carData, estimated_value: value });
				break;
			case 'serviceable':
				setCarData({ ...carData, serviceable: e.target.checked ? 'on' : '' });
				break;
			default:
				break;
		}
	};




	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Функция для обработки отправки формы
		// e.preventDefault(); // Предотвратить перезагрузку страницы при отправке формы
		try { // Отправить данные об автомобиле на сервер с помощью axios.post
			const response = await axios.post('http://localhost:5000/cars', carData);
			console.log(response.data);
			setCarData({ // Очистить стейт с данными об автомобиле
				model: '',
				mileage: 0,
				year: new Date().getFullYear(),
				color: 'gray',
				estimated_value: 0,
				serviceable: 'on',
			});
			// Показать сообщение об успехе или перенаправить на другую страницу
			alert('Автомобиль добавлен');
		} catch (error) {
			// Обработать ошибки и показать сообщение об ошибке
			console.error(error);
			alert('Something went wrong');
		}
	};

	// Вернуть JSX с формой добавления автомобиля
	return (
		<div style={{ textAlign: 'center' }}>
			<h1>Автомобили</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="model">
					Модель:
					<input
						type="text"
						id="model"
						name="model"
						value={carData.model}
						onChange={onChange}
						required
					/>
				</label>
				<label htmlFor="mileage">
					Пробег:
					<input
						type="number"
						id="mileage"
						name="mileage"
						onChange={onChange}
						required
						min="0"
						max="1000000"
					/>
				</label>
				<label htmlFor="year">
					Год:
					<input
						type="number"
						id="year"
						name="year"
						value={carData.year}
						onChange={onChange}
						required
						min="1980"
						max={new Date().getFullYear()}
					/>
				</label>
				<label htmlFor="color">
					Цвет:
					<select id="color" name="color" value={carData.color} onChange={onChange} required>
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
					</select>
				</label>
				<label htmlFor="estimated_value">
					Стоимость:
					<input
						type="number"
						id="estimated_value"
						name="estimated_value"
						onChange={onChange}
						required
						min="0"
						max="10000000"
					/>
				</label>
				<label htmlFor="serviceable">
					Исправен
					<input
						type="checkbox"
						id="serviceable"
						name="serviceable"
						checked={Boolean(carData['serviceable'])}
						onChange={onChange}
					/>
				</label>
				<button type="submit">Добавить</button>
			</form>
		</div>
	);
};

export default CarForm;
