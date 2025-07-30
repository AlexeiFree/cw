import { InjectionToken } from '@angular/core';

import type { DocumentAnnotationBase } from '../../types';

export const DOCUMENT_ANNOTATION = new InjectionToken<DocumentAnnotationBase>(
  'Document annotation',
);
