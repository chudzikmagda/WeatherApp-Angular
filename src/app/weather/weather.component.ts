import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { CurrentWeatherData } from './interfaces/current-weather-data';
import { GetWeatherData } from './services/get-weather-data.service';
import { ShowErrorsService } from './services/show-errors.service';
import { ViewportScroller } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-weather',
	templateUrl: './weather.component.html',
	styleUrls: ['./weather.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class WeatherComponent implements OnDestroy {
	currentWeather: CurrentWeatherData = {
		sunrise: '',
		sunset: '',
		description: '',
		pressure: 0,
		humidity: 0,
		windSpeed: 0,
		visibility: 0,
		tempreture: 0,
		perceivedTempreture: 0,
		icon: ''
	};

	forecastWeather: any = [];
	cityName: string = '';
	showCityName: string = '';
	iconsURL = '../../assets/images/icons/';
	sectionWithDataClass: string = 'section section--weather section--hidden';
	errorShowClass: string = ''
	error: string = '';
	result: boolean = false;

	currentWeatherSubscription: Subscription = new Subscription;;
	forecastSubscription: Subscription = new Subscription;

	constructor(
		private data: GetWeatherData,
		private errors: ShowErrorsService,
		private scroll: ViewportScroller,
		private ref: ChangeDetectorRef
	) { }

	showError(): void {
		if (this.cityName === '') {
			this.errorShowClass = 'form__message';
			this.error = this.errors.showError('emptyInput');
		} else {
			this.errorShowClass = 'form__message';
			this.error = this.errors.showError('serverErr');
		}
	}

	showCurrentWeather = (): Promise<boolean> => {
		return new Promise<boolean>((resolve, reject) => {
			this.currentWeatherSubscription = this.data.getCurrentWeatherData(this.cityName).subscribe(
				{
					next: response => {
						if (response) {
							const data = response.data[0];
							this.errorShowClass = '';
							this.error = '';
							this.currentWeather.sunrise = data.sunrise;
							this.currentWeather.sunset = data.sunset;
							this.currentWeather.description = data.weather.description;
							this.currentWeather.pressure = data.pres;
							this.currentWeather.humidity = data.rh;
							this.currentWeather.windSpeed = data.wind_spd;
							this.currentWeather.visibility = data.vis;
							this.currentWeather.tempreture = data.temp;
							this.currentWeather.perceivedTempreture = data.app_temp;
							this.currentWeather.icon = `${this.iconsURL}${data.weather.icon}.svg`;
							this.showCityName = this.cityName;
							resolve(true);
						} else if (!response) {
							this.errorShowClass = 'form__message';
							this.error = this.errors.showError('noData');
						}
					},

					error: () => this.showError()
				}
			)
		})
	}

	showForecastWeather = (): Promise<boolean> => {
		return new Promise<boolean>((resolve, reject) => {
			this.forecastSubscription = this.data.getForecastWeatherData(this.cityName).subscribe(
				{
					next: response => {
						if (response) {
							this.errorShowClass = '';
							this.error = '';
							this.forecastWeather = response;
							resolve(true);
						} else if (!response) {
							this.errorShowClass = 'form__message';
							this.error = this.errors.showError('noData');
						}
					},

					error: () => this.showError()
				}
			)
		})
	}

	startApp = (event: Event): void => {
		event.stopPropagation();
		this.showCurrentWeather();
		this.showForecastWeather()
			.then(
				() => {
					this.sectionWithDataClass = 'section section--weather';
				})
			.then(() => {
				this.ref.detectChanges();
				this.scroll.scrollToAnchor('currentWeatherSection');
			})
	}

	scrollToTop(): void {
		this.scroll.scrollToPosition([0, 0])
	}

	ngOnDestroy(): void {
		this.currentWeatherSubscription.unsubscribe();
		this.forecastSubscription.unsubscribe();
	}
}
