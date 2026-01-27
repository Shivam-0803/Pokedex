import { Box, Typography, Chip, Avatar } from '@mui/material'

interface PokemonRowProps {
  id: number
  name: string
  types: string[]
  sprite: string
}

const typeColors: Record<string, string> = {
  normal: '#f5f5dc',
  fire: '#ffebee',
  water: '#e3f2fd',
  electric: '#fff9c4',
  grass: '#e8f5e9',
  ice: '#e0f7fa',
  fighting: '#fce4ec',
  poison: '#f3e5f5',
  ground: '#efebe9',
  flying: '#e1f5fe',
  psychic: '#f1f8e9',
  bug: '#f9fbe7',
  rock: '#eceff1',
  ghost: '#ede7f6',
  dragon: '#e8eaf6',
}

export function PokemonRow({ id, name, types, sprite }: PokemonRowProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderBottom: '1px solid #e0e0e0',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease',
        '&:hover': {
          backgroundColor: '#fafafa',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        },
      }}
    >
      <Typography variant="body2" sx={{ minWidth: 40 }}>
        #{id}
      </Typography>
      <Avatar src={sprite} alt={name} variant="rounded" />
      <Typography variant="h6" sx={{ flex: 1 }}>
        {name}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {types.map((type) => (
          <Chip
            key={type}
            label={type}
            size="small"
            sx={{
              backgroundColor: typeColors[type.toLowerCase()] || '#f5f5f5',
              '& .MuiChip-label': {
                color: '#333',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  )
}
