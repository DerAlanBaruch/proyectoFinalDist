import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TuiRootModule, TuiDialogModule } from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputTimeModule } from '@taiga-ui/kit';
import { TuiRadioBlockModule } from '@taiga-ui/kit';
import { TuiGroupModule } from '@taiga-ui/core';
import { TuiBadgeModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [AppComponent, PrincipalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TuiRootModule,
    BrowserAnimationsModule,
    TuiDialogModule,
    TuiIslandModule,
    TuiButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputTimeModule,
    TuiRadioBlockModule,
    TuiGroupModule,
    TuiBadgeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
