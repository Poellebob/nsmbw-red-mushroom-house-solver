let safeSpaces;
let Maps;
let spw;

document.addEventListener('DOMContentLoaded', () => {
    fetch('json/data.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            Maps = data["maps"];
            safeSpaces = data["safeSpaces"];
            spw = data["spw"];
        })
        .catch(error => {
            console.error('Error fetching JSON file:', error);
        });
});

document.getElementById("World").addEventListener("change", function() {
    
    const puzzleContainer = document.getElementById("Puzzle");
    puzzleContainer.innerHTML = "";
    const world = parseInt(this.value);

    let safenum = 0;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 6; j++) {
            if (safeSpaces[world][i][j] === 0) {
                const div = document.createElement("div");
                div.id = "grid";
                div.className = `${i}${j}`;

                puzzleContainer.appendChild(div);
            } else {
                const button = document.createElement("button");
                button.innerHTML = '<img src="sprites/mark.png" width="90%">';
                button.value = "mark";

                button.addEventListener("click", function() {
                    if (this.value === "mark") {
                        this.innerHTML = '<img src="sprites/mush.png" width="90%">';
                        this.value = "SM";
                    } else if (this.value === "SM") {
                        this.innerHTML = '<img src="sprites/fire.png" width="90%">';
                        this.value = "FF";
                    } else if (this.value === "FF") {
                        this.innerHTML = '<img src="sprites/ice.png" width="90%">';
                        this.value = "IF";
                    } else if (this.value === "IF") {
                        this.innerHTML = '<img src="sprites/mini.png" width="90%">';
                        this.value = "MM";
                    } else if (this.value === "MM") {
                        this.innerHTML = '<img src="sprites/penguin.png" width="90%">';
                        this.value = "PS";
                    } else if (this.value === "PS") {
                        this.innerHTML = '<img src="sprites/propeller.png" width="90%">';
                        this.value = "PC";
                    } else if (this.value === "PC") {
                        this.innerHTML = '<img src="sprites/star.png" width="90%">';
                        this.value = "ST";
                    } else if (this.value === "ST") {
                        this.innerHTML = '<img src="sprites/jr.png" width="90%">';
                        this.value = "Jr";
                    } else if (this.value="Jr"){
                        this.innerHTML = '<img src="sprites/mush.png" width="90%">';
                        this.value = "SM";
                    }
                });
                button.style.backgroundColor = "green";
                button.style.cursor = "pointer";
                button.id = "grid";
                button.name = "safe" + safenum;
                safenum++;

                puzzleContainer.appendChild(button);
            }
        }
    }
});

document.getElementById("solve").addEventListener("click", function() {
    const puzzleContainer = document.getElementById("Puzzle");
    const world = document.getElementById("World").value;
    const mapss = ["A", "B", "C", "D", "E", "F"];
    const sprites = {"SM" : "mush","FF" : "fire", "IF" : "ice", "MM" : "mini", "PS" : "penguin", "PC" : "propeller", "ST" : "star", "Jr" : "jr", "B" : "bowser"};
    let puzzle = [];
    let check = [];
    let safenum = 0;
    let map = 0;

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 6; j++){

            if (safeSpaces[world][i][j] === 0) {
                continue;
            }else{
                puzzle[safenum] = document.getElementsByName("safe" + safenum)[0].value;
                safenum++;
            } 
        }
    }
    
    let indx = 0;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 6; j++){
            
            if (safeSpaces[world][i][j] === 0) {
                continue;
            }else{
                check[indx] = [i, j];
                indx++;
            }
        }
    }

    for(map = 0; map < 6; map++){
        let ck_temp= [];
        let found = true;

        for(let i = 0; i < indx; i++){
            ck_temp[i] = Maps[world][mapss[map]][check[i][0]][check[i][1]];
        }
        
        for(let i = 0; i < indx; i++){
            if(ck_temp[i] != puzzle[i]) {
                found = false;
                break;
            }
        }

        if(found){break;}
    }
    console.log("map: " + mapss[map]);
    
    console.log(check);
    let indx_1 = 0;
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 6; j++){
            if(i == check[indx_1][0] && j == check[indx_1][1]){
                if(spw[world] > indx_1 + 1){
                    indx_1++;
                }
                console.log([i, j]);
                continue;
            }else{
                console.log([i, j]);
                var innerHTML;
                
                if(map == 6){
                    innerHTML = '<img src="sprites/mark.png" width="90%">';
                }else{
                    innerHTML = '<img src="sprites/' + sprites[Maps[world][mapss[map]][i][j]] + '.png" width="90%">';
                    console.log(innerHTML + " : " + Maps[world][mapss[map]][i][j]);
                }
                document.getElementsByClassName(i.toString() + j.toString())[0].innerHTML = innerHTML;
            }
        }
    }
});
