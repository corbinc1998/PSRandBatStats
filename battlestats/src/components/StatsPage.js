import {Image } from 'react-bootstrap';
import "./StatsPage.css"
import getBattleData from '../hooks/getBattleData';

const StatsPage = () => {
    const { data, loading, error } = getBattleData();
    
    // console.log(data.teams[0].pokemon[0])
    if (loading)
    {
        <div>Loading...</div>
    }

    if (error)
    {
        return <div>Error :(</div>
    }

    if (!data || data.length === 0)
    {
        return<div>No content avaliable :(</div>
    }

    return<div>
        {data.teams.map((battle, index) => (
            <div key={index}>

                <p>{battle.opponent} - {battle.result} - {battle.rating}</p>
                <div id='teamGroup'>
                {battle.pokemon.map((pokemon, index) => (
                    
                    <div key={index}>
                        
                                        <p><img src={`https://play.pokemonshowdown.com/sprites/gen5/${pokemon.toLowerCase()}.png`} alt={pokemon} />{pokemon}</p>

                     </div>
                         ))}
                         </div>
             
            </div>
    ))}
    </div>


}

export default StatsPage;