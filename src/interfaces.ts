export interface IUser {
  firstName: string;
  lastName: string;
  id: string;
  role: "USER";
  username: string;
  password: string;
}

export interface IPost {
  authorId?: string;
  id: string;
  title: string;
  content: string;
  isPublished: true;
  createdAt: string;
  author?: {
    firstName: string;
    lastName: string;
  };
}

export interface IComment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
  userId: string;
  user: {
    firstName: string;
    lastName: string;
    username: string;
  };
}

export interface IAuthor {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
}