import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DocumentComponent } from '@/entities/document';

@Component({
  selector: 'cw-document-pages-list',
  templateUrl: './pages-list.html',
  styleUrl: './pages-list.scss',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentPagesList {
  protected readonly data = inject(DocumentComponent).documentData;
}
