import { UserMotivationsType } from 'entities/user';

export type FriendSchema = {
  _id: string;
  name: string;
  country: string;
  coin: number;
  rating: number;
  toBegin: Date | null;
  motivationUpdatedAt: Date | null;
  notifUpdatedAt: Date | null;
  friendIds: string[];
  notificationToken: string[];
  motivations: UserMotivationsType;
  avatarUrl: undefined | string;
};
