import { PresentationType } from "../../Presentation/presentation-models";

interface SelectionItem {
    type: PresentationType;
    displayName: string;
}

export const selectionLookup: SelectionItem[] = [
    {
        type: PresentationType.DistrictTable,
        displayName: "Fylkesoversikt",
    },
    {
        type: PresentationType.ElectionTable,
        displayName: "Landsoversikt",
    },
    {
        type: PresentationType.LevellingSeats,
        displayName: "Utjevningsmandater",
    },
    {
        type: PresentationType.RemainderQuotients,
        displayName: "Restkvotienter",
    },
    {
        type: PresentationType.SeatDistribution,
        displayName: "Fylkesfordeling av mandater",
    },
    {
        type: PresentationType.SingleDistrict,
        displayName: "Enkeltfylke",
    },
];

export function getSelectionName(type: PresentationType) {
    return selectionLookup.find((selection) => selection.type === type)!.displayName;
}
