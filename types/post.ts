export interface PostData {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostPaginationParams {
  page: number;
  size: number;
  sort?: string;
}
