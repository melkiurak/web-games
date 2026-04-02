import axios from "axios";

const getToken = async() => {
    try{
        const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
            params:{
                client_id: process.env.TWITCH_CLIENT_ID,
                client_secret:  process.env.TWITCH_CLIENT_SECRET,
                grant_type: 'text/plain'
            }
        })
        return response.data.access_token
    } catch(error){
        console.log('Ошибка при получение данных', error)
    }
}

const getTopGames = (offset:number) => {
    return `fields name, summary, rating, first_release_date, platforms.name, genres.name, cover.url, videos.video_id, screenshots.url; where platforms = (6, 48, 167, 49, 169) & category = 0 & rating > 80 & rating_count > 100; sort rating desc; limit 100; offset ${offset};`
}
const getNewsGame  = (offset:number) => {
    return `fields name, summary, rating, first_release_date, platforms.name, genres.name, cover.url, videos.video_id, screenshots.url;  where platforms = (6, 48, 167, 49, 169) & category = 0 & rating > 60 & rating_count > 100 & first_release_date >= 1577836800 & first_release_date <= 1735689600; sort rating desc; limit 100;  offset ${offset};`
}
const getUpcomingGames  = (offset:number) => {
    return `fields name, summary, first_release_date, platforms.name, genres.name, cover.url, videos.video_id, screenshots.url; where platforms = (6, 48, 167, 49, 169) & category = 0 & first_release_date > ${Math.floor(Date.now() / 1000)}; sort follows desc; limit 100; offset ${offset};`
}
const generators = [getTopGames, getNewsGame, getUpcomingGames];

async function fetchGames() {
    for(const generate of generators) {
        for(let i = 0; i < 500; i += 100){
            const query = generate(i)
            console.log("Отправляю запрос:", query);
        }
    }
}
