import { Injectable } from '@angular/core';
import { Errors } from '../interfaces/errors';

@Injectable({
	providedIn: 'root',
})
export class ShowErrorsService {
	error: string = '';

	errorMessages: Errors = {
		emptyInput: 'Podaj nazwę miejscowości i wyszukaj.',
		noData:
			'Niestety tej miejscowości nie znaleziono, wpisz inną i wyszukaj ponownie.',
		serverErr: 'Przepraszamy, coś poszło nie tak. Spróbuj wyszukać ponownie',
		geolocationErr:
			'Przepraszamy, ale Twoja przglądarka nie obsługuje geolokalizacji, wpisz nazwę miejscowości i wyszukaj ponownie',
		default: 'Przepraszamy, wystąpił jakiś błąd. Spróbuj ponownie.',
	};

	problemCode!: string;

	showError = (problemCode: string): string => {
		switch (problemCode) {
			case 'emptyInput':
				return (this.error = this.errorMessages.emptyInput);
				break;

			case 'serverErr':
				return (this.error = this.errorMessages.serverErr);
				break;

			case 'noData':
				return (this.error = this.errorMessages.noData);
				break;

			case 'noGeo':
				return (this.error = this.errorMessages.geolocationErr);
				break;

			default:
				return (this.error = this.errorMessages.default);
				break;
		}
	};
}
