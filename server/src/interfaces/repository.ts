import { Document } from "mongoose";

export interface IRepository extends Document {
  userId: string;
  name: string;
  description: string;
  url: string;
  language: string;
}

export interface GithubRepository {
  name: string;
  description: string;
  html_url: string;
  language: string;
}
