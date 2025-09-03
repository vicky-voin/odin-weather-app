import "./main.css"
import {LoaderComponent} from "./components/loader"
import { WeatherDay } from "./models/weatherDay";
import { WeatherDayComponent } from "./components/weatherDayComponent";

class MainView
{
    constructor(){
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.searchForm = document.querySelector('.search-form');
        this.searchInput = document.querySelector('#weather-search');
        this.weatherDataGrid = document.querySelector('.weather-data');

        this.loaderContainer = document.querySelector(".loader-container");
        this.loaderIcon = new LoaderComponent(document);
        this.loaderIcon.setVisible(false);
        this.loaderContainer.appendChild(this.loaderIcon.domObject);
        
        this.days = [];
    }

    setupEventListeners() {
        if (this.searchForm) {
            this.searchForm.addEventListener('submit', (event) => {
                event.preventDefault(); 
                this.handleSearch();
            });

            this.searchForm.addEventListener('input', (event) => {
                this.searchInput.setCustomValidity("");
            });
        }
    }

    async handleSearch() {
        const searchValue = this.searchInput.value.trim();
        if (searchValue) {
            console.log('Searching for weather in:', searchValue);
            this.loaderIcon.setVisible(true);

            try
            {
                const data = await this.getWeatherData(searchValue);
                console.log(data);
                this.clearData();
                data.days.forEach(dayJson => {
                    const dayObject = new WeatherDay(dayJson);
                    const dayComponent = new WeatherDayComponent(dayObject, document);
                    this.weatherDataGrid.appendChild(dayComponent.domObject);
                    this.days.push(dayObject);
                });
            }
            catch(error)
            {
                console.log(error);
                 this.searchInput.setCustomValidity("Please input a valid location");
                 this.searchInput.reportValidity();
            }
            finally
            {
                this.loaderIcon.setVisible(false);
            }
            
        }
    }

    async getWeatherData(location)
    {
        //TODO: add the correct location in the query
        const url = new URL('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' 
            + location + "/next7days" + "?"
        );
        const searchParams = url.searchParams;
        searchParams.append("include", "days");
        searchParams.append("unitGroup", "metric");
        //Ideally, the key shouldn't be exposed. For the sake of the exercise, this free API key is included in the repo.
        //Potentially, it might be safe guarded properly in the future.
        searchParams.append("key", "K2N24927W29CPAGBXSMBDULMB");
        searchParams.append("contentType", "json");
        const response = await fetch(url);
        if(!response.ok)
        {
            throw new Error("Response failed with: " + response.status);
        }

        const data = await response.json();

        return data;
    }

    clearData()
    {
        this.days = [];
        this.weatherDataGrid.innerHTML = '';
    }
}

const mainView = new MainView();