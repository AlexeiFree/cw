import { Component, inject, input, linkedSignal, output } from '@angular/core';

import { ZOOM_LEVELS } from '../../constants';
import { DocumentZoomService } from '../../services';

@Component({
  selector: 'cw-document-control-panel',
  templateUrl: './control-panel.html',
  styleUrl: './control-panel.scss',
})
export class DocumentControlPanel {
  public readonly zoomService = inject(DocumentZoomService);

  public readonly title = input.required<string>();

  public readonly save = output();

  protected readonly zoom = this.zoomService.zoom;
  protected readonly displayZoom = linkedSignal(() =>
    Math.floor(this.zoom() * 100),
  );
  protected readonly zoomLevels = ZOOM_LEVELS;

  protected emitSave() {
    this.save.emit();
  }
}
