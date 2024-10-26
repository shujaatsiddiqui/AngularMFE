import { Component } from '@angular/core';
import { AuthService } from 'auth-lib';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {


  constructor(private authService: AuthService) {
    // Use AuthService methods like login, logout, etc.
    const user$ = this.authService.login()

    user$.subscribe(val => {
      console.log({ val });

    })
  }
}
