export const createGame = (req:any, res:any) => {
    console.log("Запрос пришёл")
    console.log(req.body)
    try{
        if(!req.body.name) {
            res.status(400).json({
                error: 'Name is required'
            })
            return;
        } 
        res.status(201).json({
            message: 'Game Created'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Server error'
        })
    }
}