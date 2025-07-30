import { HttpClient } from '@angular/common/http';
import { inject,Injectable } from '@angular/core';

import type { Observable } from 'rxjs';

import type { DocumentData } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DocumentDataService {
  private readonly httpClient = inject(HttpClient);

  public fetchDocumentData(id: number): Observable<DocumentData> {
    return this.httpClient.get<DocumentData>(`./mock/documents/${id}.json`);
  }
}
