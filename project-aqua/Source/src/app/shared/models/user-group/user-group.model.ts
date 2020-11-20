import { Feature } from '../feature/feature.model';
import { User } from '../user/user.model';

export class UserGroup {
    id: string;
    name: string;
    description: string;
    createdAt?: number;
    features: Feature[];
    users?: User[];
    isChecked?: boolean;
    isDefault?: boolean;
    countUsers?: number;
}
