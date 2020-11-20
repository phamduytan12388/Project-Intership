import { DataShrimp } from '../data-source/data-shrimp/data-shrimp.model';
import { User } from '../user/user.model';
import { FileData } from '../master-data/file-data.model';
import { DictionaryMasterData } from '../master-data/dictionary.model';
import { ShrimpPeriod } from '../record-active/shrimp-period/shrimp-period.model';
import { DictionaryItem } from '../dictionary/dictionary-item.model';

export class WorkNoteBook {
    id: string;
    name: string;
    executionTime: number;
    value: string;
    pictures: FileData[];
    farmingLocation: DictionaryMasterData;
    managementFactor: DictionaryItem;
    measureUnit: DictionaryMasterData;
    shrimpBreed: DataShrimp;
    curator: User;
    shrimpCrop: ShrimpPeriod;
    modifiedAt: number;
    sampleValue: string;
    description: string;
}
