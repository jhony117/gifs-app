import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/Sidebar/Sidebar.component';
import { LazyImageComponent } from './components/Sidebar/lazy-image/lazy-image.component';



@NgModule({
  declarations: [
    SidebarComponent,
    LazyImageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    LazyImageComponent
  ]
})
export class SharedModule { }
