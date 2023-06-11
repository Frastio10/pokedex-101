import { POKEAPI_BASE_URL } from '@/constants'
import axios from 'axios'
import type { Pokemon } from '@/types'
import type { PokeAPI } from 'pokeapi-types'

export const getPokemon = async (name: string): Promise<Pokemon> => {
  try {
    const { data: result } = await axios.get(POKEAPI_BASE_URL + 'pokemon/' + name)
    return result
  } catch (err) {
    throw err
  }
}

export const getFavoritePokemons = async (): Promise<Pokemon[]> => {
  try {
    const storage = localStorage.getItem('favorites')
    const userFavs = JSON.parse(storage || '{}')

    const allDataRequests = userFavs.map((result: any) => {
      return axios.get(POKEAPI_BASE_URL + 'pokemon/' + result)
    })

    let results = await Promise.all(allDataRequests)

    for (let i = 0; i < results.length; i++) {
      results[i] = results[i].data
    }

    return results as Pokemon[]
  } catch (err) {
    throw err
  }
}

export const getAllTypes = async (): Promise<PokeAPI.Type[]> => {
  try {
    const { data: results } = await axios.get(POKEAPI_BASE_URL + 'type')
    return results.results as PokeAPI.Type[]
  } catch (err) {
    throw err
  }
}

export const getAllPokemons = async (offset = 0, type?: string): Promise<Pokemon[]> => {
  try {
    const URL = type ? POKEAPI_BASE_URL + 'type/' + type : POKEAPI_BASE_URL + 'pokemon'
    const limit = 20

    const { data: rawData } = await axios.get(URL + `?offset=${offset * limit}&limit=${limit}`)
    const pokemons = type ? rawData.pokemon : rawData.results

    const allDataRequests = pokemons.map((result: any) => {
      return axios.get(result.url || result.pokemon.url)
    })

    let results = await Promise.all(allDataRequests)

    for (let i = 0; i < results.length; i++) {
      results[i] = results[i].data
    }

    return results as Pokemon[]
  } catch (err) {
    throw err
  }
}
