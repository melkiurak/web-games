export const checkRequiremets = (req:any, res:any) => {
    try{
        const { gameRam, userRam} = req.body;
        if(!req.body.gameRam){
            res.status(400).json({
                error: 'Provide RAM data'
            })
            return;
        }
        if(userRam >= gameRam) {
            return res.status(200).json({
                result: 'PC is okay'
            })
        }
        return res.status(200).json({
            result: "Low RAM"
        })
    } catch (error) {
        res.status(500).json({
            error: 'Server error'
        })
    }   
}