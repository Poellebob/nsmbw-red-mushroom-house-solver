let safeSpaces;
let Maps;
let spw;

document.addEventListener('DOMContentLoaded', () => {
    fetch('../json/data.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            Maps = data["maps"];
            safeSpaces = data["safeSpaces"];
            spw = data["spw"];
            
            // Generate all world combinations
            generateAllCombinations();
        })
        .catch(error => {
            console.error('Error fetching JSON file:', error);
        });
});

function generateAllCombinations() {
    const sprites = {"SM" : "mush", "FF" : "fire", "IF" : "ice", "MM" : "mini", "PS" : "penguin", "PC" : "propeller", "ST" : "star", "Jr" : "jr", "B" : "bowser"};
    const mapLetters = ["A", "B", "C", "D", "E", "F"];
    
    // For each world (1-9)
    for (let world = 1; world <= 9; world++) {
        const worldSection = document.getElementById(`world-${world}-combinations`);
        if (!worldSection) continue; // Skip if section not found
        
        // Clear previous content
        worldSection.innerHTML = '';
        
        // For each map combination (A-F)
        for (let mapIndex = 0; mapIndex < mapLetters.length; mapIndex++) {
            const mapLetter = mapLetters[mapIndex];
            
            // Create a container for this map combination
            const mapContainer = document.createElement('div');
            mapContainer.className = 'map-container';
            
            // Create a title for this map
            const mapTitle = document.createElement('h3');
            mapTitle.textContent = `Map ${mapLetter}`;
            mapContainer.appendChild(mapTitle);
            
            // Create the puzzle grid
            const puzzleGrid = document.createElement('div');
            puzzleGrid.className = 'puzzle';
            
            // Fill in the grid cells
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 6; j++) {
                    const cell = document.createElement('div');
                    cell.className = 'grid';
                    
                    if (safeSpaces[world] && safeSpaces[world][i] && safeSpaces[world][i][j] === 1) {
                        // This is a safe space (green)
                        cell.style.backgroundColor = 'green';
                    }
                    
                    // Add the appropriate sprite image
                    if (Maps[world] && Maps[world][mapLetter] && Maps[world][mapLetter][i] && Maps[world][mapLetter][i][j]) {
                        const spriteType = Maps[world][mapLetter][i][j];
                        if (sprites[spriteType]) {
                            const img = document.createElement('img');
                            img.src = `../sprites/${sprites[spriteType]}.png`;
                            img.style.width = '90%';
                            cell.appendChild(img);
                        }
                    }
                    
                    puzzleGrid.appendChild(cell);
                }
            }
            
            mapContainer.appendChild(puzzleGrid);
            worldSection.appendChild(mapContainer);
        }
    }
}
