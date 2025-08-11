import { Component, signal } from '@angular/core';
import { DogBreedsTableComponent } from './dog-breeds-table/dog-breeds-table.component';

@Component({
  selector: 'app-root',
  imports: [DogBreedsTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('dog-breeds-app');
}
