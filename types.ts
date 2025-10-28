
export interface Keyword {
  term: string;
  explanation: string;
}

export interface Category {
  title: string;
  keywords: Keyword[];
}

export interface DataCollection {
  collectionTitle: string;
  categories: Category[];
}