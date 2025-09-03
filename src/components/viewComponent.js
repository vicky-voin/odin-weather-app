import EventEmitter from "events";

export class ViewComponent
{
    __eventEmitter = new EventEmitter();
    get eventEmitter() { return this.__eventEmitter; }

    __domObject;
    get domObject() {return this.__domObject};

    __document;
}