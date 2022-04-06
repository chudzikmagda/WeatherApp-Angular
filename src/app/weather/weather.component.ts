import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
} from '@angular/core';
import { CurrentWeatherData } from './interfaces/current-weather-data';
import { GetWeatherData } from './services/get-weather-data.service';
import { Location } from './interfaces/location';
import { ShowErrorsService } from './services/show-errors.service';
import { ViewportScroller } from '@angular/common';
import { forkJoin, Subscription } from 'rxjs';
import { PreloaderService } from '../components/preloader/services/preloader.service';

@Component({
	selector: 'app-weather',
	templateUrl: './weather.component.html',
	styleUrls: ['./weather.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent implements OnDestroy {
	location: Location = {};
	target!: string;
	currentWeather: CurrentWeatherData = {
		city: '',
		sunrise: '',
		sunset: '',
		description: '',
		pressure: 0,
		humidity: 0,
		windSpeed: 0,
		visibility: 0,
		tempreture: 0,
		perceivedTempreture: 0,
		icon: '',
	};
	forecastWeather: any = {};
	iconsURL = 'assets/images/icons/';
	sectionWithDataClass: string = 'section section--weather section--hidden';
	errorShowClass!: string;
	error!: string;
	dataSubscription: Subscription = new Subscription();

	constructor(
		private data: GetWeatherData,
		private errors: ShowErrorsService,
		private scroll: ViewportScroller,
		private ref: ChangeDetectorRef,
		public preloaderService: PreloaderService
	) {}

	showErrorMsgBox(): void {
		if (this.location.city === '') {
			this.errorShowClass = 'form__message';
			this.error = this.errors.showError('emptyInput');
		} else {
			this.errorShowClass = 'form__message';
			this.error = this.errors.showError('serverErr');
		}
	}

	scrollToTop(): void {
		this.scroll.scrollToPosition([0, 0]);
	}

	getPosition(): Promise<Location> {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					resolve({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
				},
				() => {
					reject(this.errors.showError('noGeo'));
				}
			);
		});
	}

	async getGeolocation(): Promise<Location> {
		return (this.location = await this.getPosition());
	}

	showData(): void {
		this.dataSubscription = forkJoin({
			current: this.data.getCurrentWeatherData(this.location, this.target),
			forecast: this.data.getForecastWeatherData(this.location, this.target),
		}).subscribe({
			next: (response) => {
				if (response) {
					this.errorShowClass = '';
					this.error = '';
					const data = response.current.data[0];
					this.currentWeather.city = data.city_name;
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
					this.forecastWeather = response.forecast;
				} else {
					this.errorShowClass = 'form__message';
					this.error = this.errors.showError('noData');
				}
			},
			error: () => {
				this.preloaderService.isLoading.next(false);
				this.showErrorMsgBox();
			},
			complete: () => {
				if (this.location.city || this.target === 'geolocation') {
					this.preloaderService.isLoading.next(false);
					this.sectionWithDataClass = 'section section--weather';
					this.ref.detectChanges();
					this.scroll.scrollToAnchor('currentWeatherSection');
				}
			},
		});
	}

	async startApp(target: string): Promise<void> {
		this.target = target;
		if (this.target === 'geolocation') {
			return await this.getGeolocation().then(() => {
				this.showData();
			});
		} else if (this.target === 'inputBtn' || this.target === 'enter') {
			if (this.location.city) {
				return this.showData();
			} else {
				this.errorShowClass = 'form__message';
				this.error = this.errors.showError('emptyInput');
			}
		}
	}

	ngOnDestroy = (): void => {
		this.dataSubscription.unsubscribe();
	};
}
