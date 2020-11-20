import { DataArea } from '../data-area/data-area.model';
import { DictionaryItem } from '../../dictionary/dictionary-item.model';

export class FarmingLocation {
    id: string;
    code: string;
    name: string;
    type: DictionaryItem;
    landArea: number;
    area: DataArea;
    description: string;
    attachment: string;
    status: DictionaryItem;
    modifiedAt: number;
}
