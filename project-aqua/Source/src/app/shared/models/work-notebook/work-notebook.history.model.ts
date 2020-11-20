import { User } from '../user/user.model';

export class WorkNoteBookHistory {
    fieldName: string;
    oldValue: string;
    newValue: string;
    modifiedAt: number;
    modifiedBy: User;
}
