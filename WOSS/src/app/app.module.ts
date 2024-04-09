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
import {MatTabsModule} from '@angular/material/tabs';
import { OpcoesComponent } from './home/components/opcoes/opcoes.component';
import {MatSliderModule} from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './home/components/modal/modal.component';
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    SimulacaoComponent,
    SimulacaoTabsComponent,
    OpcoesComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatSliderModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
