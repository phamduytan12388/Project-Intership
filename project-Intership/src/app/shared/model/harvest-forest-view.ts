export class HarvestForestView {
    id: string;
    forestId: string;
    standingTreeTraditionId: string;
    status: string;
    profileDate: number;
    createdDate: number;
    updatedDate: number;
    profileCode: string;
    profileName: string;
    profileCreatedUser: {
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
    };
    harvesterId: string;
    verifiedUser: {
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
    };
    fromDate: number;
    toDate: number;
    declaredType: {
        key: string;
        value: string;
        displayText: string;
        code: string;
        typeGroup: string
    };
    harvestMethod: {
        key: string;
        value: string;
        displayText: string;
        code: string;
        typeGroup: string
    };
    forestType: {
        key: string;
        value: string;
        displayText: string;
        code: string;
        typeGroup: string
    };
    items: {
        id: string;
        declareHarvestId: string;
        forestPlotTreeId: string;
        province: {
            key: string;
            value: string;
            displayText: string;
            code: string;
            typeGroup: string
        };
        district: {
            key: string;
            value: string;
            displayText: string;
            code: string;
            typeGroup: string
        };
        commune: {
            key: string;
            value: string;
            displayText: string;
            code: string;
            typeGroup: string
        };
        compt: string;
        subCompt: string;
        plot: string;
        area: number;
        treeType: {
            id: string;
            name: string;
            latinName: string;
            shortName: string;
            engName: string
        };
        planYear: number;
        estimatedVolume: number;
        mapping: {
            id: string;
            forestId: string;
            comptCode: string;
            subComptCode: string;
            plotCode: string;
            parcelCode: string;
            mapSheet: string;
            village: string;
            area: number;
            actorId: string;
            actorTypeCode: string;
            landUseCertCode: string;
            landUseTerune: string;
            conflictSitCode: string;
            actorIdConflict: string;
            protContrCode: string;
            actorIdProt: string;
            provinceCode: string;
            provinceName: string;
            districtCode: string;
            districtName: string;
            communeCode: string;
            communeName: string;
            actorName: string;
            actorAddress: string;
            actorAdditionalInfo: string;
            type: string;
            coordinates: [CordinateItem[]]
        };
        beforeImages: {
            id: string;
            declareHarvestRTEId: string;
            fileName: string;
            capturedAt: number;
            latitude: number;
            longitude: number;
            createdAt: number;
            isValidTime: boolean;
            isValidLocation: boolean
        }[];
        harvestingImages: {
            id: string;
            declareHarvestRTEId: string;
            fileName: string;
            capturedAt: number;
            latitude: number;
            longitude: number;
            createdAt: number;
            isValidTime: boolean;
            isValidLocation: boolean
        }[];
        afterImages: {
            id: string;
            declareHarvestRTEId: string;
            fileName: string;
            capturedAt: number;
            latitude: number;
            longitude: number;
            createdAt: number;
            isValidTime: boolean;
            isValidLocation: boolean
        }[];
        remainArea: number
    }[];
    rtEs: {
        id: string;
        declareHarvestId: string;
        updatedDate: number;
        user: {
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
    }[];
    documents: {
        declareHarvestId: string;
        description: string;
        fileName: string;
        orgFileName: string;
        orgFileExtention: string;
        documentType: {
            id: string;
            name: string;
            description: string
        };
        provisonDate: number;
        documentNo: string;
        provisonBy: string
    }[];
    isRTEMissing: boolean;
    forest: {
        id: string;
        status: string;
        profileName: string;
        profileCode: string;
        createdDate: number;
        updatedDate: number;
        profileDate: number;
        forestDeclaredType: {
            key: string;
            value: string;
            displayText: string;
            code: string;
            typeGroup: string
        };
        forestOwnerId: string;
        forestOwnerName: string;
        forestOwnerCode: string;
        province: {
            key: string;
            value: string;
            displayText: string;
            code: string;
            typeGroup: string
        };
        certificationCount: number;
        privacyType: string
    };
    timberSource: {
        id: string;
        profileName: string;
        profileId: string;
        profileDate: number;
        timberOwner: {
            id: string;
            name: string;
            email: string
        };
        status: string;
        declareHarvestId: string;
        declareHarvestProfileCode: string;
        hasRTE: boolean
    };
    standingTreeTradition: {
        id: string;
        profileId: string;
        profileName: string;
        profileDate: number;
        status: string;
        createFrom: string;
        forestOwner: {
            id: string;
            name: string;
            email: string
        };
        forestOwnerCode: string;
        seller: {
            id: string;
            name: string;
            email: string
        };
        buyer: {
            id: string;
            name: string;
            email: string
        };
        updatedDate: number;
        treeType: {
            id: string;
            name: string;
            latinName: string;
            shortName: string;
            engName: string
        };
        provinceName: string;
        hasInterested: boolean;
        forestId: string;
        forestProfileId: string;
        profileType: string
    };
}

export class CordinateItem {
    latitude: number;
    longitude: number;
}
