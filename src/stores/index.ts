import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filter', {
  state: () => {
    return { type: '' }
  },

  actions: {
    setTypeFilter(type: string) {
      this.type = type
    },
  },
})
