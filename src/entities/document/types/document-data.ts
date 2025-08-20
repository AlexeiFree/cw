export interface DocumentData {
  name: string;
  pages: DocumentPageData[];
}

export interface DocumentPageData {
  number: number;
  imageUrl: string;
}
