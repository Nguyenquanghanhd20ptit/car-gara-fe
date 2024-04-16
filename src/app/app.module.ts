import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './core/app/app.component';
import { AppRoutingModule } from './core/app/app-routing.module';
import { CoreModule } from './core/core.module';
import { AuthGuardService } from './core/authentication/auth-guard.service';
import { WebModule } from './web/web.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from './shared/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './core/service/configuration/configuration.service';

export const configFactory = (configService: ConfigService) => {
  return () => configService.loadConfig();
};

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule ,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers : [
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true
    },
    AuthGuardService
  ],
  exports : [],
  bootstrap: [AppComponent]
})
export class AppModule { }
