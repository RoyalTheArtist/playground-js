abstract class App { 
    abstract init(): void
    abstract render(): void
}

abstract class AppComponent  {
    abstract init(): void  
}

export class BaseApp extends App {
    init(): void {}
    render(): void {}
}

export class BaseAppComponent extends AppComponent {
    private _parent: App
    constructor(parent: App) {
        super()
        this._parent = parent
    }

    init(): void {}
    render(): void { }
    
    public get parent(): App {
        return this._parent
    }
}

