// export {};

// .animated-button {
// 	width: 100px;
// 	height: 40px;
// 	border: none;
// 	background-color: #4CAF50;
// 	color: white;
// 	font-size: 16px;
// 	cursor: pointer;
// }

// .animated-button:hover {
// 	animation: pulse 1s infinite;
// }

// @keyframes pulse {
// 	0% {
// 	transform: scale(1);
// 	box-shadow: none;
// 	}

// 	50% {
// 	transform: scale(1.1);
// 	box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
// 	}

// 	100% {
// 	transform: scale(1);
// 	box-shadow: none;
// 	}
// }

// .divB {
// float:right;
// width:300px;
// margin-left:20px;
// }

// .divB input {
// width: 100%;

// /* Reset CSS */
// box-sizing: border-box;
// margin: 0;
// /* End Reset CSS */
// }

// .divB form {
// display: flex;
// flex-direction: column;
// width: 300px;
// margin-bottom: 20px;
// }

// .divB label {
// display: flex;
// justify-content: space-between;
// margin-bottom: 10px;
// }

// .divMain {
// overflow:hidden; /* will contain if #first is longer than #second */
// }
// .divMain div {
// margin-bottom:-99999px; /* fix for white-space between divs */
// padding-bottom:99999px; /* fix for white-space between divs */
// }
// .divMain div:first-child {
// float:left; /* add this */
// }

// .table-container {
// clear:both; /* add this */
// }

// .table-container table {
// border-collapse: collapse;
// width: 100%;
// }

// .table-container th, td {
// border: 1px solid black;
// padding: 10px;
// text-align: left;
// }


// <div class='divB'>

// 			<form action="/cars/:serviceable" method='GET'>
// 			<label for='serviceable'>Исправен<input type='checkbox' id='serviceable' name='serviceable' checked></label>
// 			<button type='submit' class='animated-button'>Показать</button>
// 			</form>
			
// 			<form action="/cars/:start_year/:end_year" method='GET'>
// 			<label for='start_year'>Год: 
// 				<input type='number' id='start_year' name='start_year' min='1980' max='${new Date().getFullYear()}' value='1980'>
// 				-
// 				<input type='number' id='end_year' name='end_year' min='1980' max='${new Date().getFullYear()}'>
// 			</label>
// 			<button type='submit' class='animated-button'>Показать</button>
// 			</form>
			
// 			<form action="/cars/:min_value/:max_value/:min_mileage/:max_mileage" method='GET'>
// 			<label for='min_value'>Стоимость: 
// 				<input type='number' id='min_value' name='min_value' min='0' max='10000000' value='0'>
// 				-
// 				<input type='number' id='max_value' name='max_value' min='0' max='10000000'>
// 			</label>
			
// 			<label for='min_mileage'>Пробег: 
// 				<input type='number' id='min_mileage' name='min_mileage' min='0' max='1000000' value='0'>
// 				-
// 				<input type='number' id='max_mileage' name='max_mileage' min='0' max='1000000'>
// 			</label>
			
// 			<button type='submit' class='animated-button'>Показать</button>
// 			</form>
		
// 		</div>

export const cars_html = ` 
<!DOCTYPE html>
<html lang="ru">



<head>
  <meta charset="UTF-8">
  <title>Автомобили</title>
  <style>

		



		table {
			border-collapse: collapse;
			width: 100%;
		}

		th, td {
			border: 1px solid black;
			padding: 10px;
			text-align: left;
		}

		form {
			display: flex;
			flex-direction: column;
			width: 300px;
			margin-bottom: 20px;
		}

		label {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;
		}

		input {
			width: 200px;
		}

		button {
			width: 100px;
			align-self: center;
		}

		.divMain:after {
			content: '';
			display: block;
			clear: both;
		}
		.divB {
			overflow: hidden;
		}
		.divB input {
			width: 100%;
		
			/* Reset CSS */
			box-sizing: border-box;
			margin: 0;
			/* End Reset CSS */
		}

	 


  </style>
</head>
<body>
	<div>
		<div>

			<h1>Автомобили</h1>
			<form action="/cars" method="POST">
				<label for="model">Модель:<input type="text" id="model" name="model" required></label>
				<label for="mileage">Пробег:<input type="number" id="mileage" name="mileage" required min="0" max="1000000"></label>
				<label for="year">Год:<input type="number" id="year" name="year" required min="1980" max="${new Date().getFullYear()}"></label>
				<label for="color">Цвет:<select id="color" name="color" required>
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
				</select></label>
				<label for="estimated_value">Стоимость:<input type="number" id="estimated_value" name="estimated_value" required min="0" max="10000000"></label>
				<label for="serviceable">Исправен<input type="checkbox" id="serviceable" name="serviceable" checked></label>
				<button type="submit">Добавить</button>
			</form>

		</div>

		
	</div>





	<table>
		<thead>
		<div class="divMain">
			<tr>
				<th>Название</th>
				<th>Пробег</th>
				<th>Год</th>
				<th>Цвет</th>
				<th>Стоимость</th>
				<th>Исправен</th>
				<th>Удалить</th>
				<th>Изменить</th>
			</tr>
		</div>
		</thead>
		<tbody>
			{{cars}}
		</tbody>
	</table>
</body>
</html>
`;

// export default cars_html

// module.exports = {
// 	cars_html: function () {
// 		return cars_html
// 	},
// 	update_car_html: function () {
// 		// return update_car_html
// 	},
// 	function3: function () {
// 		// код функции 3
// 	}
// };


// const cars_html = ` 
// <!DOCTYPE html>
// <html lang="ru">



// <head>
//   <meta charset="UTF-8">
//   <title>Автомобили</title>
//   <style>
//     table {
//       border-collapse: collapse;
//       width: 100%;
//     }

//     th, td {
//       border: 1px solid black;
//       padding: 10px;
//       text-align: left;
//     }

//     form {
//       display: flex;
//       flex-direction: column;
//       width: 300px;
//       margin-bottom: 20px;
//     }

//     label {
//       display: flex;
//       justify-content: space-between;
//       margin-bottom: 10px;
//     }

//     input {
//       width: 200px;
//     }

//     button {
//       width: 100px;
//       align-self: center;
//     }

// 	 .divMain:after {
// 		content: '';
// 		display: block;
// 		clear: both;
// 	 }
// 	 .divB {
// 		overflow: hidden;
// 	 }
// 	 .divB input {
// 		width: 100%;
	 
// 		/* Reset CSS */
// 		box-sizing: border-box;
// 		margin: 0;
// 		/* End Reset CSS */
// 	 }
//   </style>
// </head>
// <body>

// 	<h1>Автомобили</h1>
// 	<form action="/cars" method="POST">
// 		<label for="model">Модель:<input type="text" id="model" name="model" required></label>
// 		<label for="mileage">Пробег:<input type="number" id="mileage" name="mileage" required min="0" max="1000000"></label>
// 		<label for="year">Год:<input type="number" id="year" name="year" required min="1980" max="${new Date().getFullYear()}"></label>
// 		<label for="color">Цвет:<select id="color" name="color" required>
// 			<option value="gray">Серый</option>
// 			<option value="black">Черный</option>
// 			<option value="white">Белый</option>
// 			<option value="blue">Синий</option>
// 			<option value="red">Красный</option>
// 			<option value="silver">Серебристый</option>
// 			<option value="green">Зеленый</option>
// 			<option value="orange">Оранжевый</option>
// 			<option value="yellow">Желтый</option>
// 			<option value="bronze">Бронзовый</option>
// 		</select></label>
// 		<label for="estimated_value">Стоимость:<input type="number" id="estimated_value" name="estimated_value" required min="0" max="10000000"></label>
// 		<label for="serviceable">Исправен<input type="checkbox" id="serviceable" name="serviceable" checked></label>
// 		<button type="submit">Добавить</button>
// 	</form>


// 	<table>
// 		<thead>
// 		<div class="divMain">
// 			<tr>
// 				<th>Название</th>
// 				<th>Пробег</th>
// 				<th>Год</th>
// 				<th>Цвет</th>
// 				<th>Стоимость</th>
// 				<th>Исправен</th>
// 				<th>Удалить</th>
// 				<th>Изменить</th>
// 			</tr>
// 		</div>
// 		</thead>
// 		<tbody>
// 			{{cars}}
// 		</tbody>
// 	</table>
// </body>
// </html>
// `;

// module.exports = {
// 	cars_html: function () {
// 		return cars_html
// 	},
// 	update_car_html: function () {
// 		// return update_car_html
// 	},
// 	function3: function () {
// 		// код функции 3
// 	}
// };