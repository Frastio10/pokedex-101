<template>
  <div class="dropdown" @click="toggleDropdown">
    <input
      type="text"
      v-model="state.inputValue"
      @input="handleInput"
      @keydown.enter="selectOption"
    />
    <div v-show="isDropdownOpen" class="dropdown-options">
      <div
        v-for="option in state.options"
        :key="option"
        @click="toggleOption(option)"
        :class="{ selected: isSelected(option) }"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue'

export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  emits: ['selected'],
  setup(props, { emit }) {
    const state = reactive({
      inputValue: '',
      selectOption: '',
      options: []
    })

    state.options = props.options

    watch(
      () => props.options,
      () => {
        state.options = props.options
      }
    )

    const isDropdownOpen = ref(false)

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value
    }

    const handleInput = (event) => {
      const userText = event.target.value
      if (!userText.length) {
        state.options = props.options
        emit('selected', '')
      }

      state.options = state.options.filter((opt) => opt.includes(userText))
      state.inputValue = userText
    }

    const toggleOption = (option) => {
      if (state.selectedOption === option) {
        state.selectedOption = ''
        state.inputValue = ''
        emit('selected', state.selectedOption)
        return
      }
      state.selectedOption = option
      state.inputValue = option
      emit('selected', state.selectedOption)
    }

    const isSelected = (option) => {
      return state.selectedOption === option
    }

    // Watch for changes in the selectedOptions array and emit the 'selected' event
    watch(state.selectedOption, (newSelectedOptions) => {
      emit('selected', newSelectedOptions)
    })

    return {
      state,
      isDropdownOpen,
      toggleDropdown,
      handleInput,
      toggleOption,
      isSelected
    }
  }
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown input {
  width: 200px;
  padding: 5px;
  border: 1px solid #ccc;
}

.dropdown-options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  border-top: none;
  background-color: #fff;
  max-height: 200px;
  overflow: scroll;
  z-index: 2;
}

.dropdown-options div {
  padding: 5px;
  cursor: pointer;
}

.dropdown-options div.selected {
  background-color: #f0f0f0;
}
</style>
