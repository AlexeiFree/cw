import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { type DocumentData } from '@/entities/document';
import { DocumentWidget } from '@/widgets/document';

@Component({
  selector: 'cw-document',
  imports: [DocumentWidget, DocumentWidget],
  templateUrl: './document-root.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentRoot {
  public readonly documentData = input.required<DocumentData>();
}
