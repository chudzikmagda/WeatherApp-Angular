interface WeatherDescription {
	icon?: string;
	code?: number;
	description?: string
}

interface DataValues {
	app_temp?: number;
	aqi?: number;
	city_name?: string;
	clouds?: number;
	country_code?: string;
	datetime?: string;
	dewpt?: number;
	dhi?: number;
	dni?: number;
	elev_angle?: number;
	ghi?: number;
	h_angle?: number;
	lat?: number;
	lon?: number;
	ob_time?: string;
	pod?: string;
	precip?: number;
	pres?: number;
	rh?: number;
	slp?: number;
	snow?: number;
	solar_rad?: number;
	state_code?: string;
	station?: string;
	sunrise?: string;
	sunset?: string;
	temp?: number;
	timezone?: string;
	ts?: number;
	uv?: number;
	vis?: number;
	weather?: WeatherDescription,
	wind_cdir?: string;
	wind_cdir_full?: string;
	wind_dir?: number;
	wind_spd?: number;
}

export interface CurrentWeatherAPI {
	count?: number;
	data?: any
}
