import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DocumentData } from '@/features/document/types';
import { Logger } from '@/shared/services';

import { NO_ANNOTATIONS_LOG } from '../../constants';
import { DocumentAnnotationsService } from '../../services';
import { DocumentAnnotationsList } from '../annotations-list';
import { DocumentControlPanel } from '../document-control-panel';
import { DocumentLayout } from '../document-layout';
import { DocumentPagesList } from '../document-pages-list';

@Component({
  selector: 'cw-document',
  imports: [
    DocumentControlPanel,
    ReactiveFormsModule,
    DocumentPagesList,
    DocumentAnnotationsList,
    DocumentLayout,
  ],
  templateUrl: './document-root.html',
  styleUrl: './document-root.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentRoot {
  public readonly documentData = input.required<DocumentData>();

  readonly #logger = inject(Logger);
  readonly #annotationsService = inject(DocumentAnnotationsService);

  protected handleDocumentSave(): void {
    const annotationsText = this.#annotationsService
      .annotations()
      .map(({ text }, index) => `${index + 1}) ${text()}`)
      .join('\n');

    this.#logger.log(
      `Аннотации (${this.documentData()?.name}):\n${annotationsText || NO_ANNOTATIONS_LOG}`,
    );
  }
}
