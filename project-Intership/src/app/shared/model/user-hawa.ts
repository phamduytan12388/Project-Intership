export class UserHawa {
    accountId: string;
    userId: string;
    userName: string;
    fullName: string;
    email: string;
    avatar: string;
    coCode: string;
    profileName: string;
    userType: string;
    lastTimeReadNotification: number;
    forestProfileCount: number;
    forestProfileTotalCount: number;
    forestDeclareHarvestCount: number;
    forestDeclareHarvestNoRTECount: number;
    harvestedTimberSourceProfile: number;
    importedTimberHarvestedTimber: number;
    timberMaterialsTransformationProfile: number;
    timberProductsHarvestedTimber: number;
    groups: {
        id: string;
        name: string;
        description: string;
        otherDescription: string;
        canRequest: boolean
    }[];
    forestOwnerType: {
        key: string;
        value: string;
        displayText: string;
        code: string;
        typeGroup: string
    };
    updatedDate: number
}