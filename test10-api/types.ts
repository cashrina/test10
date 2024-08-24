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


export interface Comments {
  id: number;
  news_id: number;
  author: string | null;
  description: string | null;
}

export interface CommentsMutation {
  news_id: number;
  author: string | null;
  description: string | null;
}