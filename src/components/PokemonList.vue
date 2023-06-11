<script lang="ts" setup>
import type { Pokemon } from '../types'
import CardPokemon from './CardPokemon.vue'
defineProps<{ pokemons: Pokemon[] }>()
</script>
<template>
  <div class="grid">
    <CardPokemon v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" />
  </div>
</template>
<style lang="scss" scoped>
.grid {
  display: grid;
  gap: 16px;
  row-gap: 30px;

  @media #{$small} {
    grid-template-columns: 1fr 1fr;
  }

  @media #{$medium} {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media #{$extra_large} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
