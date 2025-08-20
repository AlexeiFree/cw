import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import {
  DocumentComponent,
  type DocumentData,
  DocumentPagesList,
} from '@/entities/document';
import { SaveDocumentButton } from '@/features/save-document';

import { DocumentAnnotationsList } from '../annotations-list';
import { DocumentWidgetBody } from '../document-body';

@Component({
  selector: 'cw-document-widget',
  templateUrl: './document.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DocumentComponent,
    DocumentPagesList,
    SaveDocumentButton,
    DocumentWidgetBody,
    DocumentAnnotationsList,
  ],
})
export class DocumentWidget {
  public readonly documentData = input.required<DocumentData>();
}
