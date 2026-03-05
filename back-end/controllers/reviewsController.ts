const reviews = [
    {id:0, gameId:"Game0", author: 'Danila', text:'Lorem 0'},
    {id:1, gameId:"Game1", author: 'Alna', text:'Lorem 1'},
    {id:2, gameId:"Game2", author: 'Sanina', text:'Lorem 2'},
]
const getReviews = ({req, res}:any) => {
    res.json(reviews);
}
const addReview = ({req, res}:any) => {
    const {gameId, author, text} = req.body;
    const newGame = {id: Date.now(), gameId, author, text}
    reviews.push(newGame);
    res.status(201).json(newGame);
}
export {getReviews, addReview}