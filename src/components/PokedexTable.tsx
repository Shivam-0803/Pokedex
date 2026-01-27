import { Box, Paper } from '@mui/material'
import { PokemonRow } from './PokemonRow'

interface Pokemon {
  id: number
  name: string
  types: string[]
  sprite: string
}

interface PokedexTableProps {
  pokemon: Pokemon[]
}

export function PokedexTable({ pokemon }: PokedexTableProps) {
  return (
    <Paper sx={{ mt: 3 }}>
      {pokemon.map((p) => (
        <PokemonRow
          key={p.id}
          id={p.id}
          name={p.name}
          types={p.types}
          sprite={p.sprite}
        />
      ))}
    </Paper>
  )
}
