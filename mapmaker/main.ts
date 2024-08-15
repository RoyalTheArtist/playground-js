interface SpriteSheetManifest {
    texture: string
    tiles: {
        width: number
        height: number
    }
}

const manifest: SpriteSheetManifest = {
    texture: 'texture.png',
    tiles: {
        width: 16,
        height: 16
    }
}


class Texture {

}

class SpriteSheet {
    texture: Texture
}

class SpriteSheetLoader {
    el: HTMLElement
    fileInput: HTMLInputElement | null = null
    imgTarget: HTMLElement | null = null
    constructor(selector: string) {
        this.el = document.querySelector(selector) as HTMLElement

        if (!this.el) {
            throw new Error('File Input not found')
        }
    }

    public init() {
        this.fileInput = this.el.querySelector('input')

        if (!this.fileInput) {
            this.fileInput = document.createElement('input')
            this.fileInput.setAttribute('type', 'file')
            this.fileInput.setAttribute('accept', 'image/*')
            this.el.appendChild(this.fileInput)
        }

        this.imgTarget = this.el.querySelector('.preview') as HTMLElement

        if (!this.imgTarget) {
            this.imgTarget = document.createElement('div')
            this.imgTarget.classList.add('preview')
            this.el.appendChild(this.imgTarget)
        }

        this.fileInput?.addEventListener('change', (e) => {
            if (this.fileInput?.files) {
                for (const file of this.fileInput.files) {
                    const img = document.createElement('img')
                    img.src = URL.createObjectURL(file)
                    this.imgTarget.innerText = ''
                    this.imgTarget.appendChild(img)
                }
            }
        })
    }
}

function main() {
    console.debug("Map Maker")

    const spriteLoader = new SpriteSheetLoader('#spritesheet-loader')
    spriteLoader.init()
}

window.onload = () => {
    main()
}

