import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const pokemonData = [
  { name: 'Pikachu', types: 'electric', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
  { name: 'Charizard', types: 'fire,flying', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png' },
  { name: 'Blastoise', types: 'water', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png' },
  { name: 'Venusaur', types: 'grass,poison', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png' },
  { name: 'Gyarados', types: 'water,flying', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png' },
  { name: 'Dragonite', types: 'dragon,flying', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png' },
  { name: 'Snorlax', types: 'normal', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png' },
  { name: 'Gengar', types: 'ghost,poison', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png' },
  { name: 'Machamp', types: 'fighting', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png' },
  { name: 'Alakazam', types: 'psychic', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png' },
  { name: 'Arcanine', types: 'fire', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png' },
  { name: 'Lapras', types: 'water,ice', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png' },
  { name: 'Eevee', types: 'normal', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png' },
  { name: 'Vaporeon', types: 'water', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/134.png' },
  { name: 'Jolteon', types: 'electric', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/135.png' },
]

async function main() {
  for (const pokemon of pokemonData) {
    await prisma.pokemon.upsert({
      where: { name: pokemon.name },
      update: {},
      create: pokemon,
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
