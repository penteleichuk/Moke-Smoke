import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { userBuyRating } from './../services/userBuyRating/userBuyRating';
import { userSafeCleaning } from './../services/userSafeCleaning/userSafeCleaning';
import { userUnlockCards } from './../services/userUnlockCards/userUnlockCards';
import { userUnlockLearn } from './../services/userUnlockLearn/userUnlockLearn';
import { userUnlockMotivation } from './../services/userUnlockMotivation/userUnlockMotivation';
import { UserSchema } from './../types/user';

const initialState: UserSchema = {
  _id: '',
  name: '',
  banned: false,
  invitedId: '',
  avatarUrl: undefined,
  coin: 0,
  rating: 0,
  cards: false,
  learn: false,
  premium: false,
  toBegin: null,
  email: '',
  emailActivate: false,
  smokeEveryDay: 0,
  smokePackCount: 20,
  pricePackSmoking: 0,
  weekly: [
    { danger: 0, success: 0, wrong: 0 },
    { danger: 0, success: 0, wrong: 0 },
    { danger: 0, success: 0, wrong: 0 },
    { danger: 0, success: 0, wrong: 0 },
    { danger: 0, success: 0, wrong: 0 },
    { danger: 0, success: 0, wrong: 0 },
    { danger: 0, success: 0, wrong: 0 },
  ],
  motivationUpdatedAt: null,
  motivations: { danger: 0, success: 0, wrong: 0 },
  friendIds: [],
  invitedIds: [],
  tasks: [
    { name: '', value: 0, lock: false },
    { name: '', value: 0, lock: true },
    { name: '', value: 0, lock: true },
    { name: '', value: 0, lock: true },
    { name: '', value: 0, lock: true },
    { name: '', value: 0, lock: true },
  ],
  updatedAt: new Date(),
};

type WeeklyType = 'danger' | 'success' | 'wrong';

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserWeekly: (
      state,
      action: PayloadAction<{
        weeklyId: number;
        weeklyType: WeeklyType;
        premium: boolean;
      }>,
    ) => {
      const weeklyType = action.payload.weeklyType;
      const weeklyId = action.payload.weeklyId;

      state.weekly[weeklyId][weeklyType]++;
      state.motivations[weeklyType]++;

      if (action.payload.weeklyType !== 'danger') {
        if (action.payload.premium) {
          state.coin += 2;
          state.rating += 4;
        } else {
          state.coin += 1;
          state.rating += 2;
        }
      }

      state.motivationUpdatedAt = new Date();
      state.updatedAt = new Date();
    },
    resetUserSmoke: state => {
      state.coin = 0;
      state.rating = 0;
      state.motivationUpdatedAt = new Date();
      state.toBegin = new Date();
      state.motivations = initialState.motivations;
      state.updatedAt = new Date();
    },
    removeUserAvatar: state => {
      state.avatarUrl = undefined;
    },
    setUserAvatar: (state, action: PayloadAction<string>) => {
      state.avatarUrl = action.payload;
    },
    initUserSmoke: state => {
      state.coin = 0;
      state.rating = 0;
      state.toBegin = new Date();
      state.motivations = initialState.motivations;
      state.updatedAt = new Date();
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.updatedAt = new Date();
    },
    addUserCoint: (state, action: PayloadAction<number>) => {
      state.coin += action.payload;
      state.updatedAt = new Date();
    },
    addUserRating: (state, action: PayloadAction<number>) => {
      state.rating += action.payload;
      state.updatedAt = new Date();
    },
    setUserSmokeEveryDay: (state, action: PayloadAction<number>) => {
      state.smokeEveryDay = action.payload;
      state.updatedAt = new Date();
    },
    setUserSmokePackCount: (state, action: PayloadAction<number>) => {
      state.smokePackCount = action.payload;
      state.updatedAt = new Date();
    },
    setUserPricePack: (state, action: PayloadAction<number>) => {
      state.pricePackSmoking = action.payload;
      state.updatedAt = new Date();
    },
    setUserEmailIsActivate: (state, action: PayloadAction<boolean>) => {
      state.emailActivate = action.payload;
    },
    setUserQuitting: (
      state,
      action: PayloadAction<{
        name: string;
        smokeEveryDay: number;
        smokePackCount: number;
        pricePackSmoking: number;
      }>,
    ) => {
      state.toBegin = new Date();
      state.name = action.payload.name;
      state.pricePackSmoking = action.payload.pricePackSmoking;
      state.smokePackCount = action.payload.smokePackCount;
      state.smokeEveryDay = action.payload.smokeEveryDay;
      state.updatedAt = new Date();
    },
    setUserTaskName: (
      state,
      action: PayloadAction<{ taskId: number; name: string }>,
    ) => {
      state.tasks[action.payload.taskId].name = action.payload.name;
      state.updatedAt = new Date();
    },
    setUserTaskValue: (
      state,
      action: PayloadAction<{ taskId: number; value: number }>,
    ) => {
      state.tasks[action.payload.taskId].value = action.payload.value;
      state.updatedAt = new Date();
    },
    userLogout: state => {
      return {
        ...state,
        ...initialState,
        toBegin: new Date(),
        name: state.name,
        smokeEveryDay: state.smokeEveryDay,
        smokePackCount: state.smokePackCount,
        pricePackSmoking: state.pricePackSmoking,
      };
    },
    userInitialized: (
      state,
      { payload }: PayloadAction<{ isAuth: boolean; user: UserSchema }>,
    ) => {
      if (payload.isAuth && payload.user) {
        if ((payload?.user?.friendIds?.length || 0) > 0) {
          payload.user.friendIds = [...new Set(payload.user.friendIds)];
        }

        if ((payload?.user?.invitedIds?.length || 0) > 0) {
          payload.user.invitedIds = [...new Set(payload.user.invitedIds)];
        }

        if (payload.user.toBegin) {
          payload.user.toBegin = new Date(payload.user.toBegin);
        } else {
          payload.user.toBegin = new Date();
        }

        const name = payload?.user?.name;
        if (!name || (name && name.trim().length < 1)) {
          payload.user.name = state.name;
        }

        if (payload.user.motivationUpdatedAt) {
          payload.user.motivationUpdatedAt = new Date(
            payload.user.motivationUpdatedAt,
          );
        }

        if (payload.user.updatedAt) {
          payload.user.updatedAt = new Date(payload.user.updatedAt);
        }

        return payload.user;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(userBuyRating.fulfilled, (state, action) => {
      state.coin = action.payload.coin;
      state.rating = action.payload.rating;
      state.updatedAt = new Date();
    });

    builder.addCase(userUnlockCards.fulfilled, (state, action) => {
      state.coin = action.payload.coin;
      state.cards = action.payload.cards;
      state.updatedAt = new Date();
    });

    builder.addCase(userUnlockLearn.fulfilled, (state, action) => {
      state.coin = action.payload.coin;
      state.learn = action.payload.learn;
      state.updatedAt = new Date();
    });

    builder.addCase(userSafeCleaning.fulfilled, (state, action) => {
      state.motivationUpdatedAt = null;
      state.toBegin = null;
      state.motivations = initialState.motivations;
      state.weekly = initialState.weekly;
      state.coin = action.payload.coin;
      state.updatedAt = new Date();
    });

    builder.addCase(userUnlockMotivation.fulfilled, (state, action) => {
      state.coin = action.payload.coin;
      if (action.payload.index) {
        state.tasks[action.payload.index].lock = false;
      }
      state.updatedAt = new Date();
    });
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
