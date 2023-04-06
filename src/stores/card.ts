import { defineStore } from 'pinia'

export const useCardStore = defineStore('card', {
    state: () => ({ 
        cardName: 'No Card Selected',
    }),
    getters: {
      doubleCount: (state) => state.cardName,
    },
    actions: {
      selectCard(name) {
        this.cardName = name;
      },
    },
  })
  