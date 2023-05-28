// import React, { useState } from "react";
// import axios from "axios";
import './App.css';
import CarsTable from "./components/cars_table";
import CarForm from './components/addCar_form';
import Scripts_form from './components/scripts_forms';


// Создаем функциональный компонент App
const App = () => {

	// Возвращаем JSX с нашей таблицей и формой редактирования
	return (
		<div>
			<div style={{ display: 'flex' }}>
				<CarForm />
				<Scripts_form />
			</div>

			<CarsTable />
		</div>
	);
};

// Экспортируем компонент для использования в других файлах
export default App;
