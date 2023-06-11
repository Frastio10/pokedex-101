import type { PokeAPI } from 'pokeapi-types'

export interface Pokemon extends Omit<PokeAPI.Pokemon, 'sprites'> {
  sprites: any // due to some sprites could be null
}
