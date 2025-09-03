export class WeatherDay
{

    constructor(jsonData)
    {
        this.__dateTime = jsonData.datetime;
        this._conditions = jsonData.conditions;
        this._feelsLike = jsonData.feelslike;
        this._icon = jsonData.icon;
        this._temp = jsonData.temp;
    }

    get conditions() {
        return this._conditions;
    }

    get feelsLike() {
        return this._feelsLike;
    }

    get icon() {
        return this._icon;
    }

    get temp() {
        return this._temp;
    }

    get datetime() {
        return this.__dateTime;
    }
}