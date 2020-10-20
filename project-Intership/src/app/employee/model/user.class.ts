import { Work } from './work';

export class User {
    avatar?: string;
    userID: number;
    userNo?: string;
    userName: string;
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