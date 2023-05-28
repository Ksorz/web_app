import mongoose from 'mongoose';

export default (app: any, port: number) => {
	mongoose.connect("mongodb+srv://root:Sic2hebun@lisapi.wdomwkf.mongodb.net/Node-API?retryWrites=true&w=majority")
		.then(() => {
			console.log('Подключено к MongoDB')
			app.listen(port, () => {
				console.log(`Приложение слушает порт ${port}`)
			})
		})
		.catch((error: Error) => {
			console.log(`Что-то пошло НЕ ТАК!!! %s`, error)
		});
};




















// _______________________________________________________
// module.exports = (app, port) => { // Настраиваем подключение к базе данных MongoDB
// 	mongoose.connect("mongodb+srv://root:Sic2hebun@lisapi.wdomwkf.mongodb.net/Node-API?retryWrites=true&w=majority") // login (root) password (Sic2hebun) connection name (Node-API)
// 		.then(() => {
// 			console.log('Подключено к MongoDB') // Сообщение после коонекта
// 			app.listen(port, () => { // Запускаем сервер и слушаем на номере порта. Эта функция будет вызвана, когда сервер будет готов принимать запросы
// 			console.log(`Приложение слушает порт ${port}`) // Функция принимает один параметр: функцию обратного вызова, которая выводит сообщение в консоль
// 			})
// 		})
// 		.catch((error) => {
// 			console.log(`Что-то пошло НЕ ТАК!!! %s`, error)
// 		});
// };