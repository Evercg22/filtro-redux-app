import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/filter.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Todo } from '../model/todo.model';
import { BorrarCompletadosTodoAction } from '../todo.actions';
@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  pendientes: number;

  filtrosValidos: fromFiltro.filtrosValidod[] = ['todos', 'completados', 'pendientes'];
  filtroActual: fromFiltro.filtrosValidod;

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe( state => {
      this.contarPendientes(state.todos);
      this.filtroActual = state.filtro;
    });
  }

  cambiarFiltro( nuevoFiltro: fromFiltro.filtrosValidod) {
    const action = new fromFiltro.SetFiltroAction( nuevoFiltro );
    this.store.dispatch( action );
  }

  contarPendientes( todos: Todo[] ) {
    this.pendientes = todos.filter( todo => !todo.completado).length;
  }

  borrarCompletados() {
    const action = new BorrarCompletadosTodoAction();
    this.store.dispatch( action );
  }



}
