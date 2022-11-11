async function buttonClick() {
    const text = document.getElementById("pokemonText");
    const sprite = document.getElementById("pokemonSprite");
    var pokeCode = await getPokemon(text.value);
    sprite.src = pokeCode.sprites.front_default
    const data = {
        labels: grabStatsName(pokeCode),
        datasets: [
            {
                label: pokeCode.species.name,
                data: grabStatsValue(pokeCode),
                borderColor: "#A020F0",
                backgroundColor: "rgba(160,32,240, 0.60)",
            },

        ]
    };
    const config = {
        type: 'radar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Pokemon Stats'
                }
            },
            scales: {
                r: {
                    suggestedMin: 0,
                }
            }
        },
    }; 
    if(window.mychart != undefined){
        window.mychart.destroy();
    }
    window.mychart = new Chart(
        document.getElementById('myChart'),
        config
    );
}
async function getPokemon(name) {
    var pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return await pokeData.json();
}

function grabStatsName(pokeCode) {
    var stats = pokeCode.stats
    let pokeNames = [];
    for (i = 0; i < stats.length; i++) {
        var stating = stats[i].stat.name;
        pokeNames.push(stating);
    }
    return pokeNames
}
function grabStatsValue(pokeCode) {
    var stats = pokeCode.stats
    let pokeStats = [];
    for (i = 0; i < stats.length; i++) {
        var stating = stats[i].base_stat;
        pokeStats.push(stating);
    }
    return pokeStats
}
