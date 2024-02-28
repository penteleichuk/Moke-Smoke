export type UserWeeklyType = 'skip' | 'danger' | 'warn' | 'success';

export interface UserMotivationsType {
  danger: number;
  success: number;
  wrong: number;
}

export interface UserTaskType {
  name: string;
  value: number;
  lock: boolean;
}

export type UserSchema = {
  _id: string;
  name: string;
  avatarUrl?: string;
  banned: boolean;
  invitedId: string;
  coin: number;
  rating: number;
  cards: boolean;
  premium: boolean;
  learn: boolean;
  email: string;
  emailActivate: boolean;
  smokeEveryDay: number;
  smokePackCount: number;
  pricePackSmoking: number;
  weekly: UserMotivationsType[];
  motivations: UserMotivationsType;
  friendIds: string[] | null;
  invitedIds: string[] | null;
  tasks: UserTaskType[];
  toBegin: Date | null;
  motivationUpdatedAt: Date | null;
  updatedAt: Date | null;
};
