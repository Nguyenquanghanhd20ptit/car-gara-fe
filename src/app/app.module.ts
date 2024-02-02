import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './core/app/app.component';
import { AppRoutingModule } from './core/app/app-routing.module';
import { CoreModule } from './core/core.module';
import { AuthGuardService } from './core/authentication/auth-guard.service';
import { WebModule } from './web/web.module';



@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebModule,
    CoreModule
  ],
  providers : [
    AuthGuardService
  ],
  exports : [],
  bootstrap: [AppComponent]
})
export class AppModule { }
