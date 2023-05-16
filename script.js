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
        if(friends instanceof Trainer){
            this.Friends.push(friends)
        }
        else if(Array.isArray(friends)){
            this.Friends = friends
        }
    }
showFriends(){
    console.log("List of "+ this.name+ "'s" +" Friends")
    for(let i = 0; i < this.Friends.length; i++){
        console.log(this.Friends[i].name)
    }
}
getPokemon(){
    return this.Pokemon
}
addFriend(Trainer){
    this.Friends.push(Trainer)
}
showPokemons(){
    console.log("List of "+ this.name+ "'s" +" Pokemons")
    for(let i = 0; i < this.Pokemon.length; i++){
        let j = i;
        console.log(j+1+"."+this.Pokemon[i].name);
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
       let pokemonHealth =  Pokemon.getHealth()
       Pokemon.setHealth(pokemonHealth- this.getAttackdmg());
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
    console.log("------------------------------------------------")
    console.log("Welcome To Pokemon Game \n1.Fight a Random Pokemon\n2.Show Friends\n3.Add Pokemon\n4.Show Pokemon\n5.Show Pokemon Stats\n6.Show Friends\n7.Add Friend\n8.Exit")
    console.log("------------------------------------------------")
}
function selectValidPokemonIndex(Trainer) {
    let selectedPokemonIndex;
    let isValid = false
    let dead = false;
    while (!isValid || dead) {
      ash.showPokemons();
      selectedPokemonIndex = prompt("Select Pokemon from the list (Enter Number): ");
      // Check if the input is a valid number within the range
      if (isNaN(selectedPokemonIndex) || selectValidPokemonIndex < 0||selectedPokemonIndex > Trainer.Pokemon.length) {
        console.log("Invalid input. Please enter a valid number.");
        selectedPokemonIndex = undefined; 
      }
      else {
        selectedPokemonIndex -= 1; 
        if(Trainer.Pokemon[selectedPokemonIndex].isDead){
            console.log(Trainer.Pokemon[selectedPokemonIndex].getName()+" is dead. Please choose a different one.");
            dead = true;
        }
        else {
            isValid= true;
        }
    }
}
    return selectedPokemonIndex;
  
}

function blockingDelay(ms) {
    const start = new Date();
    let now = new Date();
    
    while (now - start < ms) {
      now = new Date();
    }
  }
  
const prompt = require("prompt-sync")({sigint:true})
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
const brock = new Trainer("Brock",20,listOfPokemons[2],"none")
const pikachu = new Pokemon("Pikachu",20,150,35);
const ash = new Trainer("Ash",21,pikachu,brock)
while(true){
    showMenu()
    let choice = prompt('Enter Your Choice: ')
if(choice == 1 ){
    let selectedPokemonIndex = selectValidPokemonIndex(ash)
    let randomNumber = Math.floor(Math.random() * 37);
    let randomPokemon = listOfPokemons[randomNumber];
    let ashPokemon = ash.Pokemon[selectedPokemonIndex];
    ash.talk(selectedPokemonIndex)
    
    while(!ashPokemon.isDead&&!randomPokemon.isDead){
    blockingDelay(2000);
    ashPokemon.tackle(randomPokemon);
    blockingDelay(2000);
    randomPokemon.tackle(ashPokemon);
    blockingDelay(2000);
    }
}
if(choice == 2){
    ash.showFriends();
}
if (choice == 3){
    const pokemonName = prompt("Enter Pokemon Name: ");
    const lvl = prompt("Enter pokemon lvl: ");
    ash.addPokemon(new Pokemon(pokemonName,parseInt(lvl),140,25));
}
if (choice == 4){
    ash.showPokemons();
}
if (choice ==5 ){
    console.log(ash.Pokemon)
}
if (choice == 6){
    ash.showFriends()
}
if (choice == 7){
    let name = prompt("Enter Friend Name ")
    let age = prompt("Enter Friend Age ")
    let randomNumber = Math.floor(Math.random() * 37);
    let friend = new Trainer(name,age,listOfPokemons[randomNumber],"none")
    ash.addFriend(friend);
    console.log(friend.name + " is added to your list")
}
if (choice ==8){
    break;
}

  
}

