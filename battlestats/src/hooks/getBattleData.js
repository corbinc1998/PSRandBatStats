import { useState, useEffect } from 'react';
// Teams (battle-level data)

// http://localhost:3000/teams — all battles
// http://localhost:3000/teams?sort=wins — only winning teams
// http://localhost:3000/teams?sort=loses — only losing teams

// Pokemon (individual Pokemon stats)

// http://localhost:3000/teams/pokemon — all Pokemon sorted by total appearances
// http://localhost:3000/teams/pokemon?sort=wins — Pokemon sorted by most wins
// http://localhost:3000/teams/pokemon?sort=loses — Pokemon sorted by most losses
function useBattleData(endpoint = "teams", sort = null) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    let urlString = ""
//     useBattleData() — all battles
// useBattleData("teams", "wins") — winning teams
// useBattleData("teams/pokemon", "wins") — Pokemon by wins


let url = "http://localhost:3000/" + endpoint;
if (sort) {
    url += "?sort=" + sort;
}

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Status: ${response.status}`);
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [ endpoint, sort, refreshTrigger]);
    const refresh = () => setRefreshTrigger(prev => prev + 1);

    return { data, loading, error, refresh };
}

export default useBattleData;