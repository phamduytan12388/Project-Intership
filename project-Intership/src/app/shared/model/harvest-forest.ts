export class HarvestForest {
    forestId: string;
    standingTreeTraditionId: string;
    forestType: string;
    profileName: string;
    profileCreatedUserId: string;
    harvesterId: string;
    profileDate: number;
    fromDate: number;
    toDate: number;
    harvestMethod: {
        key: string;
        value: string;
        displayText: string;
        code: string;
        typeGroup: string
    };
    items: {
        id: string;
        forestPlotTreeId: string;
        declareHarvestId: string;
        area: number;
        estimatedVolume: number;
    }[];
    documents: {
        declareHarvestId: string;
        description: string;
        fileName: string;
        documentType: {
            id: string;
            name: string;
            description: string
        };
        provisonDate: number;
        documentNo: string;
        provisonBy: string
    }[];
    isSend: boolean;
}

export class ItemTrees {
    id: string;
    forestPlotTreeId: string;
    declareHarvestId: string;
    area: number;
    estimatedVolume: number;
}
