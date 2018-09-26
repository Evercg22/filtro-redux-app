import { Action } from '@ngrx/store';
export const SET_FILTER = '[Filter] Set Filtro';

export type filtrosValidod = 'todos' | 'completados' | 'pendientes';

export class SetFiltroAction implements Action {
    readonly type = SET_FILTER;
    
    constructor ( public filtro: filtrosValidod) {}
}

export type acciones = SetFiltroAction;
