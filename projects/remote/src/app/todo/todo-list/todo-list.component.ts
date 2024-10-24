import { Component } from '@angular/core';
import { AuthService } from 'host/AuthService';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {


  constructor(private authService: AuthService) {
    // Use AuthService methods like login, logout, etc.
    this.authService.logout() // logs not implemented to browser console
  }
}
