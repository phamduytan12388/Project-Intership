import { DictionaryItem } from '../dictionary/dictionary-item.model';
import { UserGroup } from '../user-group/user-group.model';

export class User {
   id?: string;
   userName?: string;
   password?: string;
   group?: UserGroup;
   firstName?: string;
   lastName?: string;
   fullName?: string;
   email?: string;
   phone?: string;
   address?: string;
   country?: DictionaryItem;
   province?: DictionaryItem;
   district?: DictionaryItem;
   commune?: DictionaryItem;
   status?: string;
   isActive?: boolean;
   modifiedAt?: number;
   checkboxSelected?: boolean;
}
