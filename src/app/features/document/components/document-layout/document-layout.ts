import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';

import { DocumentDimensionsDirective } from '../../directives';
import { DocumentZoomService } from '../../services';
import { Zoom } from '../../types';

import { AnnotationAddingDirective } from './directives';

@Component({
  selector: 'cw-document-layout',
  templateUrl: './document-layout.html',
  styleUrl: './document-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnnotationAddingDirective, DocumentDimensionsDirective],
})
export class DocumentLayout {
  protected readonly zoom: Signal<Zoom>;

  readonly #zoomService = inject(DocumentZoomService);

  constructor() {
    this.zoom = this.#zoomService.zoom;
  }
}
