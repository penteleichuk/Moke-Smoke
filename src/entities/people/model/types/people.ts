export interface PeopleType {
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
  avatarUrl?: string;
}
