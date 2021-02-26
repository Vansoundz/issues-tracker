import { User } from "./user.model";

interface Repo {
  id?: string;
  isPrivate: boolean;
  name: string;
  owner: User;
}

export type { Repo };
