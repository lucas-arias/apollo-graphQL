import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ADD_TODO, DELETE_TODO, GET_TODOS } from './todos.queries';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: any[] = [];
  error: any;

  todoForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_TODOS
    }).valueChanges.subscribe(({ data, error }: any) => {
      this.todos = data.todos;
      this.error = error;
    }
    );
  }

  addTodo() {
    this.apollo.mutate({
      mutation: ADD_TODO,
      variables: {
        name: this.todoForm.value.name,
        description: this.todoForm.value.description,
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    }).subscribe(({ data }: any) => {
      this.todoForm.reset();
    }
      , (error) => {
        this.error = error;
      }
    );

  }

  deleteTodo(id: string) {
    this.apollo.mutate({
      mutation: DELETE_TODO,
      variables: {
        id: id,
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    }).subscribe(({ data }: any) => { }
      , (error) => {
        this.error = error;
      }
    );
  }
}