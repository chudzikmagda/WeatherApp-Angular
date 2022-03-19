import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HeaderComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create header', () => {
		expect(component).toBeTruthy();
	});
	it('should render page title', () => {
		const headerName =
			fixture.debugElement.nativeElement.querySelector('.header__name');
		expect(headerName.textContent).toEqual('Sprawdź pogodę');
	});
	it('should set image logotype path as expected', () => {
		const img = fixture.debugElement.nativeElement.querySelector('img');
		expect(img['src']).toContain('sun-logotype.svg');
	});
});
