import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
// ...existing code...

@NgModule({
     declarations: [
          // ...existing code...
     ],
     imports: [
          BrowserModule,
          HttpClientModule, // Agregar HttpClientModule a los imports
          // ...existing code...
     ],
     providers: [],
     bootstrap: []
})
export class AppModule { }