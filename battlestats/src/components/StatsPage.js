import {Image } from 'react-bootstrap';
import "./StatsPage.css"
import getBattleData from '../hooks/getBattleData';
import { useState } from 'react';

import StandardDropdownButton from './buttons/StandardDropdownButton';



const StatsPage = () => {
const [endpoint, setEndPoint] = useState('teams')
const [sort, setSort] = useState(null)
    const { data, loading, error, refresh } = getBattleData(endpoint, sort);

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

    return <div>
        <div id='buttonGroup'>
<StandardDropdownButton
    label="Teams" 
    options={[
        { label: "All", action: () => { setEndPoint('teams'); setSort(null); }},
        { label: "Wins", action: () => { setEndPoint('teams'); setSort('wins'); }},
        { label: "Losses", action: () => { setEndPoint('teams'); setSort('loses'); }}
    ]} 
/>


<StandardDropdownButton 
    label="Pokemon" 
    options={[
        { label: "All", action: () => { setEndPoint('teams/pokemon'); setSort(null); }},
        { label: "Wins", action: () => { setEndPoint('teams/pokemon'); setSort('wins'); }},
        { label: "Losses", action: () => { setEndPoint('teams/pokemon'); setSort('loses'); }}
    ]} 
/>

</div>
    {endpoint === 'teams' && (
        data.teams?.map((battle, index) => (
            <div key={index}>
                <p>{battle.opponent} - {battle.result} - {battle.rating}</p>
                <div id='teamGroup'>
                    {battle.pokemon.map((pokemon, index) => (
                        <div key={index}>
                            <p><img src={`https://play.pokemonshowdown.com/sprites/gen5/${pokemon.toLowerCase().replace(/ /g, '').replace(/-/g, '')}.png`} alt={pokemon} />{pokemon}</p>
                        </div>
                    ))}
                </div>
            </div>
        ))
    )}



{endpoint === 'teams/pokemon' && (
    <>
        <p>{data.total} unique Pokemon</p>
        {data.pokemon?.map((pokemon, index) => (
            <div key={index}>
                <p>{pokemon.name} - {pokemon.amount + " " + (sort || "appearances")} <img src={`https://play.pokemonshowdown.com/sprites/gen5/${pokemon.name.toLowerCase().replace(/ /g, '').replace(/-/g, '')}.png`} alt={pokemon.name} /></p>
            </div>
        ))}
    </>
)}
</div>


}

export default StatsPage;