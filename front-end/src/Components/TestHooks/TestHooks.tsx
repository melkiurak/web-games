import { useFilter } from "@/hooks/useFilter";
import { MOCK_GAME_CARDS } from "@/mocks/game";
import { GameCardPreview } from "@/types";

export const TestHook = () => {
    const { filterGames, selectedGenres, selectedPlatforms, toggleGenre, togglePlatform } = useFilter<GameCardPreview>(MOCK_GAME_CARDS);

    const testGenres = ["RPG", "Action", "Shooter", "Adventure"];
    const testPlatforms = ["PC", "PS5", "Xbox Series X", "Nintendo Switch"];
    return (
        <div style={{ padding: '20px', background: '#1a1a1a', color: 'white', borderRadius: '8px' }}>
            <h2>🧪 Тест Хука Фильтрации</h2>
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                {testGenres.map(genre => (
                    <button 
                        key={genre}
                        onClick={() => toggleGenre(genre)}
                        style={{
                            padding: '10px',
                            backgroundColor: selectedGenres.includes(genre) ? '#FF5733' : '#333',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {genre}
                    </button>
                ))}
            </div>
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                {testPlatforms.map(platform => (
                    <button 
                        key={platform}
                        onClick={() => togglePlatform(platform)}
                        style={{
                            padding: '10px',
                            backgroundColor: selectedPlatforms.includes(platform) ? '#3498db' : '#333',
                            color: 'white', border: 'none', cursor: 'pointer'
                        }}
                    >
                        {platform}
                    </button>
                ))}
            </div>
            <div style={{ borderBottom: '1px solid #444', marginBottom: '10px', paddingBottom: '10px' }}>
                <p>Жанры: <b>{selectedGenres.join(', ') || 'Все'}</b></p>
                <p>Платформы: <b>{selectedPlatforms.join(', ') || 'Все'}</b></p>
                <p>Найдено игр: <b>{filterGames.length}</b></p>
            </div>
            <div>
                {filterGames.map(game => (
                    <div key={game.id} style={{ fontSize: '14px', marginBottom: '5px' }}>
                        🎮 {game.name} <span style={{ color: '#888' }}>({game.genres.join(', ')})</span>
                    </div>
                ))}
            </div>
        </div>
    );
};