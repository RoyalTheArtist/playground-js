import { ActionMapping } from "../input/types";
import { Vector2D } from "./vectors";



export const Settings = Object.freeze({
    map: {
        size: new Vector2D(10, 10)
    },
    tiles: {
        size: new Vector2D(32, 32)
    },
    keyboardMappings: {
        gameScreen: {
            w: ['move_up', 'inventory_scroll_up'],
            s: ['move_down', 'inventory_scroll_down'],
            a: ['move_left', 'inventory_scroll_left'],
            d: ['move_right', 'inventory_scroll_right'],
            i: ['open_inventory']
        },
        mainMenu: {
            n: ['new_game'],
            t: ['test_chamber'],
            q: ['quit']
        }
    }
})