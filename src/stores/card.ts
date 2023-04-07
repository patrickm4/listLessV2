import { defineStore } from 'pinia'

export const useCardStore = defineStore('card', {
    state: () => ({ 
        cardName: 'No Card Selected',
        ebaySearchQuery: ''
    }),
    actions: {
      selectCard(name) {
        this.cardName = name;
      },
      setEbaySearchQuery (query) {
        this.ebaySearchQuery = query;
      }
    },
  })
  