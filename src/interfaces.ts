export interface IUser {
  firstName: string;
  lastName: string;
  id: string;
  role: "USER";
  username: string;
  password: string;
}

export interface IPost {
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
