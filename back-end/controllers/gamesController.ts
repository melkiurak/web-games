export const createGame = (req:any, res:any) => {
    console.log("Запрос пришёл")
    console.log(req.body)
    res.send('Game Created')
}