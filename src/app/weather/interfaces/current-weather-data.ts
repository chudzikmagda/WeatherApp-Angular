export interface CurrentWeatherData {
	city?: string;
	sunrise?: string;
	sunset?: string;
	description?: string;
	pressure?: number;
	humidity?: number;
	windSpeed?: number;
	visibility?: number;
	tempreture?: number;
	perceivedTempreture: number;
	icon?: string;
}
