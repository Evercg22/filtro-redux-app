import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { ToggleTodoAction, EditarTodoAction, BorrarTodoAction } from '../todo.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';



@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  chkField: FormControl;
  txtInput: FormControl;

  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;

  editando: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.chkField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);
    this.chkField.valueChanges.subscribe(
      () => {
         const action = new  ToggleTodoAction( this.todo.id);
         this.store.dispatch( action );
      }
    );
  }

  editar () {
    this.editando = true;

    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    },  1);
  }

  terminarEdicion() {
    this.editando = false;
    if (!this.txtInput.valid) {
      return;
    }

    if (this.txtInput.value === this.todo.texto) {
      return;
    }
    const action = new  EditarTodoAction( this.todo.id, this.txtInput.value);
    this.store.dispatch( action );
  }

  eliminar() {
    const action = new  BorrarTodoAction( this.todo.id );
    this.store.dispatch( action );
  }

}
