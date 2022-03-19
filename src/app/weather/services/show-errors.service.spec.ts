import { ShowErrorsService } from './show-errors.service';

describe('ShowErrorsService', () => {
	const error = new ShowErrorsService();

	it('it should return message when the input is empty', () => {
		expect(error.showError('emptyInput')).toEqual(
			'Podaj nazwę miejscowości i wyszukaj.'
		);
	});
	it('it should return message when server return no data', () => {
		expect(error.showError('noData')).toEqual(
			'Niestety tej miejscowości nie znaleziono, wpisz inną i wyszukaj ponownie.'
		);
	});
	it('it should return message when someting went wrong', () => {
		expect(error.showError('serverErr')).toEqual(
			'Przepraszamy, coś poszło nie tak. Spróbuj wyszukać ponownie'
		);
	});
	it('it should return message when the browser do not have a geolocation', () => {
		expect(error.showError('noGeo')).toEqual(
			'Przepraszamy, ale Twoja przglądarka nie obsługuje geolokalizacji, wpisz nazwę miejscowości i wyszukaj ponownie'
		);
	});
	it('it should return default message on other bugs', () => {
		expect(error.showError('')).toEqual(
			'Przepraszamy, wystąpił jakiś błąd. Spróbuj ponownie.'
		);
	});
});
