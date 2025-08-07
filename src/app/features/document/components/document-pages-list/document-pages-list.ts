import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { DocumentPageData } from '../../types';

@Component({
  selector: 'cw-document-pages-list',
  templateUrl: './document-pages-list.html',
  styleUrl: './document-pages-list.scss',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentPagesList {
  public readonly pages = input.required<DocumentPageData[]>();
}
