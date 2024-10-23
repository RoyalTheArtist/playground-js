export class RenderAnimation {
    private _callback: Function | null = null
    public duration: number = 0
    private static animations: Set<RenderAnimation> = new Set()

    public static triggerAnimation(animation: RenderAnimation) {
        animation.start()

        return animation
    }

    public static addAnimation(animation: RenderAnimation) {
        this.animations.add(animation)
    }

    public static removeAnimation(animation: RenderAnimation) {
        this.animations.delete(animation)
    }

    public static update(delta: number) {
        for (const animation of this.animations) {
            animation.duration -= delta
            if (animation.duration <= 0) {
                animation.end()
            }
        }
    }

    public start() {
        RenderAnimation.addAnimation(this)
    }

    public end() {
        if (this._callback) {
            this._callback()
            this._callback = null
        }

        RenderAnimation.removeAnimation(this)
    }

    public onEnd(fn: Function) {
        this._callback = fn
    }
}

export class MoveSpriteAnimation extends RenderAnimation {
    constructor(public readonly duration: number = 100) {

        super()
    }
}