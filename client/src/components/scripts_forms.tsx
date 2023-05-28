import React, { useState } from "react";
import axios from "axios";

const Scripts_form = () => {
	const [checked, setChecked] = useState(false);
	const [startYear, setStartYear] = useState(1980);
	const [endYear, setEndYear] = useState(new Date().getFullYear());

	const [minValue, setMinValue] = useState(0);
	const [maxValue, setMaxValue] = useState(10000000);
	const [minMileage, setMinMileage] = useState(0);
	const [maxMileage, setMaxMileage] = useState(10000000);

	const handleClick_1 = () => {
		// axios.get(`http://localhost:5000/cars/${checked}`).then((res) => {
		// 	console.log(res.data)
		// })
		// 	.catch((err) => {
		// 		console.error(err);
		// 	});
		window.location.href = `http://localhost:5000/cars/${checked}`;
	};


	const handleClick_2 = () => {
		// axios.get(`http://localhost:5000/cars/${startYear}/${endYear}`).then((res) => {
		// 	console.log(res.data)
		// })
		// 	.catch((err) => {
		// 		console.error(err);
		// 	});
		window.location.href = `http://localhost:5000/cars/${startYear}/${endYear}`;
	};

	const handleClick_3 = () => {
		// axios.get(`http://localhost:5000/cars/${minValue}/${maxValue}/${minMileage}/${maxMileage}`).then((res) => {
		// 	console.log(res.data)
		// })
		// 	.catch((err) => {
		// 		console.error(err);
		// 	});
		window.location.href = `http://localhost:5000/cars/${minValue}/${maxValue}/${minMileage}/${maxMileage}`;
	};

	const handleChange = (e: any) => {
		switch (e.target.name) {
			case 'serviceable':
				setChecked(e.target.checked);
				break;
			case 'startYear':
				setStartYear(e.target.value);
				break;
			case 'endYear':
				setEndYear(e.target.value)
				break;
			case 'minValue':
				setMinValue(e.target.value);
				break;
			case 'maxValue':
				setMaxValue(e.target.value)
				break;
			case 'minMileage':
				setMinMileage(e.target.value);
				break;
			case 'maxMileage':
				setMaxMileage(e.target.value)
				break;
		}
	};




	return (
		<div style={{ display: "flex", textAlign: "center" }}>
			<div>
				<h1>Исправные авто</h1>
				<form>
					<div style={{ alignSelf: "center" }}><input name='serviceable' type="checkbox" checked={checked} onChange={handleChange} /></div>
				</form>
				<button style={{ marginTop: "10px" }} onClick={handleClick_1} type="submit">Запрос</button>

			</div>

			<div>
				<h1>Авто по году</h1>
				<form>
					<div style={{ display: "flex", alignSelf: "center" }}>
						<div className="div__B"><input
							name='startYear'
							type="number"
							value={startYear}
							onChange={handleChange}
							min="1980"
							max={endYear}
						/></div>
						<span style={{ marginLeft: "10px" }} />-<span style={{ marginLeft: "10px" }} />
						<div className="div__B"><input
							name='endYear'
							type="number"
							value={endYear}
							onChange={handleChange}
							min={startYear}
							max={new Date().getFullYear()}
						/></div>
					</div>
				</form>
				<button style={{ marginTop: "10px" }} onClick={handleClick_2}>Запрос</button>
			</div>

			<div>
				<h1>По цене и пробегу</h1>
				<form>
					Цена:
					<div style={{ display: "flex", alignSelf: "center" }}>

						<div className="div__B">
							<input
								name='minValue'
								type="number"
								value={minValue}
								onChange={handleChange}
								min='0'
								max="10000000"
							/></div>
						<span style={{ marginLeft: "10px" }} />-<span style={{ marginLeft: "10px" }} />
						<div className="div__B"><input
							name='maxValue'
							type="number"
							value={maxValue}
							onChange={handleChange}
							min='0'
							max="10000000"
						/></div>
					</div>
					Пробег:
					<div style={{ display: "flex", alignSelf: "center" }}>
						<div className="div__B"><input
							name='minMileage'
							type="number"
							value={minMileage}
							onChange={handleChange}
							min='0'
							max="10000000"
						/></div>
						<span style={{ marginLeft: "10px" }} />-<span style={{ marginLeft: "10px" }} />
						<div className="div__B"><input
							name='maxMileage'
							type="number"
							value={maxMileage}
							onChange={handleChange}
							min='0'
							max="10000000"
						/></div>
					</div>
				</form>
				<button style={{ marginTop: "10px" }} onClick={handleClick_3}>Запрос</button>

			</div>


		</div >

	);
};

export default Scripts_form


// const [startYear, setStartYear] = useState(1980);
// 	const [endYear, setEndYear] = useState(new Date().getFullYear());

// 	const handleStartYearChange = (e: any) => {
// 		setStartYear(e.target.value);
// 	};

// 	const handleEndYearChange = (e: any) => {
// 		setEndYear(e.target.value);
// 	};

// 	const handleClick = () => {
// 		// перейти на новую страницу с параметрами start_year и end_year
// 		window.location.href = `http://localhost:3000/cars/${startYear}/${endYear}`;
// 	};

// 	return (
// 		<div>
// 			<div style={{ display: "flex", justifyContent: "space-between" }}>
// 				<label>
// 					Начальный год:
// 					<input
// 						type="number"
// 						value={startYear}
// 						onChange={handleStartYearChange}
// 						min="1980"
// 						max={endYear}
// 					/>
// 				</label>
// 				<label>
// 					Конечный год:
// 					<input
// 						type="number"
// 						value={endYear}
// 						onChange={handleEndYearChange}
// 						min={startYear}
// 						max={new Date().getFullYear()}
// 					/>
// 				</label>
// 			</div>
// 			<button onClick={handleClick}>Перейти на страницу</button>
// 		</div>
// 	);

// const YearFilter = () => {
// 	const [startYear, setStartYear] = useState(1980);
// 	const [endYear, setEndYear] = useState(new Date().getFullYear());

// 	const handleStartYearChange = (e: any) => {
// 		setStartYear(e.target.value);
// 	};

// 	const handleEndYearChange = (e: any) => {
// 		setEndYear(e.target.value);
// 	};


// };




