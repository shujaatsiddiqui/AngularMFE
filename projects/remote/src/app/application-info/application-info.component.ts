import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-info',
  standalone: true, // if it's a standalone component
  imports: [
    CommonModule,
    FormsModule
  ],
  template: `
    <form (ngSubmit)="save()">
      <div>
        <label>Application Name:</label>
        <input [(ngModel)]="appName" name="appName" required>
      </div>
      <div>
        <label>Version:</label>
        <input [(ngModel)]="version" name="version" required>
      </div>
      <button type="submit">Save</button>
    </form>
  `,
})
export class ApplicationInfoComponent implements OnInit {
  ngOnInit(): void {
  }
  appName: string = '';
  version: string = '';

  save() {
    // Code to save application info to the database
    console.log('Saved:', { name: this.appName, version: this.version });
  }
}
