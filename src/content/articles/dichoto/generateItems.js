export default function generateCards(len = 50) {
  const items = [...Array(len).keys()].slice(1)

  let cards = items.map(index => ({
    id: index,
    top: 100,
    left: 60 * index + 37,
    zIndex: 1,
    rotate: 2 * Math.random() - 1,
    value: '',
    pos: '',
  }))

  // initialize random values
  let cnt = 1

  for (let i = cards.length - 1; i >= 0; i--) {
    cnt = cnt + Math.floor(Math.random() * 6)
    cards[i].value = cnt
  }

  // pre-shuffle cards
  for (let i = cards.length - 1; i >= 1; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    if (j < i) {
      let x = cards[i]
      cards[i] = cards[j]
      cards[j] = x
    }
  }

  return cards
}
