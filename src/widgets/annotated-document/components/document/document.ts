import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import {
  DocumentComponent,
  type DocumentData,
  DocumentPagesList,
} from '@/entities/document';
import { SaveDocumentButton } from '@/features/save-document';

import { DocumentAnnotationsList } from '../annotations-list';
import { AnnotatedDocumentBody } from '../document-body';

@Component({
  selector: 'cw-annotated-document',
  templateUrl: './document.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DocumentComponent,
    DocumentPagesList,
    SaveDocumentButton,
    AnnotatedDocumentBody,
    DocumentAnnotationsList,
  ],
})
export class AnnotatedDocument {
  public readonly documentData = input.required<DocumentData>();
}
