

const keyboardInputs = {
    axis: {
        "MoveLeft": [0, -1],
        "MoveRight": [0, 1],
        "MoveUp": [1, 0],
        "MoveDown": [-1, 0],
    }
    
}

type KeyStates = "pressed" | "released" | "held"

const StandardGameInput = {
    axis: {
        x: 0,
        y: 0
    },
    actions: {
        MoveLeft: "released",
        MoveRight: "released",
        MoveUp: "released",
        MoveDown: "released",
    }
}

class Keyboard {
    static keys: Map<string, string> = new Map()
    constructor() {
        window.addEventListener("keydown", (e) => {
            this.keyDown(e.key)
        })
        window.addEventListener("keyup", (e) => {
            this.keyUp(e.key)
        })
    }

    setup() {

    }

    private keyDown(key: string) {
        
    }

    private keyUp(key: string) {
        Input.keyUp(key)
    }
}

interface InputMap {
    [action: string]: string
}