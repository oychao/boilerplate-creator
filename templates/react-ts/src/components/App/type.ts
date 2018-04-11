export interface IAppStateToProps {
    count: number;
}
export interface IAppDispatchToProps {
    handleCount: (num: number) => void;
}
export interface IAppProps extends IAppStateToProps, IAppDispatchToProps {}
export interface IAppReduxState extends Partial<IAppStateToProps> {}
