// https://play.pokemonshowdown.com/battle-gen9randombattle
// TODO:
    // add url check
    // it runs multiple times
    // getting the opponents team?
    // getting user team wtihout opening switch tab

    
    // fetch("http://localhost:3000/team", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(battleData)
    // })
    let my_result = ""
    let my_rating = 0
    let opponent_rating = 0
    let team = []
    let opponent = ""
    let my_ratingChange = 0
    const today = new Date().toISOString().split('T')[0]
const username = document.querySelector(".username")?.innerText;
let pokemon = ""
const observer = new MutationObserver((mutations) => {
    // Team detection
    const data = document.getElementsByClassName("switchmenu");
    if (data.length > 0) {
        pokemon = Array.from(data[0].children).map(button => button.innerText)
        team = pokemon
    }
    // Check newly added nodes for the win message
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType === 1) {
                const text = node.innerText || "";
                if (text.includes(username + " won the battle")) {
                    my_result = "win";
                    // Opponent name will come from the other rating message
                } else if (text.includes("won the battle")) {
                    my_result = "loss";
                    const strong = node.querySelector("strong");
                    if (strong) {
                        opponent = strong.innerText;
                    }
                }
                 
                 if (text.includes(username) && text.includes("rating:")) {
                     
                     const rating_match = text.match(/→ (\d+)/)
                        if (rating_match) {
                            my_rating = rating_match[1]
                        }
                        const change_match = text.match(/([+-]\d+)/)
                        if (change_match) {
                            my_ratingChange = parseInt(change_match[1])
                        }

                        const battleData = {
                            pokemon: team,
                            result: my_result,
                            rating: parseInt(my_rating),
                            ratingChange: my_ratingChange,
                            opponent: opponent,
                            date: today
                        }

                        fetch("http://localhost:3000/team", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(battleData)
                        })
                     
                 }
               
            }
        }
    }
    
});
observer.observe(document.body, { childList: true, subtree: true });

// {
//     "teams": [
//       {
//         "pokemon": ["Hitmonlee", "Bombirdier", "Gardevoir", "Toxapex", "Dragapult", "Corviknight"],
//         "result": "win",
//         "rating": 1396,
//         "ratingChange": 23,
//         "opponent": "deslant",
//         "date": "2026-02-06"
//       },
//       {
//         "pokemon": ["Swampert", "Conkeldurr", "Indeedee-F", "Cloyster", "Arcanine", "Tinkaton"],
//         "result": "loss",
//         "rating": 1402,
//         "ratingChange": -23,
//         "opponent": "intoxicatedinkay",
//         "date": "2026-02-06"
//       }
//     ]
//   }