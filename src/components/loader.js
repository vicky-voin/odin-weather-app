import {ViewComponent} from "./viewComponent"
import "./loader.css"

export class LoaderComponent extends ViewComponent
{    
    constructor(document)
    {
        super()

        this.__document = document;
        this.__domObject = document.createElement('span');
        this.__domObject.className = "loader";
    }

    setVisible(isVisible)
    {
        this.__domObject.hidden = !isVisible;
    }
}