import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cw-document-body',
  templateUrl: './body.html',
  styleUrl: './body.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentBody {}
