export class ForestPlots {
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
    }[];
}

export class ForestPlotTree {
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
    };
}
