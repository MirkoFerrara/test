import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hello-widget',
  standalone: false,
  templateUrl: './hello-widget.html',
  styleUrls: ['./hello-widget.css']
})
export class HelloWidget {
  @Input() name: string = 'World';
  @Input() color: string = '#4CAF50';
  
  counter: number = 0;
  
  increment() {
    this.counter++;
  }
}