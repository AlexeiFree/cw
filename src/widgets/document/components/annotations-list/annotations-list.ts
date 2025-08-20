import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';

import {
  Annotation,
  AnnotationModel,
  AnnotationsStoreService,
} from '@/entities/annotation';
import { AnnotationDragDirective } from '@/features/drag-annotation';

@Component({
  selector: 'cw-annotations-list',
  templateUrl: './annotations-list.html',
  styleUrl: './annotations-list.scss',
  imports: [Annotation, AnnotationDragDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentAnnotationsList {
  protected readonly annotations: Signal<AnnotationModel[]>;

  readonly #annotationsStoreService = inject(AnnotationsStoreService);

  constructor() {
    this.annotations = this.#annotationsStoreService.annotations;
  }
}
