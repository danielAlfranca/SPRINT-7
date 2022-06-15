import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { ReactiveFormsModule } from '@angular/forms';
import { PanellComponent } from './components/panell/panell.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BudgetsListComponent } from './components/budgets-list/budgets-list.component';
import { FormCreatorComponent } from './components/form-creator/form-creator.component';
import { FormInputComponent } from './components/form-creator/form-input/form-input.component';
import { BudgetFieldsComponent } from './components/budget-fields/budget-fields.component';
import { BudgetTotalPipe } from './pipes/budget-total.pipe';
import { PanelFilterComponent } from './components/panel-filter/panel-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PanellComponent,
    WelcomeComponent,
    BudgetsListComponent,
    FormCreatorComponent,
    FormInputComponent,
    BudgetFieldsComponent,
    BudgetTotalPipe,
    PanelFilterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
