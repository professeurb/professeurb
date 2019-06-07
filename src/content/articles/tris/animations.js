import anime from 'animejs'

export function animateGroups(ListComponent) {
  const items = ListComponent.querySelectorAll('.card')
  const oldPositionDict = {}
  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    oldPositionDict[item.dataset.id] = item.getBoundingClientRect()
  }
  return function initiateAnimation(duration, resolve) {
    const transformPositionDict = {}
    // make sure to get the new array -- React might have destroyed
    // and created new DOM nodes
    const items = ListComponent.querySelectorAll('.card')
    for (let i = 0; i < items.length; i++) {
      let item = items[i]
      const oldPosition = oldPositionDict[item.dataset.id]
      const newPosition = item.getBoundingClientRect()
      const translateX = oldPosition.left - newPosition.left
      const translateY = oldPosition.top - newPosition.top
      item.style.transform = `translateX(${ translateX }px) translateY(${ translateY }px)`
      transformPositionDict[item.dataset.id] = {
        translateX: [translateX, 0],
        translateY: [translateY, 0],
      }
    }

    anime({
      targets: items,
      translateX: item => transformPositionDict[item.dataset.id].translateX,
      translateY: item => transformPositionDict[item.dataset.id].translateY,
      duration: duration,
      // delay: (item, i) => i * 12,
      easing: 'easeInOutQuad',
      elasticity: 1,
      complete: resolve
    })
  }
}
