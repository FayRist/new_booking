import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SidebarContainerComponent } from "./components/sidebar-container.component";
import { SidebarExpandedComponent } from "./components/sidebar-expanded.component";
import { SidebarCollapsedComponent } from "./components/sidebar-collapsed.component";
import { SidebarMainComponent } from "./components/sidebar-main.component";

@NgModule({
  imports:      [
    // BrowserModule,
    // BrowserAnimationsModule
  ],
  declarations: [
    SidebarContainerComponent,
    SidebarExpandedComponent,
    SidebarCollapsedComponent,
    SidebarMainComponent
  ],
  exports:      [
    SidebarContainerComponent,
    SidebarExpandedComponent,
    SidebarCollapsedComponent,
    SidebarMainComponent ],
  providers:    [  ]
})
export class SidebarModule { }
