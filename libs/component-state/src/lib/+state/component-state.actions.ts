import { createAction } from '@ngrx/store';

export const init = createAction('');


// @Injectable()
// export class FormGlobalCacheAdapterService<T> implements AbstractFormCacheAdapter<T> {
//   constructor(private globalCache: GlobalCacheService) {
//   }
//
//   retrieve(key: string): T {
//     return this.globalCache.getRecord<T>(key);
//   }
//
//   store(state: T, key: string): void { this.globalCache.setRecord<T>(key, state); } }

