import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

import type { DocumentPageData } from '../../types';

@Component({
  selector: 'cw-document-pages-list',
  templateUrl: './pages-list.html',
  styleUrl: './pages-list.scss',
  imports: [NgOptimizedImage],
})
export class DocumentPagesList {
  public readonly pages = input.required<DocumentPageData[]>();
}
