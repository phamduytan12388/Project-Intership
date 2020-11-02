export class UserLoginHawa {
    id: string;
    userName: string;
    fullName: string;
    userId: string;
    email: string;
    status: string;
    coCode: string;
    jwtToken: string;
    userType: string;
    userTypeVi: string;
    avatar: {
        guid: string;
        thumbSizeUrl: string;
        largeSizeUrl: string
    };
    roles: string[];
    businessTypes: {
        id: string;
        name: string;
        description: string;
        parentId: string;
        sortOrder: number;
        registFor: string
    }[];
}