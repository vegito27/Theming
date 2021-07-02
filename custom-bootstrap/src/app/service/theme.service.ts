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
   colors={1:'red',2:'yellow',3:'blue',4:'green',5:'white'}

   initTheme(){
     this.getColorTheme()
     this.renderer.addClass(document.body,this.colorTheme)
   }

   updateTheme(theme:'dark-mode' | 'light-mode'){
     this.setColorTheme(theme)
     const previousColorTheme=(theme==='dark-mode' ? 'light-mode':'dark-mode')
     this.renderer.removeClass(document.body,previousColorTheme)
    //  this.renderer.addClass(document.body,theme)

     if(previousColorTheme!=='dark-mode'){
      // this.renderer.addClass(document.getElementById('button'),'my-button')
      this.renderer.setAttribute(document.body,'data-theme','dark-theme')
      this.renderer.setAttribute(document.documentElement,'theme-mode','dark-theme')

     }else{
      // this.renderer.removeClass(document.getElementById('button'),'my-button')
      this.renderer.setAttribute(document.body,'data-theme','light-theme')
      this.renderer.setAttribute(document.documentElement,'theme-mode','light-theme')

     }
   }

   changeWidth(isShort:boolean){
    //  if(isShort){
    //    this.renderer.addClass(document.getElementById('container-top'),'container-top')
    //  }
    //  else{
    //     this.renderer.removeClass(document.getElementById('container-top'),'container-top')
    // }
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


  select(value:any,previous:number){
    this.renderer.addClass(document.getElementById(`${value}`),'selected')
    this.renderer.setAttribute(document.documentElement,'theme-color',`${value}`)
    this.renderer.setAttribute(document.body,'theme-color',`${value}`)
    this.renderer.removeClass(document.getElementById(`${previous}`),'selected')
  }

  changeThemeType(type:string){
    this.renderer.setAttribute(document.documentElement,'theme-type',type)
  }

}
