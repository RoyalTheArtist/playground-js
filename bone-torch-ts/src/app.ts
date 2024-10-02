abstract class App { 
    abstract init(): void
    abstract render(): void
}

abstract class AppComponent  {
    abstract parent: App
    abstract init(): void  
}

export class BaseApp extends App {
    init(): void {}
    render(): void {}
}

export class BaseAppComponent extends AppComponent {
    parent: BaseApp
    constructor(parent: BaseApp) {
        super()
        this.parent = parent
    }
    init(): void {}
    render(): void { }
}

