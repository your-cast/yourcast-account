import {AlertType} from './alert-type';

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
}
