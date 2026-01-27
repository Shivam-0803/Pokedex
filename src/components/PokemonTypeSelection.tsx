import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'

interface PokemonTypeSelectionProps {
  selectedType: string | undefined
  selectType: (type: string | undefined) => void
}

const types = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
]

export function PokemonTypeSelection({
  selectedType,
  selectType,
}: PokemonTypeSelectionProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value
    selectType(selectedValue === 'all' ? undefined : selectedValue)
  }

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Filter by Type</InputLabel>
      <Select
        value={selectedType || 'all'}
        label="Filter by Type"
        onChange={handleChange}
      >
        <MenuItem value="all">All Types</MenuItem>
        {types.map((type) => (
          <MenuItem key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
