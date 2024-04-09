import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/components/header/header.component';
import { IndexComponent } from './home/pages/index/index.component';
import { SimulacaoComponent } from './home/pages/simulacao/simulacao.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SimulacaoTabsComponent } from './home/components/simulacao-tabs/simulacao-tabs.component';
import {MatTabsModule} from '@angular/material/tabs'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    SimulacaoComponent,
    SimulacaoTabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
