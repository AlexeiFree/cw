import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ZoomService } from '@/shared/services';

@Component({
  selector: 'cw-document-scrollport',
  templateUrl: './scrollport.html',
  styleUrl: './scrollport.scss',
  host: {
    '[style.zoom]': 'zoom()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentScrollport {
  protected readonly zoom = inject(ZoomService).zoom;
}
