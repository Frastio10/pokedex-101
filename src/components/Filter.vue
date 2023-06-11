<script setup lang="ts">
import { reactive } from 'vue'
import { getAllTypes } from '../http'
import type { PokeAPI } from 'pokeapi-types'
import ComboBox from './ComboBox.vue'
import { useFilterStore } from '@/stores'

interface State {
  types: PokeAPI.Type[]
  selectedType: string
}

const state: State = reactive({ types: [], selectedType: '' })
const filterState = useFilterStore()

const test = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
]

async function setTypes() {
  state.types = await getAllTypes()
}

setTypes()

function onSelect(value: string) {
  filterState.type = value
}

</script>

<template>
  <div v-if="state.types" style="margin: 20px 0;">
    Type &nbsp;
    <ComboBox :options="state.types.map((v) => v.name)" @selected="onSelect" />
  </div>
</template>

<style></style>
