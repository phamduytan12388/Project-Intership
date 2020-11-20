import { DictionaryItem } from '../../dictionary/dictionary-item.model';
import { Unit } from './unit.model';

export class DataFactor {
    id?: string;
    name?: string;
    code?: string;
    description?: string;
    dataType?: DictionaryItem;
    sampleValue?: string;
    factorGroup?: DictionaryItem;
    modifiedAt?: number;
    hasData?: boolean;
    unit: Unit;
}
