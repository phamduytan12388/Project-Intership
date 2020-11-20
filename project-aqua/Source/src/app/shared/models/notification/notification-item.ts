import { DataFactor } from '../data-source/data-factor/data-factor.model';
import { FarmingLocation } from '../data-source/farming-location/farming-location.model';
import { DictionaryItem } from '../dictionary/dictionary-item.model';
import { ShrimpPeriod } from '../record-active/shrimp-period/shrimp-period.model';

export class NotificationItem {
  id?: string;
  type?: DictionaryItem;
  factorName?: string;
  farmingLocationName?: string;
  shrimpCropName?: string;
  executionTime?: number;
  fromDate?: number;
  toDate?: number;
  status?: string;
  frequency?: DictionaryItem;
  title?: string;
  message?: string;
  farmingLocation?: FarmingLocation;
  shrimpCrop?: ShrimpPeriod;
  managementFactor?: DataFactor;
  createdAt?: number;
}
