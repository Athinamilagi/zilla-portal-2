import { Routes } from '@angular/router';
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
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'rfq', component: RFQComponent },
      { path: 'po', component: POComponent },
      { path: 'gr', component: GRComponent },
      { path: 'aging', component: AgingComponent },
      { path: 'invoice-front', component: InvoiceFrontComponent },
      { path: 'invoice-back/:belnr/:lifnr', component: InvoiceBackComponent },
      { path: 'credit-info', component: CreditInfoComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  { path: '**', redirectTo: '/login' }
]; 