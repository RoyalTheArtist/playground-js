import { ActionMapping } from "../input/types";

interface ISettings {
    keyboardMappings: Record<string, ActionMapping>
}

export const Settings = Object.freeze({
    keyboardMappings: {
        gameScreen: {
            w: ['move_up', 'inventory_scroll_up'],
            s: ['move_down', 'inventory_scroll_down'],
            a: ['move_left', 'inventory_scroll_left'],
            d: ['move_right', 'inventory_scroll_right'],
            i: ['open_inventory']
        }
    }
} as ISettings)