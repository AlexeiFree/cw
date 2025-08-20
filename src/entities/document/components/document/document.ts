import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { DocumentData } from '../../types';
import { DocumentControlPanel } from '../control-panel';
import { DocumentLayout } from '../layout';

@Component({
  selector: 'cw-document',
  imports: [DocumentControlPanel, DocumentLayout],
  templateUrl: './document.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentComponent {
  public readonly documentData = input.required<DocumentData>();
}
