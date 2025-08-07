import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';

import { DocumentZoomService } from '../../services';

@Component({
  selector: 'cw-document-control-panel',
  templateUrl: './document-control-panel.html',
  styleUrl: './document-control-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentControlPanel {
  public readonly zoomService = inject(DocumentZoomService);
  public readonly title = input.required<string>();
  public readonly save = output();

  protected readonly displayZoom = computed(() =>
    Math.floor(this.zoomService.zoom() * 100),
  );

  protected emitSave() {
    this.save.emit();
  }
}
