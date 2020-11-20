import { VolumePipe } from './volume.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { NumberAreaPipe } from './number-area.pipe';
import { FormatNumberPipe } from './format-number.pipe';
import { SuffixNumbericalPipe } from './suffix-numberical.pipe';
import { TruncateTextPipe } from './truncate-text.pipe';
import { BoldPipe } from './bold.pipe';
import { TruncateWordPipe } from './truncate-word.pipe';
@NgModule({
  declarations: [
    SafePipe,
    NumberAreaPipe,
    VolumePipe,
    FormatNumberPipe,
    SuffixNumbericalPipe,
    TruncateTextPipe,
    TruncateWordPipe,
    BoldPipe
  ],
  exports: [
    SafePipe,
    NumberAreaPipe,
    VolumePipe,
    FormatNumberPipe,
    SuffixNumbericalPipe,
    TruncateTextPipe,
    TruncateWordPipe,
    BoldPipe
  ],
  imports: [CommonModule]
})
export class PipesModule {}
