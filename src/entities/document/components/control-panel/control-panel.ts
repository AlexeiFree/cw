import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';

import { ZoomService } from '@/shared/services';

@Component({
  selector: 'cw-document-control-panel',
  templateUrl: './control-panel.html',
  styleUrl: './control-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentControlPanel {
  public readonly title = input.required<string>();
  public readonly save = output();

  protected readonly zoomService = inject(ZoomService);

  protected readonly displayZoom = computed(() =>
    Math.floor(this.zoomService.zoom() * 100),
  );
}
