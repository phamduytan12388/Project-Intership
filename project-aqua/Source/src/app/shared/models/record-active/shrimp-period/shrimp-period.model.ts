import { DataShrimp } from '../../data-source/data-shrimp/data-shrimp.model';
import { FarmingLocation } from '../../data-source/farming-location/farming-location.model';
import { FactorManagement } from './factor-management.model';

export class ShrimpPeriod {
 id?: string;
 farmingLocation?: FarmingLocation;
 shrimpBreed?: DataShrimp;
 code?: string;
 name?: string;
 fromDate?: number;
 toDate?: number;
 note?: string;
 factors?: FactorManagement[] = [];
 modifiedAt?: number;
}
