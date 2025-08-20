import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DocumentBody, DocumentScrollport } from '@/entities/document';
import { AnnotationAddingDirective } from '@/features/add-document-annotation';
import { DimensionsDirective } from '@/shared/directives';

@Component({
  selector: 'cw-document-widget-body',
  templateUrl: './document-body.html',
  styleUrl: './document-body.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AnnotationAddingDirective,
    DocumentBody,
    DocumentScrollport,
    DimensionsDirective,
  ],
})
export class DocumentWidgetBody {}
