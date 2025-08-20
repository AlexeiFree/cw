import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AnnotationsStoreService } from '@/entities/annotation';
import { DocumentComponent } from '@/entities/document';
import { Logger } from '@/shared/services';

import { NO_ANNOTATIONS_LOG } from '../../constants';

@Component({
  selector: 'cw-save-document-button',
  templateUrl: './save-document-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveDocumentButton {
  readonly #logger = inject(Logger);
  readonly #documentData = inject(DocumentComponent).documentData;
  readonly #annotationsStore = inject(AnnotationsStoreService);

  protected handleDocumentSave(): void {
    this.#log();
  }

  #getAnnotationsText(): string {
    return this.#annotationsStore
      .annotations()
      .map(({ value: { text } }, index) => `${index + 1}) ${text()}`)
      .join('\n');
  }

  #log(): void {
    this.#logger.log(
      `Аннотации (${this.#documentData()?.name}):\n${this.#getAnnotationsText() || NO_ANNOTATIONS_LOG}`,
    );
  }
}
