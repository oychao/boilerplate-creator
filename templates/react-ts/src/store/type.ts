interface IPartialAction {
  payload: any;
}

export interface IAction extends Partial<IPartialAction> {
  type: string;
}
