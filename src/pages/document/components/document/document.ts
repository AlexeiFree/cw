import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { type DocumentData } from '@/entities/document';
import { AnnotatedDocument } from '@/widgets/annotated-document';

@Component({
  selector: 'cw-document',
  imports: [AnnotatedDocument],
  templateUrl: './document.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentPage {
  public readonly documentData = input.required<DocumentData>();
}
