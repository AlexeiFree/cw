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
import {
  FormArray,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Document {
  public readonly documentId = input.required({ transform: numberAttribute });
  public readonly annotationsFormArray: FormArray<
    FormControl<DocumentAnnotationData>
  >;

  protected readonly zoomService = inject(DocumentZoomService);
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
  readonly #formBuilder = inject(NonNullableFormBuilder);
  readonly #logger = inject(Logger);

  constructor() {
    this.annotationsFormArray = this.#formBuilder.array<DocumentAnnotationData>(
      [],
    );
  }

  protected handleAnnotationDelete(
    index: number,
    event: AnnotationDeleteEvent,
  ): void {
    if (
      !event.needConfirmation ||
      confirm(
        `Подтверите удаление аннотации:\n${this.annotationsFormArray.at(index).value.text}`,
      )
    ) {
      this.annotationsFormArray.removeAt(index);
    }
  }

  protected handleDocumentSave(): void {
    const annotationsText = this.annotationsFormArray.value
      .map(({ text }, index) => `${index + 1}) ${text}`)
      .join('\n');

    this.#logger.log(
      `Аннотации (${this.documentData()?.name}):\n${annotationsText || NO_ANNOTATIONS_LOG}`,
    );
  }
}
