class Trainer {
 
    constructor(name,age,Pokemons,friends){
        this.name = name;
        this.age = age; 
        this.Pokemon = [];
        this.Friends = [] ;

        if(Pokemons instanceof Pokemon){
            this.Pokemon.push(Pokemons)
        }
        else if(Array.isArray(Pokemons)){
            this.Pokemon = Pokemons
        }
    }
showFriends(){
    console.log("List of "+ this.name+ "'s" +" Friends")
    for(let i = 0; i < this.Friends.length; i++){
        console.log(this.Friends[i].name)
    }
}
addFriend(name){
    this.Friends.push(name)
}
showPokemons(){
    console.log("List of "+ this.name+ "'s" +" Pokemons")
    for(let i = 0; i < this.Pokemon.length; i++){
        console.log(this.Pokemon[i].name);
    }
}
talk(n){
    console.log(this.Pokemon[n].getName() + " I choose you!")
}
command(attackerIndex , defender){
    this.Pokemon[attackerIndex].tackle(defender)
}

addPokemon(Pokemons){
    if(Pokemons instanceof Pokemon){
        this.Pokemon.push(Pokemons);
    }
    else if(Array.isArray(Pokemons)){
        this.Pokemon = this.Pokemon.concat(Pokemons)
    }
}
}

class Pokemon{
    
    constructor(name,level,health,attackdmg){
        this.name = name
        this.level = level
        this.health = health
        this.attackdmg = attackdmg
        this.isDead = false
    }

tackle (Pokemon) {
        if(this.isDeads(Pokemon) == true){
            console.log("\n"+Pokemon.getName() + " is already dead")
            return
        }
        if(this.isDead == true ){
            console.log(this.getName() + " is already dead ")
            return
        }
        console.log(this.name + " attacks "+ Pokemon.name + " with "+ this.attackdmg  +" damage" )
       let pokemonHealth =  Pokemon.getHealth() - this.getAttackdmg()
       Pokemon.setHealth(pokemonHealth);
       console.log(Pokemon.name + " health is " + Pokemon.getHealth())
       if(Pokemon.getHealth() <= 0){
            this.faint(Pokemon)
            let tempLevel = this.getLevel()
            this.addLevel(1)
            console.log("Pokemon " + this.getName()  +" Leveled Up from " + tempLevel+ " to " +  this.getLevel() )
            console.log("Attack dmg is increased by 5, from " + this.getAttackdmg()+" to " + this.addAttackDmg(5) )
            Pokemon.isDead = true
       }
    }
setHealth(health){
    this.health = health
}
getHealth(){
    return this.health
}
getAttackdmg(){
    return this.attackdmg
}
addAttackDmg(amount){
    this.attackdmg +=amount
    return this.getAttackdmg()
}
isDeads(Pokemon){
    return Pokemon.isDead
}
getName(){
    return this.name
}
getLevel(){
    return this.level

}
addLevel(amount){
    this.level += amount
}
faint(Pokemon){
    console.log(Pokemon.getName()+ " Fainted")
}
}
function showMenu(){
    console.log("Welcome To Pokemon Game \n1.Fight a Random Pokemon\n2.Show Friends\n3.Add Pokemon")
}

function blockingDelay(ms) {
    const start = new Date();
    let now = new Date();
    
    while (now - start < ms) {
      now = new Date();
    }
  }
  
const prompt = require("prompt-sync")()
const fs = require ('fs');
let listOfPokemons = []
try {  
    var data = fs.readFileSync('pokemons.txt', 'utf8');
    const lines = data.trim().split("\n");
    lines.forEach(line => {
        const values = line.trim().split(' ');
        const name = values[0];
        const lvl = parseInt(values[1]);
        const health = parseInt(values[2]);
        const attackdmg = parseInt(values[3]);
        listOfPokemons.push(new Pokemon(name,lvl,health,attackdmg));
    }); 
}catch(e) { 
    // Printing error 
    console.log('Error:', e.stack);
}
const ash = new Trainer("Ash",21,listOfPokemons[0],"Brock")
while(true){
    showMenu()
    let choice = prompt('Enter Your Choice:')
if(choice == 1 ){
    let randomNumber = Math.floor(Math.random() * 37);
    let randomPokemon = listOfPokemons[randomNumber]
    let ashPokemon = ash.Pokemon[0]
    while(!ashPokemon.isDead&&!randomPokemon.isDead){
    blockingDelay(2000)
    ashPokemon.tackle(randomPokemon)
    blockingDelay(2000)
    randomPokemon.tackle(ashPokemon)
    blockingDelay(2000)
    }
  
}
} 
