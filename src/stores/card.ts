import { defineStore } from 'pinia'
import pokemon from 'pokemontcgsdk'
import config from '../../config.js'

pokemon.configure({apiKey: config.pokeApiKey})

export const useCardStore = defineStore('card', {
    state: () => ({ 
        cardName: '',
        ebaySearchQuery: '',
        multiCardResults: [],
        hasFoundCard: true
    }),
    actions: {
      selectCard (name: string) {
        this.cardName = name;
      },
      selectMultiCardResults (cards: any) {
        this.multiCardResults = cards;
      },
      setHasFoundCard (found: boolean) {
        this.hasFoundCard = found
      },
      adjustCardName (cardName: any) {
        const isPoke = cardName.toLowerCase().split('').includes('/')
        const nameSplit = cardName.split(' ')

        if (isPoke) {
          // if its not an old card
          if (!nameSplit.includes('Set') && !nameSplit.includes('set')) {
            const nameSplitCopy = nameSplit.slice();

            let num = 0
            let total = 0
            let name = []

            for (const e of nameSplitCopy) {
                if (e.includes('/')) {
                    let x = e.split('/');
                    num = Number(x[0]);
                    total = Number(x[1]) ;
                } else {
                    // we dont want the multi rename parenthesis if it has it
                    if (!e.includes('(')) {
                        name.push(e)
                    }
                }
            }

            const joinedName = name.join(' ')
            const nameWithSet = `${joinedName} ${num}/${total}`

            this.setEbaySearchQuery(nameWithSet)

            const nameSplitLength = joinedName.split(' ').length
            pokemon.card.all({ q: `name:${nameSplitLength === 1 ? joinedName : `"${joinedName}"`} number:${num} set.total:${total}` })
                .then((result: any) => {
                    console.log("check res", result)

                    if (result.length) {
                        if (result.length > 1) {
                            console.warn("More than 1 card matched!")

                            this.selectCard('')
                            this.selectMultiCardResults(result)

                            console.log(result)
                        } else {
                            this.selectCard(`${result[0].name} ${result[0].number}/${result[0].set.total} ${result[0].rarity} ${result[0].set.name} Set Pokemon TCG`)
                        }

                        this.setHasFoundCard(true)
                    } else {
                        this.selectCard(nameWithSet)
                        this.setHasFoundCard(false)
                        console.log("No card found")
                    }
                })
          } else {
              this.selectCard(`${cardName} Pokemon TCG`)
              this.setHasFoundCard(false)
          }
        } else {
          //yugioh

          //remove multirename parenthesis
          const cardNameSplit = cardName.split(" ")
          console.log("cardNameSplit", cardNameSplit)
          const indexOfBracket = cardNameSplit.findIndex((x: string) => x.includes('('))
          console.log("indexOfBracket", indexOfBracket)
          cardNameSplit.splice(indexOfBracket, 1)
          const name = cardNameSplit.join(' ')
          console.log("name", name)

          this.selectCard(`${name} Yugioh TCG`)
          this.setEbaySearchQuery(name)
        }
      },
      setEbaySearchQuery (query: any) {
        this.ebaySearchQuery = query;
      }
    },
  })
  