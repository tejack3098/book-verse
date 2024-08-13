export interface IBookInfo {
    id: string;
    isbn: string;
    // authors: [{'author_id': string, 'role': string}];
    authors: string;
    country: string;
    image_url: string;
    language: string;
    link: string;
    pages: number;
    title: string;
    year: number;
    price: number;
    book_id: number;
    similarity: number;
  }