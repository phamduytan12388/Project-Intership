import { Work } from './work';

export class User {
    avatar?: string;
    id: string;
    userNo?: string;
    userName: string;
    userBirthday?: Date;
    userAmount?: number;
    userEmail?: string;
    userNation?: string;
    userDesc?: string;
    userCheck?: boolean;
    userMaritalStatus?: string;
    works?: WorkItem[] = [];
}

export class WorkItem {
    work: Work;
    workItem: WorkItem[] = [];
}