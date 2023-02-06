export interface IUser {
  id: String;
  name: String;
  gender?: String;
  email?: String;
}

export interface IPost {
  index: number;
  writer: IUser;
  title: string;
  content: string;
  profile_image_url?: string;
  created_at: Date;
  updated_at: Date;
}
