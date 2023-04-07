import { defineStore } from 'pinia'

export const useCardStore = defineStore('card', {
    state: () => ({ 
        cardName: 'No Card Selected',
    }),
    actions: {
      selectCard(name) {
        this.cardName = name;
      },
    },
  })
  