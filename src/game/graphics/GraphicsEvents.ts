
enum GraphicsEvents{
    onBornCell = a
}

export interface GraphicsEventsObserver {

}

export class GraphicsEventsObservable {
    private observers: GraphicsEventsObserver[] = [];

    public subscribe(obs: GraphicsEventsObserver){
        this.observers.push(obs);
    }

    public unsubscribe(obs: GraphicsEventsObserver){
        this.observers = this.observers.filter(o => o !== obs);
    }

    public notify(event: GraphicsEvents, payload?: any){
        this.observers.forEach(o => o.onGraphicsEvent(event));
    }
}