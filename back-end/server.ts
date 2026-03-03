import express from 'express'; // Импорт бибилотеки

const app = express(); // Создание сервера
const PORT = 5000 // Создание порта
app.get('/A', (req, res) => { // Тут мы пишем что хотим получить по порту сообщение сосал, но я таки не понял зачем нам req, типо  res нужнна для отображение сообещением
    res.send("Сосал?")
})
app.listen(PORT, () =>{ // Тут мы просто выводим в консоль то что надо случать порт и если всё правлиьно оно нам выводит сообщение потому что оно его услышало
    console.log('Server is running')
});
app.put('/users/1', (req, res) => {
    res.send("User updated");
});
app.delete('/users/1', (req, res) => {
    res.send("User deleted");
});