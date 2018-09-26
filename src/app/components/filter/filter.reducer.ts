import * as fromFiltro from './filter.actions';


const estadoInicial: fromFiltro.filtrosValidod = 'todos';

export function filtroReducer ( state = estadoInicial, action: fromFiltro.acciones): fromFiltro.filtrosValidod {
    switch (action.type) {
        case fromFiltro.SET_FILTER:
            return action.filtro;
        default:
            return state;
    }
}
