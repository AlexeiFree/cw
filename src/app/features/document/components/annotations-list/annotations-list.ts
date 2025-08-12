import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AnnotationModel } from '../../models';
import { AnnotationsStoreService } from '../../services';
import { DocumentAnnotation } from '../annotation';

@Component({
  selector: 'cw-document-annotations-list',
  templateUrl: './annotations-list.html',
  styleUrl: './annotations-list.scss',
  imports: [DocumentAnnotation, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentAnnotationsList {
  protected readonly annotations: Signal<AnnotationModel[]>;

  readonly #annotationsStoreService = inject(AnnotationsStoreService);

  constructor() {
    this.annotations = this.#annotationsStoreService.annotations;
  }
}
