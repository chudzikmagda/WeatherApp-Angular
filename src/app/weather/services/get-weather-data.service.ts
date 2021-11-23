import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentWeatherAPI } from '../interfaces/current-weather-api';
import { ForecastWeatherAPI } from '../interfaces/forecast-weather-api'

@Injectable({
	providedIn: 'root'
})
export class GetWeatherData {
	apiKey: string = 'ce3bd9b235b547529a22161ec85fd1ef';
	apiUrl: string = "https://api.weatherbit.io/v2.0/"

	constructor(private http: HttpClient) { }

	getCurrentWeatherData(cityName: string) {
		return this.http
			.get<any>(`${this.apiUrl}current?&city=${cityName}&key=${this.apiKey}&lang=pl`)
	}

	getForecastWeatherData(cityName: string) {
		return this.http
			.get<ForecastWeatherAPI>(`${this.apiUrl}forecast/daily?&city=${cityName}&key=${this.apiKey}&lang=pl`)
	}
};
