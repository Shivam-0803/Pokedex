'use client'

import { useState } from 'react'
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
} from '@mui/material'
import { trpc } from '@/lib/trpc'
import { PokemonRow } from '@/components/PokemonRow'
import { PokedexTable } from '@/components/PokedexTable'
import { FilterablePokedexTable } from '@/components/FilterablePokedexTable'

export default function Home() {
  const [singleName, setSingleName] = useState('')
  const [multipleNames, setMultipleNames] = useState('')

  const singlePokemonQuery = trpc.pokemon.getPokemon.useQuery(
    { name: singleName },
    { enabled: false }
  )

  const pokemonNameList = multipleNames
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean)

  const multiplePokemonQuery = trpc.pokemon.getPokemonList.useQuery(
    { names: pokemonNameList },
    { enabled: false }
  )

  const handleSingleSearch = () => {
    if (singleName.trim()) {
      singlePokemonQuery.refetch()
    }
  }

  const handleMultipleSearch = () => {
    if (multipleNames.trim()) {
      multiplePokemonQuery.refetch()
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 500, mb: 1 }}>
          Pokédex
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Search and filter Pokémon by name or type
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 500 }}>
          Search Single Pokémon
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Pokémon Name"
            value={singleName}
            onChange={(e) => setSingleName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSingleSearch()
              }
            }}
            fullWidth
          />
          <Button variant="contained" onClick={handleSingleSearch}>
            Search
          </Button>
        </Box>
        {singlePokemonQuery.data && (
          <PokemonRow
            id={singlePokemonQuery.data.id}
            name={singlePokemonQuery.data.name}
            types={singlePokemonQuery.data.types}
            sprite={singlePokemonQuery.data.sprite}
          />
        )}
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 500 }}>
          Search Multiple Pokémon
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Pokémon Names (comma-separated)"
            value={multipleNames}
            onChange={(e) => setMultipleNames(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleMultipleSearch()
              }
            }}
            fullWidth
          />
          <Button variant="contained" onClick={handleMultipleSearch}>
            Search
          </Button>
        </Box>
        {multiplePokemonQuery.data && multiplePokemonQuery.data.length > 0 && (
          <PokedexTable pokemon={multiplePokemonQuery.data} />
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 500 }}>
          Filterable Pokédex
        </Typography>
        <FilterablePokedexTable />
      </Paper>
    </Container>
  )
}
