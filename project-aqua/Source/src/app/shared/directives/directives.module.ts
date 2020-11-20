import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumberDirective } from './input-number.directive';
import { InputPhoneNumberDirective } from './input-phone-number.directive';
import { PreventKeysDirective } from './prevent-keys.directive';
import { InputTaxDirective } from './input-tax.directive';
import { PipesModule } from '../pipes/pipes.module';
import { RequiredIfDirective } from './required-if.directive';
import { ImgExifDirective } from './img-exif.directive';
import { EnterPreventDefaultDirective } from './enter-prevent-default.directive';
import { AutoFocusDirective } from './auto-focus.directive';
import { ShowMoreDirective } from './show-more.directive';
import { FormatNumberPipe } from '../pipes/format-number.pipe';
@NgModule({
  declarations: [
    InputNumberDirective,
    InputPhoneNumberDirective,
    InputPhoneNumberDirective,
    PreventKeysDirective,
    InputTaxDirective,
    RequiredIfDirective,
    ImgExifDirective,
    EnterPreventDefaultDirective,
    AutoFocusDirective,
    ShowMoreDirective,
  ],
  imports: [CommonModule],
  exports: [
    InputNumberDirective,
    InputPhoneNumberDirective,
    PreventKeysDirective,
    InputTaxDirective,
    RequiredIfDirective,
    ImgExifDirective,
    EnterPreventDefaultDirective,
    AutoFocusDirective,
    ShowMoreDirective,
  ],
  providers: [
    FormatNumberPipe
  ]
})
export class DirectivesModule { }
