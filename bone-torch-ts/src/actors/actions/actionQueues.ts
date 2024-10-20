import { Entity } from "../../ecs"
import { Action } from "./moveActions"

export type ActionRequest = {
    entity: Entity,
    action: Action,
    duration: number
}

let currentTime = performance.now()

export class ActionQueue {
    static actionQueue: Set<ActionRequest> = new Set()
    static actionsToClear: Map<Entity, number> = new Map()

    static addAction(entity: Entity, action: Action, duration: number = 0) {
        if (this.actionsToClear.has(entity)) return
        this.actionQueue.add({ entity, action, duration })
    }

    static processActions(delta: number) {
        currentTime = performance.now()
        for (let request of this.actionQueue) {
            request.action.perform(request.entity)
            if (request.duration > 0) {
                // write timeout clear
                this.actionsToClear.set(request.entity, request.duration)
            }
            this.actionQueue.delete(request)
        }

        for (let [entity, duration] of this.actionsToClear) {
            this.actionsToClear.set(entity, duration - delta)
        }
        this.clear()
    }
    
    static clear() {
        for (let [entity, duration] of this.actionsToClear) {
            if (duration <= 0) {
                this.actionsToClear.delete(entity)
            }
        }
    }
}