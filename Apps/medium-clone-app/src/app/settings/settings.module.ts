import { NgModule } from '@angular/core';
import { SettingsComponent } from './components/settings/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({ declarations: [SettingsComponent], imports: [SharedModule, SettingsRoutingModule] })
export class SettingsModule {}
