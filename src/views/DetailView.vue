<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getPokemon } from '../http'
import { addLeadingZeros, getPokemonTypeColor } from '../utils'
import type { Pokemon } from '../types'
import ModalImage from '../components/ModalImage.vue'

const route = useRoute()
const pokemonDataRef = ref<Pokemon | null>()
const state = reactive({ isLoading: false, isShowImage: false })

const slug = route.params.id as string

document.title = slug.charAt(0).toUpperCase() + slug.slice(1)

async function setPokemonData() {
  try {
    state.isLoading = true

    const pokemonData = await getPokemon(slug)
    pokemonDataRef.value = pokemonData

    state.isLoading = false
  } catch (err) {
    state.isLoading = false
    throw err
  }
}

setPokemonData()
</script>

<template>
  <ModalImage
    :isActive="state.isShowImage"
    :image="pokemonDataRef?.sprites.other.dream_world.front_default"
    @close="state.isShowImage = false"
  />
  <main>
    <div v-if="pokemonDataRef">
      <div
        :style="`background-color: ${getPokemonTypeColor(pokemonDataRef.types[0].type.name)}`"
        class="banner-top"
      >
        <div class="container">
          <h1>#{{ addLeadingZeros(pokemonDataRef.id) }}</h1>
          <div @click="state.isShowImage = true" class="image-background">
            <img :src="pokemonDataRef.sprites.other.dream_world.front_default" />
          </div>
          <h1>{{ pokemonDataRef.name }}</h1>
        </div>
      </div>
      <div class="details">
        <div class="container">
          <div class="row-info">
            <div class="info">
              <b>Height</b>
              <span> {{ pokemonDataRef.height }} </span>
            </div>
            <div class="info">
              <b>Weight</b>
              <span>{{ pokemonDataRef.weight }}</span>
            </div>
            <div class="info">
              <b>Base Experience</b>
              <span>{{ pokemonDataRef.base_experience }}</span>
            </div>
          </div>

          <div class="row-info">
            <div v-for="stat in pokemonDataRef.stats" :key="stat.stat.name" class="info">
              <b>{{ stat.stat.name.replace('-', ' ') }}</b>
              <span> {{ stat.base_stat }} </span>
            </div>
          </div>

          <div class="row-info">
            <div class="info">
              <div class="badges">
                <div
                  v-for="ability in pokemonDataRef.abilities"
                  :key="ability.ability.name"
                  class="badge"
                >
                  <span> {{ ability.ability.name }}</span>
                </div>
              </div>
              <div><b>Abilities</b></div>
            </div>

            <div class="info">
              <div class="badges">
                <div v-for="type in pokemonDataRef.types" :key="type.type.name" class="badge">
                  <span
                    style="color: white"
                    :style="`background-color: ${getPokemonTypeColor(type.type.name)}`"
                  >
                    {{ type.type.name }}</span
                  >
                </div>
              </div>
              <div><b>Types</b></div>
            </div>
          </div>

          <div class="row-info">
            <div class="info">
              <div class="badges">
                <div v-for="move in pokemonDataRef.moves" :key="move.move.name" class="badge">
                  <span> {{ move.move.name }}</span>
                </div>
              </div>
              <div><b>Moves</b></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container not-found-state">
      <h1>{{ state.isLoading ? 'Loading...' : 'Pokemon not found!' }}</h1>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  margin: 60px 0;
}

.banner-top {
  padding: 30px 0;
  display: flex;
  align-items: center;
  color: white;
  text-transform: capitalize;

  .container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;

    @media #{$small} {
      flex-direction: row;
    }
  }

  .image-background {
    display: flex;
    height: 80%;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 100%;
    height: 160px;
    width: 160px;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &:hover:after {
      opacity: 0.7;
    }

    &:after {
      content: 'Click to view image';
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: black;
      opacity: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.25s ease;
      font-weight: bold;
    }

    img {
      height: 70%;
    }
  }
}

.details {
  padding: 50px 0;

  .row-info {
    display: flex;
    gap: 20px;
    justify-content: space-around;
    margin-bottom: 30px;
  }

  .info {
    display: flex;
    text-align: center;
    flex-direction: column-reverse;
    gap: 8px;

    span {
      font-size: 22px;
      background-color: #ededed;
      padding: 5px 15px;
      text-transform: capitalize;
    }

    b {
      font-size: 18px;
      text-transform: capitalize;
    }
  }
}

.badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  .badge {
    border-radius: 10px;
  }
}

.not-found-state {
  text-align: center;
}
</style>
