export interface PostData {
  postId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type PostReqestData = Pick<PostData, 'title' | 'content'>;

export interface PostPaginationParams {
  page: number;
  size: number;
  sort?: string;
}

export interface PostFormProps extends PostData {
  isEditable?: boolean;
  onClick?: () => void;
}

export interface PostUpdateData {
  title: string;
  content?: string;
}
