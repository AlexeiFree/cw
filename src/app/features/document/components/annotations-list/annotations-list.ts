import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DocumentAnnotationsService } from '../../services';
import { DocumentAnnotation } from '../annotation';

@Component({
  selector: 'cw-document-annotations-list',
  templateUrl: './annotations-list.html',
  styleUrl: './annotations-list.scss',
  imports: [DocumentAnnotation, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentAnnotationsList {
  public readonly annotationsService = inject(DocumentAnnotationsService);
}
