import { ViewComponent } from "./viewComponent"
import "./weatherDayComponent.css"

export class WeatherDayComponent extends ViewComponent
{
    constructor(weatherDay, document)
    {
        super();
        
        this.__document = document;

        this.__domObject = document.createElement('div');
        this.__domObject.className = 'weather-day-component';

        this.datetimeDiv = document.createElement('div');
        this.datetimeDiv.className = 'weather-datetime';
        this.datetimeDiv.textContent = weatherDay.datetime;
        
        this.conditionsDiv = document.createElement('div');
        this.conditionsDiv.className = 'weather-conditions';
        this.conditionsDiv.textContent = weatherDay.conditions;
        
        this.feelsLikeDiv = document.createElement('div');
        this.feelsLikeDiv.className = 'weather-feels-like';
        this.feelsLikeDiv.textContent = `Feels like: ${weatherDay.feelsLike}`;
        
        this.iconDiv = document.createElement('div');
        this.iconDiv.className = 'weather-icon';
        import("../icons/weather/" + weatherDay.icon + ".svg").then((module) => 
        {
            this.iconDiv.style.backgroundImage = `url(${module.default})`;
        });
        
        this.tempDiv = document.createElement('div');
        this.tempDiv.className = 'weather-temp';
        this.tempDiv.textContent = `${weatherDay.temp}°`;
        
        this.__domObject.appendChild(this.datetimeDiv);
        this.__domObject.appendChild(this.iconDiv);
        this.__domObject.appendChild(this.tempDiv);
        this.__domObject.appendChild(this.feelsLikeDiv);
        this.__domObject.appendChild(this.conditionsDiv);
    }
}