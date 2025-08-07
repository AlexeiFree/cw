import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';

import { switchMap } from 'rxjs';

import { Logger } from '@/shared/services';

import { NO_ANNOTATIONS_LOG } from '../../constants';
import {
  DocumentAnnotationsService,
  DocumentDataService,
} from '../../services';
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
  public readonly documentId = input.required({ transform: numberAttribute });

  protected readonly documentData = toSignal(
    toObservable(this.documentId).pipe(
      switchMap((documentId) =>
        this.#dataService
          .fetchDocumentData(documentId)
          .pipe(takeUntilDestroyed(this.#destroyRef)),
      ),
    ),
  );

  readonly #dataService = inject(DocumentDataService);
  readonly #destroyRef = inject(DestroyRef);
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
