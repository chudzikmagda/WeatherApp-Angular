import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CurrentWeatherAPI } from '../interfaces/current-weather-api';
import { GetWeatherData } from './get-weather-data.service';
import { currrentWeatherDataGeoMock } from './services-tests-mocks/current-weather-geoloaction';
import { currrentWeatherDataCityMock } from './services-tests-mocks/current-weather-city-name';
import { forecastDataGeoMock } from './services-tests-mocks/forecast-geoloaction';
import { forecastDataCityMock } from './services-tests-mocks/forecast-geoloaction-city-name';

describe('GetWeatherDataService', () => {
	let service: GetWeatherData;
	let httpTestingController: HttpTestingController;
	const location = {
		city: 'Kraków',
		latitude: 50.06143,
		longitude: 19.93658,
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [GetWeatherData],
		});

		service = TestBed.inject(GetWeatherData);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	it('it should return expected current weather data based on the provided city name', () => {
		service.getCurrentWeatherData(location, 'enter').subscribe((data) => {
			expect(data).toBeTruthy();
			expect(data.data[0].city_name).toEqual(location.city);
		});

		const reqApi = httpTestingController.expectOne(
			(req) => req.url === 'https://api.weatherbit.io/v2.0/current?'
		);

		const expectedData: CurrentWeatherAPI = currrentWeatherDataCityMock;

		expect(reqApi.request.method).toEqual('GET');
		expect(reqApi.request.params.get('city')).toEqual(location.city);
		expect(reqApi.request.params.get('key')).toEqual(
			'ce3bd9b235b547529a22161ec85fd1ef'
		);
		expect(reqApi.request.params.get('lang')).toEqual('pl');
		reqApi.flush(expectedData);
	});

	it('it should return expected current weather data based on the user geolacation', () => {
		service.getCurrentWeatherData(location).subscribe((data) => {
			expect(data).toBeTruthy();
			expect(data.data[0].lat).toEqual(location.latitude);
			expect(data.data[0].lon).toEqual(location.longitude);
		});

		const reqApi = httpTestingController.expectOne(
			(req) => req.url === 'https://api.weatherbit.io/v2.0/current?'
		);

		const expectedData: CurrentWeatherAPI = currrentWeatherDataGeoMock;
		expect(reqApi.request.method).toEqual('GET');
		expect(reqApi.request.params.get('lat')).toEqual(
			location.latitude.toString()
		);
		expect(reqApi.request.params.get('lon')).toEqual(
			location.longitude.toString()
		);
		expect(reqApi.request.params.get('key')).toEqual(
			'ce3bd9b235b547529a22161ec85fd1ef'
		);
		expect(reqApi.request.params.get('lang')).toEqual('pl');
		reqApi.flush(expectedData);
	});

	it('it should return expected weather forecast data based on the provided city name', () => {
		service.getForecastWeatherData(location, 'enter').subscribe((data) => {
			expect(data).toBeTruthy();
		});

		const reqApi = httpTestingController.expectOne(
			(req) => req.url === 'https://api.weatherbit.io/v2.0/forecast/daily?'
		);

		const expectedData: any = forecastDataCityMock;

		expect(reqApi.request.method).toEqual('GET');
		expect(reqApi.request.params.get('city')).toEqual(location.city);
		expect(reqApi.request.params.get('key')).toEqual(
			'ce3bd9b235b547529a22161ec85fd1ef'
		);
		expect(reqApi.request.params.get('lang')).toEqual('pl');
		reqApi.flush(expectedData);
	});

	it('it should return expected weather forecast data based on the user geolocation', () => {
		service.getForecastWeatherData(location).subscribe((data) => {
			expect(data).toBeTruthy();
		});

		const reqApi = httpTestingController.expectOne(
			(req) => req.url === 'https://api.weatherbit.io/v2.0/forecast/daily?'
		);

		const expectedData: any = forecastDataGeoMock;

		expect(reqApi.request.method).toEqual('GET');
		expect(reqApi.request.params.get('lat')).toEqual(
			location.latitude.toString()
		);
		expect(reqApi.request.params.get('lon')).toEqual(
			location.longitude.toString()
		);
		expect(reqApi.request.params.get('key')).toEqual(
			'ce3bd9b235b547529a22161ec85fd1ef'
		);
		expect(reqApi.request.params.get('lang')).toEqual('pl');
		reqApi.flush(expectedData);
	});

	afterEach(() => {
		httpTestingController.verify();
	});
});
