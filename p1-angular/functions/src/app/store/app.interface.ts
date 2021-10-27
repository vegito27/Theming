export interface IApp {
  username: any ;
  password: any ;
  authenticationMessage: any ;
}

export interface IAppState {
  AppState: IApp ;
}

export const initialAppState: IApp = {
  username: null,
  password: null,
  authenticationMessage: null,
};
