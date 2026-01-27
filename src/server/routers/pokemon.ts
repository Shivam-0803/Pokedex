import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { prisma } from '@/lib/prisma'

export const pokemonRouter = router({
  getPokemon: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const trimmedName = input.name.trim()
      if (!trimmedName) {
        return null
      }

      const pokemon = await prisma.pokemon.findUnique({
        where: { name: trimmedName },
      })

      if (!pokemon) {
        return null
      }

      return {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.split(','),
        sprite: pokemon.sprite,
      }
    }),

  getPokemonList: publicProcedure
    .input(z.object({ names: z.array(z.string()) }))
    .query(async ({ input }) => {
      const validNames = input.names
        .map((name) => name.trim())
        .filter((name) => name.length > 0)

      if (validNames.length === 0) {
        return []
      }

      const pokemonList = await prisma.pokemon.findMany({
        where: {
          name: {
            in: validNames,
          },
        },
      })

      return pokemonList.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.split(','),
        sprite: pokemon.sprite,
      }))
    }),

  getPokemonByType: publicProcedure
    .input(z.object({ type: z.string().optional() }))
    .query(async ({ input }) => {
      if (!input || !input.type || typeof input.type !== 'string') {
        const allPokemon = await prisma.pokemon.findMany()
        return allPokemon.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types.split(','),
          sprite: pokemon.sprite,
        }))
      }

      const filterType = input.type.trim().toLowerCase()
      if (filterType === '' || filterType === 'all' || filterType === 'all types') {
        const allPokemon = await prisma.pokemon.findMany()
        return allPokemon.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types.split(','),
          sprite: pokemon.sprite,
        }))
      }

      const filteredPokemon = await prisma.pokemon.findMany({
        where: {
          types: {
            contains: filterType,
          },
        },
      })

      return filteredPokemon.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.split(','),
        sprite: pokemon.sprite,
      }))
    }),
})
