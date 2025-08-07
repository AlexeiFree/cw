import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DocumentDimensionsDirective } from '../../directives';
import { DocumentZoomService } from '../../services';

import { AnnotationAddingDirective } from './directives';

@Component({
  selector: 'cw-document-layout',
  templateUrl: './document-layout.html',
  styleUrl: './document-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnnotationAddingDirective, DocumentDimensionsDirective],
})
export class DocumentLayout {
  protected readonly zoomService = inject(DocumentZoomService);
}
