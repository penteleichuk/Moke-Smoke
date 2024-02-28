declare type StateSchema = ReturnType<
  typeof import('./../providers/StoreProvider/config/store').store.getState
>;

declare type UserSchema = import('entities/user/model/types/user').UserSchema;
declare module 'Injector';
