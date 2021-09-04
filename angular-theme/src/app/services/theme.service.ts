import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private renderer:Renderer2
  private colorTheme!:string

  constructor(private rendererFactory:RendererFactory2) {

    this.renderer=rendererFactory.createRenderer(null,null)
   }

   initTheme(){
     this.getColorTheme()
     this.renderer.addClass(document.body,this.colorTheme)
   }

   updateTheme(theme:'dark' | 'light'){
     const previousColorTheme=(theme==='dark' ? 'light':'dark')
     if(previousColorTheme!=='dark'){
      this.renderer.setAttribute(document.documentElement,'theme-mode','dark')
     }else{
      this.renderer.setAttribute(document.documentElement,'theme-mode','light')
     }
   }

   updateLayout(type:number){
    switch(type){
      case 0:
        this.renderer.setAttribute(document.getElementsByClassName('sidebar')[0],'layout',`${type}`);
        break;
      case 1:
        this.renderer.setAttribute(document.getElementsByClassName('sidebar')[0],'layout',`${type}`);
        break;
      case 2:
        this.renderer.setAttribute(document.getElementsByClassName('sidebar')[0],'layout',`${type}`);
        break;
      case 3:
        this.renderer.setAttribute(document.getElementsByClassName('sidebar')[0],'layout',`${type}`);
        break;
      default :
       this.renderer.setAttribute(document.getElementsByClassName('sidebar')[0],'layout',`${0}`);
       break;
      }
   }

   isDarkMode(){
     return this.colorTheme==='dark-mode'
   }

   private setColorTheme(theme:any){
     this.colorTheme=theme
     localStorage.setItem('user-theme',theme)
   }

   private getColorTheme(){
     if(localStorage.getItem('user-theme')){
       this.colorTheme=JSON.stringify(localStorage.getItem('user-theme'))

     }
   }
}
