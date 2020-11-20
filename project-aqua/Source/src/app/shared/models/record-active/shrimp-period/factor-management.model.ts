import { DataFactor } from '../../data-source/data-factor/data-factor.model';
import { DictionaryItem } from '../../dictionary/dictionary-item.model';
import { User } from '../../user/user.model';

export class FactorManagement {
  id?: string;
  managementFactor?: DataFactor;
  curator?: User;
  frequency?: DictionaryItem;
  fromDate: number;
  toDate: number;
  executionTime: number;
  status: DictionaryItem;
  modifiedAt: number;
}
