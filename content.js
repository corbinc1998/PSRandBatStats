// https://play.pokemonshowdown.com/battle-gen9randombattle


const observer = new MutationObserver(() => {
    const data = document.getElementsByClassName("switchmenu");
    if (data.length > 0) {
        const myTeam = data[0].innerText;
        console.log("my team:" + myTeam);
        
    }
});

observer.observe(document.body, { childList: true, subtree: true });