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
  return `fields name,summary,first_release_date,platforms.name,genres.name,cover.url,videos.video_id,aggregated_rating,aggregated_rating_count,external_games.uid,external_games.external_game_source; 
  where platforms = (6,48,167,49,169) & 
  first_release_date >= 1262304000 & 
  first_release_date < ${now} & 
  aggregated_rating >= 75 & 
  aggregated_rating_count >= 5; 
  sort aggregated_rating desc; 
  limit ${limit}; offset ${offset};`;
}

const getNewsGame = (offset: number, limit: number) => {
  const now = Math.floor(Date.now() / 1000);
  return `fields name,summary,aggregated_rating,aggregated_rating_count,external_games.uid,external_games.external_game_source,first_release_date,platforms.name,genres.name,cover.url,videos.video_id; 
    where platforms = (6,48,167,49,169) &
    first_release_date >= 1262304000 & 
    first_release_date < ${now} &
    parent_game = null &
    aggregated_rating >= 50 &  
    aggregated_rating_count >= 3; 
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
const getPopularLowRatedGames = (offset: number, limit: number) => {
    const now = Math.floor(Date.now() / 1000);

    return `fields name,summary,first_release_date,platforms.name,genres.name,cover.url,videos.video_id,aggregated_rating,aggregated_rating_count,external_games.uid,external_games.external_game_source;
    where platforms = (6,48,167,49,169) &
    first_release_date < ${now} &
    aggregated_rating >= 40 &
    aggregated_rating_count >= 50;
    sort aggregated_rating_count desc;
    limit ${limit}; offset ${offset};`;
};
const formateImg = (url:string) => {
    if(!url) return null;
    return `https:${url.replace('t_thumb', 't_cover_big')}`
}
const getSteamData = async(steamId: string | number) => {
    try{
        let price: number | null = null;
        const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${steamId}&cc=us&l=en`);
        const steamGameData = response.data[steamId]?.data;
        
         if (!response.data || response.data[steamId]?.success === false) {
            return null;
        }
        if (steamGameData.type === 'dlc' || steamGameData.type === 'demo') return null

        if (steamGameData.is_free) {
            price = 0;
        } else if (steamGameData.price_overview?.final) {
            price = steamGameData.price_overview.final; 
        } else {
            price = null;
        }

        return {
            price: price,
            screenshots: steamGameData.screenshots ? steamGameData.screenshots.map((img: any) => img.path_full) : [],
            minReq: steamGameData.pc_requirements.minimum,
            recReq: steamGameData.pc_requirements.recommended,
            recommendations: steamGameData.recommendations?.total || null,
            metacritic: steamGameData.metacritic?.score || null,
            publishers: steamGameData?.publishers || null,
            categorys: steamGameData?.categories?.map((c: any) => c.description) || [],
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
    const finalPrice = steamGame?.price !== null ? steamGame.price / 100 : null;
    const steamScreenshots = steamGame.screenshots?.length > 0 ? steamGame.screenshots : (igbdGame.screenshots?.map((s: any) => formateImg(s.url)).filter(Boolean) || []);
    const steamMeta = (steamGame?.metacritic && steamGame.metacritic > 0) ? steamGame.metacritic : 0;
    const igdbMeta = igbdGame.aggregated_rating ? Math.round(igbdGame.aggregated_rating) : 0;
    const metaScore = steamMeta > 0 ? steamMeta : igdbMeta;
    if (metaScore === 0) {
        return null; 
    }
        return{
        externalId: igbdGame.id,
        name: igbdGame.name,
        description: igbdGame.summary,
        date: releaseDate,
        price: finalPrice,
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
        publishers: steamGame.publishers,
        categorys: steamGame.categorys
    }
}
const upsertGameData = async(formated:any) => {
    try {
        await prisma.game.upsert({
            where: {
                externalId: formated.externalId 
            },
            update: {
                price: formated.price,                
                metaScore: formated.metaScore,
            },
            create: {
                externalId: formated.externalId,
                name: formated.name,
                description: formated.description,
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
                    create: {
                        os: formated.minReq.os,
                        cpu: formated.minReq.cpu,
                        memory: formated.minReq.memory,
                        gpu: formated.minReq.gpu,
                        directX: formated.minReq.directX,
                        storage: formated.minReq.diskspace
                    }
                } : undefined, 
                recReq: formated.recReq ? {
                    create: {
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
                },
                publishers: {
                    connectOrCreate: formated.publishers.map((p:string) => ({
                        where: {name: p},
                        create: {name: p},
                    }))   
                },
                categories: {
                    connectOrCreate: formated.categorys.map((c:string) => ({
                        where: {name: c},
                        create: {name: c},
                    }))
                }
            }
        })
    } catch(error) {
        console.log('Ошибка при отправлении данных', error)
    }
}
const getExistingGameNames = async () => {
    const games = await prisma.game.findMany({
        select: { name: true }
    });
    return new Set(games.map(g => g.name.toLowerCase()));
}
async function fetchGames() {
    const seeNames = await prisma.game.findMany({
        select: { name: true }
    }).then(g => new Set(g.map(x => x.name.toLowerCase())));

    const targets = [
        { generate: getTopGames, limit: 5000 },
        { generate: getNewsGame, limit: 1000 },
        { generate: getUpcomingGames, limit: 500 },
        { generate: getPopularLowRatedGames, limit: 2000 }, // 🔥 НОВЫЙ ТИП
    ];

    for (const item of targets) {
        let count = 0;
        let offset = 0;
        const batchSize = 50;

        while (count <= item.limit) {
            const query = item.generate(offset, batchSize);
            const games = await requestIGDB(query);

            if (!games || games.length === 0) break;

            for (const game of games) {
                const baseName = game.name.toLowerCase().trim();

                const steamId = game.external_games?.find(
                    (ext: any) => ext.external_game_source === 1
                );

                if (seeNames.has(baseName) || !steamId?.uid) {
                    continue;
                }

                await new Promise(r => setTimeout(r, 2000));

                const steamExtraInfo = await getSteamData(steamId.uid);

                if (!steamExtraInfo) {
                    await prisma.game.deleteMany({
                        where: { externalId: game.id }
                    });

                    console.log(`🗑️ Удалена игра (нет Steam): ${game.name}`);
                    continue;
                }

                const formatted = formatedData(game, steamExtraInfo);

                if (!formatted) continue;

                await upsertGameData(formatted);

                seeNames.add(baseName);
                count++;

                console.log(`✅ Собрано: ${game.name} (${count})`);
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