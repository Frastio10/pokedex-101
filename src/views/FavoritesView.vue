<script lang="ts" setup>
import { reactive } from 'vue'
import PokemonList from '../components/PokemonList.vue'
import { getFavoritePokemons } from '@/http'
import type { Pokemon } from '@/types'

interface State {
  pokemons: Pokemon[]
  isLoading: boolean
}

const state: State = reactive({
  pokemons: [],
  isLoading: false
})

document.title = 'Your Favorites'

const storage = localStorage.getItem('favorites')
const userFavs = JSON.parse(storage || '{}')

async function setFavoritePokemons() {
  try {
    state.isLoading = true
    const favs = await getFavoritePokemons()

    state.pokemons = favs

    state.isLoading = false
  } catch (err) {
    state.isLoading = false
    throw err
  }
}

setFavoritePokemons()
</script>
<template>
  <main>
    <div class="container container--pushed">
      <PokemonList v-if="!state.isLoading && state.pokemons.length" :pokemons="state.pokemons" />
      <div v-else-if="!userFavs.length || !Array.isArray(userFavs)">
        You dont have any favorite Pokemons!
      </div>
      <div v-else>Loading...</div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  margin: 80px 0;
}
</style>
