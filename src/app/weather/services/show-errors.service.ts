import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class ShowErrorsService {

	error = '';

	errorMessages = {
		emptyInput: 'Podaj nazwę miejscowości i wyszukaj.',
		noData: 'Niestety tej miejscowości nie znaleziono, wpisz inną i wyszukaj ponownie.',
		serverErr: 'Przepraszamy, coś poszło nie tak. Spróbuj wyszukać ponownie'
	};

	problemCode: string = '';

	showError = (problemCode: string): any => {

		switch (problemCode) {
			case 'emptyInput':
				return this.error = this.errorMessages.emptyInput;
				break;

			case 'serverErr':
				return this.error = this.errorMessages.serverErr;
				break;

			case 'noData':
				return this.error = this.errorMessages.noData;
				break;

			default:
				break;
		}
	}
}
