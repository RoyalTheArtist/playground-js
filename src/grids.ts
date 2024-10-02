import '../styles/main.scss'

declare global {
    interface Window {
      gridmanager: GridExample
    }
  }

const actions = document.querySelector('#actions') as HTMLElement

const allWidths = ['width-800', 'width-600', 'width-400', 'width-250', null]

const gridExample = document.querySelector('section#grid-example') as HTMLElement

const changeWidth = (elem: HTMLElement) => {
    const currentClass = elem.className
    
    const currentWidth = currentClass.split(' ').find(width => allWidths.includes(width))
    let nextWidth: string | null = null
    if (currentWidth) {
        
    } else {

    }

    elem.classList.remove(currentWidth || 'null')
    const index = allWidths.indexOf(currentWidth || '')
    nextWidth = allWidths[(index + 1) % allWidths.length]
    if (nextWidth) elem.classList.add(nextWidth)
}

class GridExample {

    constructor() {
    }

    changeWidth() {
        changeWidth(gridExample)
    }
}

const gridManager = new GridExample()
window.gridmanager = gridManager