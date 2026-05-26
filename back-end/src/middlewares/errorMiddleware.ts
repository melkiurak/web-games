
export const globalErrorHandler = ({err, req, res, next} : any) => {
    console.error(err.stack);
    
    if(process.env.NODE_ENV === 'production') {
        res.json({
            success: 'false',
            message: 'Internal Server Error',
        })
        return
    }
    res.status(500).json({
        success: 'false',
        message: 'Internal Server Error',
        devInfo: err.message,
    })
}