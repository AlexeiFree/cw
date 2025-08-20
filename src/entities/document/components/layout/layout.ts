import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cw-document-layout',
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentLayout {}
