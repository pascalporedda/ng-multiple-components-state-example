import { Injectable } from '@angular/core';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModuleStateInstanceService {
  routeIdentifier: string | number = 'instanceId';
  protected activatedRoute: ActivatedRoute = null;

  protected currentInstanceId$$ = new BehaviorSubject<string | number>(null);
  currentInstanceId$ = this.currentInstanceId$$
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(private router: Router) {
    this.observeRouterEvents();
  }

  observeRouterEvents(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => {
          console.log(event);
          let route = this.router.routerState.root;
          while (route.firstChild) {
            route = route.firstChild;
          }

          return route;
        }),
        map((activeRoute) => activeRoute.params as BehaviorSubject<Params>),
        // TODO: can someone please explain me how this RXJS BS works?
        map((params) => params.getValue()[this.routeIdentifier])
      )
      .subscribe((instanceId) => {
        this.currentInstanceId$$.next(instanceId);
      });
  }
}
