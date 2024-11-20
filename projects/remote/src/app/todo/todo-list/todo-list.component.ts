import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, SkipSelf } from '@angular/core';
import { AppConstants } from '../../app.constants';
import { MsalService } from '@azure/msal-angular';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { ActivatedRoute } from '@angular/router';

interface Todo {
  text: string;
  done: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  currentpath: any;

  constructor(private http: HttpClient, private msalService: MsalService, private currentRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.configureAppId()
    this.fetchTodos();
  }


  configureAppId() {
    let checkforDefault = true;
    this.currentRoute.queryParams.forEach((e: any) => {
      if (e.appId !== null && e.appId !== undefined && e.appId.trim() !== "") {
        this.currentpath = e.appId;
        checkforDefault = false;
      }
    });
    if (checkforDefault) {
      this.currentpath = JSON.parse(localStorage.getItem("new_application")!).id;
      checkforDefault = true
    }
  }

  // fetchTodos(): void {
  //   // Hardcoded list of todos
  //   this.todos = [

  //     { text: 'Learn Angular', done: false },
  //     { text: 'Build a Todo App', done: false },
  //     { text: 'Master TypeScript', done: false },
  //     { text: 'Explore Angular Material', done: true }
  //   ];
  // }

  fetchTodos(): void {
    this.http.get<Todo[]>(AppConstants.API_URL + 'api/todo') // Replace with your actual API URL
      .subscribe({
        next: (data) => this.todos = data,
        error: (error) => console.error('Error fetching todos:', error)
      });
  }

  // fetchTodos(): void {
  //   // Acquire the access token silently
  //   this.msalService.acquireTokenSilent({
  //     scopes: [AppConstants.API_SCOPE] // Replace with your API scope
  //   }).subscribe({
  //     next: (response) => {
  //       const token = response.accessToken;
  //       // Set the token in the Authorization header
  //       const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //       // Call the API with the headers
  //       this.http.get<Todo[]>(`${AppConstants.API_URL}api/todo`, { headers })
  //         .subscribe({
  //           next: (data) => this.todos = data,
  //           error: (error) => console.error('Error fetching todos:', error)
  //         });
  //     },
  //     error: (error) => {
  //       if (error instanceof InteractionRequiredAuthError) {
  //         // If silent token acquisition fails, prompt the user to login again
  //         this.msalService.acquireTokenRedirect({
  //           scopes: [AppConstants.API_SCOPE]
  //         });
  //       } else {
  //         console.error('Token acquisition error:', error);
  //       }
  //     }
  //   });
  // }

  toggleTodoStatus(todo: Todo): void {
    todo.done = !todo.done;
  }
}
