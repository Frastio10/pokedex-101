<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

const userFavs = JSON.parse(localStorage.getItem('favorites') || '{}')
if (!userFavs || !Array.isArray(userFavs)) {
  localStorage.setItem('favorites', JSON.stringify([]))
}
</script>

<template>
  <div class="wrapper">
    <NavBar />
  </div>

  <RouterView />
</template>
