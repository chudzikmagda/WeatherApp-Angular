import {
	ComponentFixture,
	TestBed,
	waitForAsync,
	fakeAsync,
} from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { GetWeatherData } from './services/get-weather-data.service';
import { DebugElement } from '@angular/core';

describe('WeatherComponent', () => {
	let component: WeatherComponent;
	let fixture: ComponentFixture<WeatherComponent>;
	let element: DebugElement;
	let httpController: HttpTestingController;
	let service: GetWeatherData;
	const location = {
		city: 'Kraków',
		latitude: 50.06143,
		longitude: 19.93658,
	};

	beforeEach(
		waitForAsync(() => {
			const serviceSpy = jasmine.createSpyObj('GetWeatherData', [
				'getForecastWeatherData',
			]);

			TestBed.configureTestingModule({
				declarations: [WeatherComponent],
				imports: [HttpClientTestingModule],
				providers: [GetWeatherData],
			})
				.compileComponents()
				.then(() => {
					fixture = TestBed.createComponent(WeatherComponent);
					component = fixture.componentInstance;
					element = fixture.debugElement;
				});

			service = TestBed.inject(GetWeatherData);
			httpController = TestBed.inject(HttpTestingController);
		})
	);

	it('should create WeatherComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should render input', () => {
		const input = element.nativeElement.querySelector('input');
		expect(input).toBeTruthy();
	});

	it('should render button', () => {
		const btn = element.nativeElement.querySelector('.form__btn');
		expect(btn).toBeTruthy();
	});

	it('should render button image', () => {
		const img = element.nativeElement.querySelector('.form__btn>img');
		expect(img['src']).toContain('icon-search.svg');
	});

	it('should render geolocation button', () => {
		const geoLoc = element.nativeElement.querySelector('.geolocation__btn');
		expect(geoLoc).toBeTruthy();
	});

	it('should render geolocation button text', () => {
		const geoLoc = element.nativeElement.querySelector('.geolocation__btn');
		expect(geoLoc.textContent).toContain('Zlokalizuj mnie');
	});

	it('should render geolocation icon', () => {
		const geoLocIcon = element.nativeElement.querySelector(
			'.geolocation__btn>svg'
		);
		expect(geoLocIcon).toBeTruthy();
		expect(geoLocIcon['height']).toBeDefined();
		expect(geoLocIcon['width']).toBeDefined();
	});

	it('should render hero image in the welcome section', () => {
		const heroImg = element.nativeElement.querySelector('.hero__img');
		expect(heroImg['src']).toContain('hero-image.webp');
	});

	it('should render forecast and current weather', fakeAsync(() => {
		pending();
	}));
});
