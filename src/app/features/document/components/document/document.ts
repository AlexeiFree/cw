import {
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
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

import { switchMap } from 'rxjs';

import { Logger } from '@/shared/services';

import { NO_ANNOTATIONS_LOG } from '../../constants';
import { DocumentDimensionsDirective } from '../../directives';
import { DocumentDataService, DocumentZoomService } from '../../services';
import type {
  AnnotationDeleteEvent,
  DocumentAnnotationData,
} from '../../types';
import { DocumentAnnotation } from '../annotation';
import { DocumentControlPanel } from '../control-panel';
import { DocumentPagesList } from '../pages-list';

import { AnnotationAddingDirective } from './directives';

@Component({
  selector: 'cw-document',
  imports: [
    DocumentControlPanel,
    DocumentAnnotation,
    ReactiveFormsModule,
    AnnotationAddingDirective,
    DocumentDimensionsDirective,
    DocumentPagesList,
  ],
  templateUrl: './document.html',
  styleUrl: './document.scss',
})
export class Document {
  public readonly zoomService = inject(DocumentZoomService);
  private readonly dataService = inject(DocumentDataService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly logger = inject(Logger);

  public readonly documentId = input.required({ transform: numberAttribute });

  public readonly annotationsFormArray =
    this.formBuilder.array<DocumentAnnotationData>([]);

  protected readonly documentData = toSignal(
    toObservable(this.documentId).pipe(
      switchMap((documentId) =>
        this.dataService
          .fetchDocumentData(documentId)
          .pipe(takeUntilDestroyed(this.destroyRef)),
      ),
    ),
  );

  public handleAnnotationDelete(
    index: number,
    event?: AnnotationDeleteEvent,
  ): void {
    if (
      !event?.needConfirmation ||
      confirm(
        `Подтверите удаление аннотации:\n${this.annotationsFormArray.at(index).value.text}`,
      )
    ) {
      this.annotationsFormArray.removeAt(index);
    }
  }

  public handleDocumentSave(): void {
    const annotationsText = this.annotationsFormArray.value
      .map(({ text }, index) => `${index + 1}) ${text}`)
      .join('\n');

    this.logger.log(
      `Аннотации (${this.documentData()?.name}):\n${annotationsText || NO_ANNOTATIONS_LOG}`,
    );
  }
}
