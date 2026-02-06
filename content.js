// https://play.pokemonshowdown.com/battle-gen9randombattle
// TODO:
    // add url check

    


const username = document.querySelector(".username")?.innerText || "*******";

const observer = new MutationObserver((mutations) => {
    // Team detection
    const data = document.getElementsByClassName("switchmenu");
    if (data.length > 0) {
        console.log("my team:" + data[0].innerText);
    }

    // Check newly added nodes for the win message
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType === 1) {
                const text = node.innerText || "";
                if (text.includes(username + " won the battle")) {
                    window.alert("YOU WON!");
                } else if (text.includes("won the battle")) {
                    window.alert("YOU LOST!");
                }
                // Catch the rating changes too
                if (text.includes("rating:")) {
                    console.log("rating: " + text);
                }
            }
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });



{/* <div class="battle-history"><strong>deslant</strong> won the battle!<br></div>
<div class="chat">deslant's rating: 1373 → <strong>1396</strong><br>(+23 for winning)</div>


<div class="chat">******'s rating: 1425 → <strong>1402</strong><br>(-23 for losing)</div> */}



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


// edit teams.json

const jsonDataBefore = require('/teams.json');
console.log('Before updating JSON:');
console.log(JSON.stringify(jsonDataBefore, null, 2));