
export enum Open {
  create = 'create',
  detail = 'detail',
  edit = 'edit',
}
export interface History {
  action: string;
  txHash: string;
}
