export class Forest {
    id: string;
    qfCode: string;
    landUseRightType: {
        key: string;
        value: string;
        displayText: string;
        code: string;
        typeGroup: string
    };
    profileDate: number;
    profileCode: string;
    profileName: string;
    protectionContactStatus: string;
    forestOwnerDocumentNumber: string;
    forestOwnerDocumentProvidedDate: number;
    createdDate: number;
    updatedDate: number;
    forestOwnerDocumentProvider: string;
    forestOwnerDocumentProvidedFor: string;
    forestOwnerDocumentExpiredDate: number;
    certificationStatus: boolean;
    mapFileUrl: string;
    mapNote: string;
    forestDocuments: {
        id: string;
        description: string;
        fileName: string;
        documentType: {
            id: string;
            name: string;
            description: string
        };
        orgFileName: string;
        orgFileExtention: string
    }[];
    forestCertifications: {
        id: string;
        name: string;
        code: string;
        description: string;
        fileUrl: string;
        expiredDate: number;
        issuedDate: number;
        issuedBy: string;
        type: {
            key: string;
            value: string;
            displayText: string;
            code: string;
            typeGroup: string
        };
        typeDescription: string;
        website: string;
        orgFileName: string;
        orgFileExtention: string
    }[];
    ownerVerifier: {
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
    ownerVerifiedStatus: string;
    ownerVerifierNote: string;
    forestDeclaredVerifier: {
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
    forestDeclaredVerifiedStatus: string;
    forestDeclaredVerifierNote: string;
    forestPlotVerifier: {
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
    forestPlotVerifiedStatus: string;
    forestPlotVerifierNote: string;
    status: string;
    forestPlots: {
        id: string;
        forestId: string;
        commune: {
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
        village: string;
        compt: string;
        subCompt: string;
        plotCode: string;
        compartment: string;
        subCompartment: string;
        area: number;
        availableArea: number;
        coordinateStatus: boolean;
        trees: {
            id: string;
            forestPlotId: string;
            area: number;
            plantedYear: number;
            estimatedVolume: number;
            createdDate: number;
            updatedDate: number;
            isPlantedByStateBudget: boolean;
            treeType: {
                id: string;
                name: string;
                latinName: string;
                shortName: string;
                engName: string
            };
            detail: {
                harvestProfileCount: number;
                otherHarvestedArea: number;
                harvestedArea: number;
                standingTreeProfileCount: number;
                standingTreeArea: number
            }
        }[]
    }[];
    forestDeclaredType: {
        key: string;
        value: string;
        displayText: string;
        code: string;
        typeGroup: string
    };
    forestOwner: {
        id: string;
        fullName: string;
        shortName: string;
        userType: string;
        userId: string;
        taxCode: string;
        representativeName: string;
        representativePosition: string;
        representativeIdCard: string;
        representativePhoneNumber: string;
        representativeEmail: string;
        cellphoneNumber: string;
        phoneNumber: string;
        fax: string;
        webSite: string;
        updatedDate: number;
        enterpriseType: {
            key: string;
            value: string;
            displayText: string;
            code: string;
            typeGroup: string
        };
        supplyChainTypes: {
            key: string;
            value: string;
            displayText: string;
            code: string;
            typeGroup: string
        }[];
        businessTypes: {
            id: string;
            name: string;
            description: string;
            parentId: string;
            sortOrder: number;
            registFor: string
        }[];
        commune: {
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
        province: {
            key: string;
            value: string;
            displayText: string;
            code: string;
            typeGroup: string
        };
        village: string;
        street: string;
        logoImage: string;
        coCode: string;
        ownershipType: string;
        ownershipTypeDescription: string;
        establishmentDate: number;
        registrationCertificateDate: number;
        registrationCertificatePlace: string;
        contactName: string;
        contactPosition: string;
        organizationType: string;
        organizationTypeDescription: string;
        identityCard: string;
        identityCardIssuedDate: number;
        identityCardIssuedBy: string;
        permanentAddressCommune: {
            key: string;
            value: string;
            displayText: string;
            code: string;
            typeGroup: string
        };
        permanentAddressDistrict: {
            key: string;
            value: string;
            displayText: string;
            code: string;
            typeGroup: string
        };
        permanentAddressProvince: {
            key: string;
            value: string;
            displayText: string;
            code: string;
            typeGroup: string
        };
        permanentAddressVillage: string;
        permanentAddressStreet: string;
        diffrentAddressReason: string;
        images: string[];
        houseRegistrationImages: string[];
        forestOwnerType: {
            key: string;
            value: string;
            displayText: string;
            code: string;
            typeGroup: string
        };
        groups: {
            id: string;
            name: string;
            description: string;
            otherDescription: string;
            canRequest: boolean
        }[];
        forestProfileCount: number;
        accountEmail: string;
        fullNameUser: string;
        waitingApproveGroups: {
            id: string;
            name: string;
            description: string;
            otherDescription: string;
            canRequest: boolean
        }[]
    };
    province: {
        key: string;
        value: string;
        displayText: string;
        code: string;
        typeGroup: string
    };
    parcelInformation: {
        id: string;
        parcel: string;
        area: number;
        mapNumber: string;
        note: string;
        images: string[]
    };
    prevId: string;
    isLandOwner: boolean;
    forestLandOwners: {
        id: string;
        ownerName: string;
        personIdCardNumber: string;
        enterpriseTaxCode: string;
        type: {
            key: string;
            value: string;
            displayText: string;
            code: string;
            typeGroup: string
        };
        images: {
            id: string;
            orgFileName: string;
            orgFileExtension: string;
            fileUrl: string;
            container: string
        }[];
        forestLandOwnerRights: {
            id: string;
            landTunureType: {
                key: string;
                value: string;
                displayText: string;
                code: string;
                typeGroup: string
            };
            documentType: {
                key: string;
                value: string;
                displayText: string;
                code: string;
                typeGroup: string
            };
            documentOther: string;
            documentNo: string;
            issuedDate: number;
            issuedBy: string;
            expiredDate: number;
            documents: {
                id: string;
                orgFileName: string;
                orgFileExtension: string;
                fileUrl: string;
                container: string
            }[]
        }[];
        forestLandOwnerAgreements: {
            id: string;
            agreementType: {
                key: string;
                value: string;
                displayText: string;
                code: string;
                typeGroup: string
            };
            agreementOther: string;
            agreementSignedDate: number;
            agreementTime: string;
            canSellHarvestForest: boolean;
            sellHarvestTerm: string;
            documents: {
                id: string;
                orgFileName: string;
                orgFileExtension: string;
                fileUrl: string;
                container: string
            }[]
        }[]
    }[];
    forestLandOwnerRights: {
        id: string;
        landTunureType: {
            key: string;
            value: string;
            displayText: string;
            code: string;
            typeGroup: string
        };
        documentType: {
            key: string;
            value: string;
            displayText: string;
            code: string;
            typeGroup: string
        };
        documentOther: string;
        documentNo: string;
        issuedDate: number;
        issuedBy: string;
        expiredDate: number;
        documents: {
            id: string;
            orgFileName: string;
            orgFileExtension: string;
            fileUrl: string;
            container: string
        }[]
    }[];
    privacyType: string;
    landForestInformationFile: {
        id: string;
        orgFileName: string;
        orgFileExtension: string;
        fileUrl: string;
        container: string
    };
}
