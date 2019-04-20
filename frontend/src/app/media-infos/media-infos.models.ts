export interface MediaInfos {
  mediaInfosInfo: MediaInfosInfo;
  mediaInfoDetails: MediaInfoDetails;
}

export interface MediaInfoDetails {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageURL: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaInfosInfo {
  docs: MediaInfoDetails[];
  totalDocs: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  page: number;
  totalPages: number;
  pagingCounter: number;
  prevPage?: number;
  nextPage?: number;
}
