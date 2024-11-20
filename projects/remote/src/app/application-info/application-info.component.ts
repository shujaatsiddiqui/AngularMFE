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
    const data = { name: this.appName, version: this.version, id: this.uuidv4() };
    localStorage.setItem('new_application', JSON.stringify(data));
    this.appName = '';
    this.version = '';
  }

  uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }
}
