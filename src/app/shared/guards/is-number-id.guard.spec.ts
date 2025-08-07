import { Route, UrlSegment } from '@angular/router';

import { isNumberIdGuard } from '@/shared/guards/is-number-id.guard';

describe('authGuard', () => {
  it('should allow when last segment is in', () => {
    const result = isNumberIdGuard({} as Route, [
      new UrlSegment('document', {}),
      new UrlSegment('1', {}),
    ]);
    expect(result).toBeTrue();
  });
});
