import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentWeatherAPI } from '../interfaces/current-weather-api';
import { ForecastWeatherAPI } from '../interfaces/forecast-weather-api';
import { Location } from '../interfaces/location';

@Injectable({
	providedIn: 'root',
})
export class GetWeatherData {
	apiKey: string = 'ce3bd9b235b547529a22161ec85fd1ef';
	apiUrl: string = 'https://api.weatherbit.io/v2.0/';

	constructor(private http: HttpClient) {}

	getCurrentWeatherData(location: Location, target?: string) {
		return this.http.get<CurrentWeatherAPI>(
			`${this.apiUrl}current?${
				target === 'inputBtn' || target === 'enter'
					? 'city=' + location.city
					: '&lat=' + location.latitude + '&lon=' + location.longitude
			}&key=${this.apiKey}&lang=pl`
		);
	}

	getForecastWeatherData(location: Location, target?: string) {
		return this.http.get<ForecastWeatherAPI>(
			`${this.apiUrl}forecast/daily?${
				target === 'inputBtn' || target === 'enter'
					? 'city=' + location.city
					: '&lat=' + location.latitude + '&lon=' + location.longitude
			}&key=${this.apiKey}&lang=pl`
		);
	}
}
