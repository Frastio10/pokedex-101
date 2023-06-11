<script setup lang="ts">
import { reactive, ref, watch, onMounted, onUnmounted } from 'vue'
import Filter from '@/components/Filter.vue'
import PokemonList from '@/components/PokemonList.vue'
import type { Pokemon } from '@/types'
import { getAllPokemons } from '@/http'
import { useFilterStore } from '@/stores'

interface State {
  pokemonList: Pokemon[]
  offset: number

  isLoading: boolean
  isScrollLoading: boolean
}

const state: State = reactive({
  pokemonList: [],
  isScrollLoading: false,
  isLoading: false,
  offset: 0
})

document.title = 'PokeDex'

const filterState = useFilterStore()
const mainComponent = ref<HTMLDivElement>()

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

async function setPokemons(isLoadMore = false, type?: string) {
  const pokemonData = await getAllPokemons(state.offset, type)

  if (isLoadMore) state.pokemonList.push(...pokemonData)
  else state.pokemonList = pokemonData
}

setPokemons()

watch(
  () => filterState.type,
  async () => {
    state.isLoading = true
    state.offset = 0
    await setPokemons(false, filterState.type)
    state.isLoading = false
  }
)

const handleScroll = async () => {
  let element = mainComponent.value
  if (!element || filterState.type || state.isScrollLoading) return

  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    state.isScrollLoading = true
    state.offset++

    await setPokemons(true)

    state.isScrollLoading = false
  }
}
</script>

<template>
  <main ref="mainComponent">
    <div class="container container--pushed">
      <Filter />
      <PokemonList
        v-if="!state.isLoading && state.pokemonList.length"
        :pokemons="state.pokemonList"
      />
      <div v-else>Loading...</div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  margin: 80px 0;
}
</style>
