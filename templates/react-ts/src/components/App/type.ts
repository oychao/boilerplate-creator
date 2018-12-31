export interface IAppStateToProps {
  count: number;
  text: string;
}
export interface IAppDispatchToProps {
  handleCount?: (num: number) => void;
  handleInput?: (text: string) => void;
}
export interface IAppProps extends IAppStateToProps, IAppDispatchToProps {}
export interface IAppReduxState extends Partial<IAppStateToProps> {}
export interface IReduxState {
  history: any,
  app: IAppStateToProps
}
