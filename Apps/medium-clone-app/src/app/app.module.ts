import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { SettingsModule } from './settings/settings.module';
import { NotFound404Component } from './layout/not-found-404/not-found-404.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, NotFound404Component],
  imports: [BrowserModule, CoreModule, SharedModule, HomeModule, SettingsModule, AuthModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
