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
    //  this.setColorTheme(theme)
     const previousColorTheme=(theme==='dark' ? 'light':'dark')
    //  this.renderer.removeClass(document.body,previousColorTheme)
    //  this.renderer.addClass(document.body,theme)

     if(previousColorTheme!=='dark'){
      // this.renderer.addClass(document.getElementById('button'),'my-button')
      this.renderer.setAttribute(document.documentElement,'theme-mode','dark')
     }else{
      // this.renderer.removeClass(document.getElementById('button'),'my-button')
      this.renderer.setAttribute(document.documentElement,'theme-mode','light')
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
