import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RFQComponent } from './components/rfq/rfq.component';
import { POComponent } from './components/po/po.component';
import { GRComponent } from './components/gr/gr.component';
import { AgingComponent } from './components/aging/aging.component';
import { InvoiceFrontComponent } from './components/invoice-front/invoice-front.component';
import { InvoiceBackComponent } from './components/invoice-back/invoice-back.component';
import { CreditInfoComponent } from './components/credit-info/credit-info.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LoginComponent,
    DashboardComponent,
    RFQComponent,
    POComponent,
    GRComponent,
    AgingComponent,
    InvoiceFrontComponent,
    InvoiceBackComponent,
    CreditInfoComponent,
    ProfileComponent,
    NavigationComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 