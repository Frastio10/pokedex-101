<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Pokemon } from '../types'
import { getPokemonTypeColor, addLeadingZeros } from '../utils'
import { reactive } from 'vue'

const props = defineProps<{
  pokemon: Pokemon
}>()

const favs = localStorage.getItem('favorites')
let favList = JSON.parse(favs || '')

const state = reactive({ isFavorite: favList.includes(props.pokemon.id) })

const setFavorite = (id: number) => {
  if (!Array.isArray(favList)) return

  if (favList.includes(id)) {
    favList = favList.filter((v) => v !== id)
    state.isFavorite = false
  } else {
    favList.push(id)
    state.isFavorite = true
  }

  localStorage.setItem('favorites', JSON.stringify(favList))
}
</script>
<template>
  <RouterLink :to="pokemon.name">
    <div class="pokemon-card">
      <button
        @click.prevent="setFavorite(pokemon.id)"
        class="favorite-button"
        :class="[{ active: state.isFavorite }]"
      >
        <svg
          class=""
          title="Like Bell SVG File"
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#aaa"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          ></path>
        </svg>
      </button>
      <div
        class="image-wrapper"
        :style="`background-color:${getPokemonTypeColor(pokemon.types[0].type.name)};`"
      >
        <img loading="lazy" :src="pokemon.sprites.other['official-artwork'].front_default" />
      </div>

      <div class="pokemon-detail">
        <div class="pokemon-info">
          <span class="pokemon-name">
            {{ pokemon.name }}
          </span>

          <div class="types-group">
            <div
              v-for="type in pokemon.types"
              :key="type.type.name"
              class="type-badge"
              :style="`background-color:${getPokemonTypeColor(type.type.name)};`"
            >
              {{ type.type.name }}
            </div>
          </div>
        </div>

        <b> #{{ addLeadingZeros(pokemon.id) }} </b>
      </div>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
a {
  color: inherit;
  text-decoration: none;
}

.pokemon-card {
  position: relative;
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16), 0 4px 10px rgba(0, 0, 0, 0.12);
  transition: 0.25s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.24), 0 6px 20px rgba(0, 0, 0, 0.16);
    margin-top: -10px;
  }

  .pokemon-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .pokemon-name {
    text-transform: capitalize;
  }

  .image-wrapper {
    display: flex;
    justify-content: center;
    /* background-color: #ededed; */
    height: 140px;
    padding: 20px;

    img {
      width: 100px;
      object-fit: contain;
    }
  }
}

.pokemon-detail {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  row-gap: 4px;
  padding: 8px 12px;
}

.favorite-button {
  background-color: white;
  border-radius: 100%;
  position: absolute;

  top: 10px;
  right: 10px;

  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;

  transition: 0.3ms ease;
  cursor: pointer;

  transform: scale(1);

  &:hover {
    transform: scale(1.2);
  }

  &.active svg {
    stroke: #ef5350;
    fill: #ef5350;
    opacity: 0.7;
  }
}

.types-group {
  display: flex;
  gap: 8px;

  .type-badge {
    background-color: red;
    border-radius: 10px;
    min-width: 60px;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: capitalize;
    color: white;
  }
}
</style>
