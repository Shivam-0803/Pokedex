'use client'

import { useState } from 'react'
import { Box, Paper, Skeleton } from '@mui/material'
import { trpc } from '@/lib/trpc'
import { PokemonTypeSelection } from './PokemonTypeSelection'
import { PokedexTable } from './PokedexTable'

export function FilterablePokedexTable() {
  const [selectedType, setSelectedType] = useState<string | undefined>()

  const { data: pokemonList = [], isLoading } = trpc.pokemon.getPokemonByType.useQuery({
    type: selectedType,
  })

  const skeletonRows = [1, 2, 3, 4, 5]

  return (
    <Box>
      <PokemonTypeSelection
        selectedType={selectedType}
        selectType={setSelectedType}
      />
      {isLoading ? (
        <Paper sx={{ mt: 3 }}>
          {skeletonRows.map((index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderBottom: '1px solid #e0e0e0',
              }}
            >
              <Skeleton variant="text" width={40} />
              <Skeleton variant="rectangular" width={48} height={48} />
              <Skeleton variant="text" width={120} height={24} />
              <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                <Skeleton variant="rectangular" width={60} height={24} />
                <Skeleton variant="rectangular" width={60} height={24} />
              </Box>
            </Box>
          ))}
        </Paper>
      ) : (
        <PokedexTable pokemon={pokemonList} />
      )}
    </Box>
  )
}
