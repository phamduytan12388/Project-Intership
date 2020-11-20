import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, ComponentFactoryResolver, Component, ViewChild, TemplateRef, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule
} from '@angular/platform-browser/animations';
import { CommonModule, registerLocaleData, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing-module';
import { ServicesModule } from './shared/services/services.module';
import { NzConfig } from 'ng-zorro-antd';
import { DefaultInterceptor } from './shared/helpers/default.interceptor';
import { NZ_I18N, NzI18nService, vi_VN, en_US } from 'ng-zorro-antd/i18n';
import vi from '@angular/common/locales/vi';
import { ApplicationService } from './shared/services/aplication.service';
import { CryptoUtil } from './shared/helpers/crypto.helper';
import { SALT } from './app.config';
import { ManagementStatisticModule } from './dashboard/management-statistic/management-statistic.module';

const INTERCEPTOR_PROVIDES = [
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true }
];

registerLocaleData(vi);
const ngZorroConfig: NzConfig = {
  message: { nzTop: 120 },
  notification: { nzTop: 240 }
};
@Component({
  template: `
    <ng-template #nzIndicatorTpl>
      <span class="ant-spin-dot">
        <i nz-icon [nzType]="'loading'"></i>
      </span>
    </ng-template>
  `
})
export class GlobalTemplatesComponent {
  @ViewChild('nzIndicatorTpl', { static: true })
  nzIndicator!: TemplateRef<void>;
}
const initApp = (
  // Todo
) => {
  const resolePromise = promise =>
    new Promise(resolve => promise.then(resolve).catch(resolve));
  return () =>
    Promise.all([
      CryptoUtil.initSalt(SALT),
    ]);
};

@NgModule({
  declarations: [
    AppComponent,
    GlobalTemplatesComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    NoopAnimationsModule,
    AppRoutingModule,
    ServicesModule,
    ManagementStatisticModule
  ],
  providers: [
    INTERCEPTOR_PROVIDES,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [ApplicationService]
    },
    {
      provide: NZ_I18N,
      useValue: ngZorroConfig,
      deps: [Injector, ComponentFactoryResolver]
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: NZ_I18N, useValue: vi_VN }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    GlobalTemplatesComponent
  ]
})
export class AppModule {
  constructor(private i18n: NzI18nService) {
    this.i18n.setLocale(vi_VN);
  }
}
