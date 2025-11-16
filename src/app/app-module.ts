import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { HelloWidget } from './hello-widget/hello-widget';

@NgModule({
  declarations: [HelloWidget],
  imports: [BrowserModule],
  providers: []
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const helloWidget = createCustomElement(HelloWidget, { 
      injector: this.injector 
    });
    customElements.define('hello-widget', helloWidget);
  }
}