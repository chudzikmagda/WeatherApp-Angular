import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { PreloaderService } from '../services/preloader.service';

@Injectable({
	providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
	constructor(public preloaderService: PreloaderService) {}
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		this.preloaderService.isLoading.next(true);
		return next.handle(req);
	}
}
