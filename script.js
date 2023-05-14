class Trainer {
 
    constructor(name,age,Pokemon,friends){
        this.name = name;
        this.age = age; 
        this.Pokemon = Pokemon;
        this.Friends =friends ;
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
command(attackerIndex , Pokemon){
    this.Pokemon[attackerIndex].tackle(Pokemon)
}

addPokemon(Pokemon){
    this.Pokemon.push(Pokemon);
}
}

class Pokemon{
    isDead = false
    constructor(name,level,health,attackdmg){
        this.name = name
        this.level = level
        this.health = health
        this.attackdmg = attackdmg
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
            console.log("Attack dmg is increased by 5, from " + this.getAttackdmg() + this.addAttackDmg(5) )
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

let pikachu = new Pokemon("pikachu",10,100,15);
let grudon = new Pokemon("grudon",30,100,40);
pokemonList = [pikachu,grudon];
let ash = new Trainer("Ash",15,pokemonList,"brock");
let rayquaza = new Pokemon("rayquaza",70,500,70);
ash.command(1,rayquaza);
