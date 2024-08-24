export interface News {
  id: number;
  title: string;
  description: string;
  image: string | null;
  date: string;
}

export interface NewsMutation {
  title: string;
  description: string;
  image: string | null;
}