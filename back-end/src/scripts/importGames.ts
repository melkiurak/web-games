import axios, { all, get } from "axios";
import "dotenv/config";
import { prisma } from "../database/client";


const getToken = async() => {
    try{
        const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
            params:{
                client_id: process.env.TWITCH_CLIENT_ID,
                client_secret:  process.env.TWITCH_CLIENT_SECRET,
                grant_type: 'client_credentials'
            }
        })
        return response.data.access_token
    } catch(error){
        console.log('Ошибка при получение токена', error)
    }
}

const getTopGames = (offset: number, limit: number) => {
  const now = Math.floor(Date.now() / 1000);
  return `fields name,summary,first_release_date,platforms.name,genres.name,cover.url,videos.video_id,aggregated_rating,aggregated_rating_count,total_rating,total_rating_count,external_games.uid,external_games.external_game_source; 
  where platforms = (6,48,167,49,169) & 
  first_release_date >= 1262304000 & 
  first_release_date < ${now} & 
  total_rating >= 75 & 
  total_rating_count >= 100; 
  sort total_rating desc; 
  limit ${limit}; offset ${offset};`;
}

const getNewsGame = (offset: number, limit: number) => {
  const now = Math.floor(Date.now() / 1000);
  return `fields name,summary,total_rating,total_rating_count,external_games.uid,external_games.external_game_source,first_release_date,platforms.name,genres.name,cover.url,videos.video_id,aggregated_rating; 
    where platforms = (6,48,167,49,169) &
    first_release_date >= 1262304000 & 
    first_release_date < ${now} &
    parent_game = null &
    total_rating >= 55 &  
    total_rating_count >= 10; 
    sort first_release_date desc; 
    limit ${limit}; offset ${offset};`;
}

const getUpcomingGames = (offset: number, limit: number) => {
  const now = Math.floor(Date.now() / 1000);
  return `fields name,summary,hypes,first_release_date,platforms.name,genres.name,cover.url,videos.video_id,external_games.uid,external_games.external_game_source; 
    where platforms = (6,48,167,49,169) & 
    (first_release_date > ${now}) &
    version_parent = null &
    hypes >= 30; 
    sort first_release_date asc; 
    limit ${limit}; offset ${offset};`;
}

const formateImg = (url:string) => {
    if(!url) return null;
    return `https:${url.replace('t_thumb', 't_cover_big')}`
}
const getSteamData = async(steamId: string | number) => {
    try{
        const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${steamId}&cc=us&l=en`);
        if(!response.data || response.data[steamId]?.success === false) {
            console.log('Такую игру не нашёл')
            return null;
        }
        const steamGameData = response.data[steamId]?.data;
        if (steamGameData.type === 'dlc' || steamGameData.type === 'demo') return null
        return {
            price: steamGameData.is_free ? 0 : (steamGameData.price_overview?.final || 0),
            screenshots: steamGameData.screenshots ? steamGameData.screenshots.map((img: any) => img.path_full) : [],
            minReq: steamGameData.pc_requirements.minimum,
            recReq: steamGameData.pc_requirements.recommended,
            recommendations: steamGameData.recommendations?.total || null,
            metacritic: steamGameData.metacritic?.score || null
        }
    } catch(error) {
        console.log('Ошибка при получения стим игр',error);
        return null;
    }
}
const requestIGDB = async(query:string) => {
    const token = await getToken();
    try{
        const response = await axios.post('https://api.igdb.com/v4/games', query, {
            headers:{
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'text/plain'
            }
        })
        return response.data;
    } catch (error) {
        console.log('Error to get of data', error)
    }
}
const parseSteamReq = (html:string) => {
    const keysReq: Record<string, string> = {
        'OS:': 'os',
        'Processor:': 'cpu',
        'Memory:': 'memory',
        'Graphics:': 'gpu',
        'DirectX:': 'directX',
        'Storage:': 'diskspace'
    };
    const req: Record<string, string> = {os: 'TBT', cpu: 'TBT', memory: 'TBT', gpu: 'TBT', directX: 'TBT', diskspace: 'TBT'};
    const parts = html.split('<strong>');
    parts.forEach((part) => {
        Object.keys(keysReq).forEach((key) => {
            if(part.includes(key)){
                const targetField = keysReq[key]; 
                req[targetField] = part.replace(key, '').replace(/<[^>]*>/g, '').trim();
            }
        })
    });
    return req
}
const formatedData = (igbdGame:any, steamGame: any) => {
    const releaseDate = igbdGame.first_release_date ? new Date(igbdGame.first_release_date * 1000) : new Date();
    const posterUrl = formateImg(igbdGame.cover?.url) || '';
    const trailerUrl = igbdGame.videos?.[0] ? [`https://www.youtube.com/watch?v=${igbdGame.videos?.[0].video_id}`] : [];
    const finalPrice = steamGame?.price ? steamGame?.price / 100 : 0;
    const steamScreenshots = steamGame.screenshots?.length > 0 ? steamGame.screenshots : (igbdGame.screenshots?.map((s: any) => formateImg(s.url)).filter(Boolean) || []);
    const metaScore = (steamGame?.metacritic && steamGame.metacritic > 0) ? steamGame.metacritic : (igbdGame.aggregated_rating || igbdGame.total_rating || 0);
        return{
        externalId: igbdGame.id,
        name: igbdGame.name,
        description: igbdGame.summary,
        date: releaseDate,
        price: finalPrice,
        totalRating: igbdGame.total_rating ? Math.round(igbdGame.total_rating * 10) / 10 : null ,
        totalRatingCount: igbdGame.total_rating_count || 0,
        aggregatedRating: igbdGame.aggregated_rating ? Math.round(igbdGame.aggregated_rating * 10) / 10 : null,
        aggregatedRatingCount: igbdGame.aggregated_rating_count || 0,
        metaScore: metaScore,
        recommendations: steamGame?.recommendations || 0,
        hypes: igbdGame.hypes || 0,
        platforms: igbdGame.platforms?.map((p:any) => p.name) || [],
        genres: igbdGame.genres?.map((g:any) => g.name) || [],
        poster: posterUrl,
        trailer: trailerUrl,
        screenshots: steamScreenshots,
        minReq: parseSteamReq(steamGame?.minReq || ''),
        recReq: parseSteamReq(steamGame?.recReq || ''),
    }
}
const upsertGameData = async(formated:any) => {
    try{
        await prisma.game.upsert({
            where: {
                externalId: formated.externalId 
            },
            update: {
                price: formated.price,
                totalRating: formated.totalRating,
                totalRatingCount: formated.totalRatingCount,
                metaScore: formated.metaScore,
            },
            create: {
                externalId: formated.externalId,
                name: formated.name,
                description: formated.description,
                totalRating: formated.totalRating,            
                totalRatingCount: formated.totalRatingCount,
                aggregatedRatingCount: formated.aggregatedRatingCount,
                metaScore: formated.metaScore,
                recommendations: formated.recommendations,
                hypes: formated.hypes,
                poster: formated.poster,
                screenshots: formated.screenshots,
                trailer: formated.trailer,
                price: formated.price,
                date: formated.date,
                minReq: formated.minReq ? {
                    create:{
                        os: formated.minReq.os,
                        cpu: formated.minReq.cpu,
                        memory: formated.minReq.memory,
                        gpu: formated.minReq.gpu,
                        directX: formated.minReq.directX,
                        storage: formated.minReq.diskspace
                    }
                } : undefined, 
                recReq: formated.recReq ? {
                    create:{
                        os: formated.recReq.os,
                        cpu: formated.recReq.cpu,
                        memory: formated.recReq.memory,
                        gpu: formated.recReq.gpu,
                        directX: formated.recReq.directX,
                        storage: formated.recReq.diskspace
                    }
                } : undefined,                           
                genres: {
                    connectOrCreate: formated.genres.map((g:string) => ({
                        where: {name: g},
                        create: {name: g}
                    }))
                },
                platforms: {
                    connectOrCreate: formated.platforms.map((p:string) => ({
                        where: {name: p},
                        create: {name: p},
                    }))
                }
            }
        })

    } catch(error) {
        console.log('Ошибка при отправление данных', error)
    }
}
const getExistingGameNames = async () => {
    const games = await prisma.game.findMany({
        select: { name: true }
    });
    return new Set(games.map(g => g.name.toLowerCase()));
}
async function fetchGames() {
    const seeNames = await getExistingGameNames();
    const targets = [
        {generate: getTopGames, limit: 3000},
        {generate: getNewsGame, limit: 1000},
        {generate: getUpcomingGames, limit: 500},
    ]
    for(const item of targets) {
        let count = 0;
        let offset = 0;
        const batchSize = 50;
        while (count <= item.limit) {
            const query = item.generate(offset, batchSize);
            const games = await requestIGDB(query);

            if (!games || games.length === 0) break;
            for(const game of games) {
                const baseName = game.name.toLowerCase().trim();
    
                const steamId = game.external_games?.find((ext: any) => ext.external_game_source === 1);
    
                if (seeNames.has(baseName) || !steamId?.uid) {
                    console.log(`⏩ Пропуск: ${game.name} (уже в списке или нет в Steam)`);
                    continue;
                }
    
                await new Promise(resolve => setTimeout(resolve, 2000));
                const steamExtraInfo = await getSteamData(steamId.uid);
    
                if (steamExtraInfo !== null) {
                    const formatted = formatedData(game, steamExtraInfo);
                    await upsertGameData(formatted)
                    seeNames.add(baseName);
                    count++;
                    console.log(`✅ Собрано: ${game.name} (${count}/5)`);
                } else {
                    console.log(`❌ Ошибка данных Steam для: ${game.name}`);
                }

            }
            offset += batchSize;
        }
    }
}
const start = async () => {
  try {
    await fetchGames();
    console.log("🎉 Все данные успешно обработаны!");
  } catch (err) {
    console.error("🛑 Ошибка:", err);
  } finally {
    await prisma.$disconnect();
  }
};

start()