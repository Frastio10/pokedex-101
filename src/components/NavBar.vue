<script setup lang="ts">
import { RouterLink } from 'vue-router'

const LINKS = [
  {
    title: 'Favorites',
    target: '/favorites'
  }
]
</script>

<template>
  <header>
    <div class="container">
      <div class="inner">
        <RouterLink id="logo" to="/">
          <img src="../assets/pokemon.svg" />
        </RouterLink>
        <nav>
          <RouterLink v-for="link in LINKS" :key="link.title" :to="link.target">{{
            link.title
          }}</RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 60px;
  background-color: #ef5350;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 2;

  #logo {
    height: 80%;

    img {
      height: 100%;
    }
  }

  .container {
    height: 100%;
  }

  .inner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

nav {
  display: flex;
  gap: 16px;

  a {
    color: white;
    text-decoration: none;
    padding-bottom: 3px;
    border-bottom: 1px solid transparent;
    transition: 0.3s all;

    &.router-link-exact-active {
      border-bottom: 1px solid white;
    }

    &.router-link-exact-active:hover {
      background-color: transparent;
    }
  }
}
</style>
