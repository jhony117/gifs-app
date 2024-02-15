
import {  Component, ChangeDetectorRef } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './Sidebar.component.html',
  styleUrl: './Sidebar.component.css',
 
})
export class SidebarComponent {
 

  constructor(private gifsService:GifsService) {}
              // private actuHtml: ChangeDetectorRef
 
   get tags():string[] {
         return this.gifsService.tagsHistory;
   }
    //* cuando uses un servicio privado no lo declares como variable
       //// tags =   this.gifsService.tagsHistory;  
    //* tienes que llamarlo con un get       
    
 
  searchTag(tag:string):void{
      this.gifsService.searchTag(tag);
  }

  // actualizarHtml() {
  //   this.actuHtml.detectChanges();
  // }
 }
