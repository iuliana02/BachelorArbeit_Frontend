import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/component/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {PropertiesListComponent} from "./properties/properties-list_tenants/properties-list.component";
import {AddPropertyComponent} from "./properties/add-property/add-property.component";
import {TenantsListComponent} from "./tenants-list/tenants-list.component";
import {HomeTenantComponent} from "./home-tenant/home-tenant.component";
import {RoleGuard} from "./guards/role.guard";
import {LikedPropertiesComponent} from "./properties/liked-properties/liked-properties.component";
import {RentalRequestComponent} from "./rental-request/rental-request.component";
import {FirstPageComponent} from "./first-page/first-page.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {LoggedInGuard} from "./guards/loggedin-guard";
import {
  PropertiesListLandlordComponent
} from "./properties/properties-list-landlord/properties-list-landlord.component";
import {AppointmentsTenantComponent} from "./appointments-tenant/appointments-tenant.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'first-page',
    pathMatch: 'full'
  },
  {
    path:'first-page',
    component: FirstPageComponent,
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'signup',
    component: SignupComponent
  },
  {
    path: 'home-landlord',
    component: HomeComponent,
    // canActivate: [RoleGuard],
    // data: {
    //   role: 'landlord'
    // }
    canActivate:[LoggedInGuard]
  },
  {
    path: 'home-tenant',
    component: HomeTenantComponent,
    // canActivate: [RoleGuard],
    // data: {
    //   role: 'tenant'
    // }
    canActivate:[LoggedInGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate:[LoggedInGuard]
  },
  {
    path: 'properties-list',
    component: PropertiesListComponent,
    canActivate:[LoggedInGuard]
  },
  {
    path: 'properties-list-landlord',
    component: PropertiesListLandlordComponent,
    canActivate:[LoggedInGuard]
  },
  {
    path: 'liked-properties',
    component: LikedPropertiesComponent,
    canActivate:[LoggedInGuard]
  },
  {
    path: 'add-property',
    component: AddPropertyComponent,
    canActivate:[LoggedInGuard]
  },
  {
    path: 'tenants-list',
    component: TenantsListComponent,
    canActivate:[LoggedInGuard]
  },
  {
    path: 'rental-request',
    component: RentalRequestComponent,
    canActivate:[LoggedInGuard]
  },
  {
    path: 'appointments-tenant',
    component: AppointmentsTenantComponent,
    canActivate:[LoggedInGuard]
  }
];

const config: ExtraOptions = {
  enableTracing: true,
  onSameUrlNavigation: 'reload'
}

@NgModule({
  imports: [RouterModule.forRoot(routes,config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = []
