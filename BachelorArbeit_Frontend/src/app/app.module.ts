import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ButtonModule} from "primeng/button";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from "@angular/router";
import {AppRoutingModule, routingComponents} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SidebarModule} from "primeng/sidebar";
import {MenubarModule} from "primeng/menubar";
import { ProfileComponent } from './profile/profile.component';
import {BadgeModule} from "primeng/badge";
import {AccordionModule} from "primeng/accordion";
import {CardModule} from "primeng/card";
import {PanelModule} from "primeng/panel";
import {MegaMenuModule} from "primeng/megamenu";
import {CommonModule} from "@angular/common";
import {HomeModule} from "./home/home.module";
import {NavigationModule} from "./navigation/navigation.module";
import {DividerModule} from "primeng/divider";
import {InputMaskModule} from "primeng/inputmask";
import { PropertiesListComponent } from './properties/properties-list/properties-list.component';
import { AddPropertyComponent } from './properties/add-property/add-property.component';
import {FileUploadModule} from "primeng/fileupload";
import {TagModule} from "primeng/tag";
import {ImageModule} from "primeng/image";
import { TenantsListComponent } from './tenants-list/tenants-list.component';
import { HomeTenantComponent } from './home-tenant/home-tenant.component';
import { LikedPropertiesComponent } from './properties/liked-properties/liked-properties.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { RentalRequestComponent } from './rental-request/rental-request.component';
import { FirstPageComponent } from './first-page/first-page.component';
import {ScrollPanelModule} from "primeng/scrollpanel";
import {MatMenuItem} from "@angular/material/menu";
import {TabMenuModule} from "primeng/tabmenu";
import {RippleModule} from "primeng/ripple";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ProfileComponent,
    PropertiesListComponent,
    AddPropertyComponent,
    TenantsListComponent,
    HomeTenantComponent,
    LikedPropertiesComponent,
    RentalRequestComponent,
    FirstPageComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    SidebarModule,
    MenubarModule,
    BadgeModule,
    AccordionModule,
    CardModule,
    PanelModule,
    MegaMenuModule,
    FormsModule,
    HomeModule,
    NavigationModule,
    DividerModule,
    InputMaskModule,
    FileUploadModule,
    TagModule,
    ImageModule,
    HomeModule,
    NgbModule,
    MatIconModule,
    MatButtonModule,
    ScrollPanelModule,
    TabMenuModule,
    RippleModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
