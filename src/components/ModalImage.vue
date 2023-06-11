<script lang="ts" setup>
defineProps<{
  isActive: boolean
  image: string
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <div v-if="isActive" class="modal">
    <div @click="emit('close')" class="backdrop"></div>
    <img :src="image" />
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;

  width: 100%;
  height: 100%;
  z-index: 99;

  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  z-index: 2;
  max-height: 80%;
  max-width: 80%;
  position: absolute;
}

.backdrop {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;

  background-color: black;
  opacity: 0.6;
  z-index: 1;
  cursor: pointer;
}
</style>
