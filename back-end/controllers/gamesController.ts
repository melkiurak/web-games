
export const createGame = (req:any, res:any) => {
    console.log("Запрос пришёл")
    console.log(req.body)
    if(!req.body.name) {
        res.status(400).json({
            error: 'Name is required'
            
        })
        return;
    } 
    res.status(201).json({
        message: 'Game Created'
    });

}