import { RootState } from "../../../reducers";
import { connect } from "react-redux";
import { PresentationSettingsMenu, PresentationSettingsProps } from "./PresentationSettings";
import {
    selectDistrict,
    PresentationMenuActionType,
    ChangeDisproportionalityIndex,
    changeDecimals,
    changeShowPartiesNoSeats
} from "../presentation-menu-actions";
import { DisproportionalityIndex } from "../../Presentation/presentation-models";

interface StateProps
    extends Pick<
            PresentationSettingsProps,
            | "currentPresentation"
            | "districtSelected"
            | "decimals"
            | "showPartiesWithoutSeats"
            | "results"
            | "disproportionalityIndex"
        > {}

function mapStateToProps(state: RootState): StateProps {
    return {
        currentPresentation: state.presentationMenuState.currentPresentation,
        decimals: state.presentationMenuState.decimals,
        results: state.computationState.results,
        showPartiesWithoutSeats: state.presentationMenuState.showPartiesWithoutSeats,
        districtSelected: state.presentationMenuState.districtSelected,
        disproportionalityIndex: state.presentationMenuState.disproportionalityIndex
    };
}

interface DispatchProps
    extends Pick<
            PresentationSettingsProps,
            "changeDecimals" | "toggleShowPartiesWithoutSeats" | "selectDistrict" | "changeDisproportionalityIndex"
        > {}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    changeDecimals: (decimals: string, decimalsNumber: number) => {
        const action = changeDecimals(decimals, decimalsNumber);
        dispatch(action);
    },
    toggleShowPartiesWithoutSeats: (event: React.ChangeEvent<HTMLInputElement>) => {
        const action = changeShowPartiesNoSeats(event.target.checked);
        dispatch(action);
    },
    selectDistrict: (event: React.ChangeEvent<HTMLSelectElement>) => {
        const action = selectDistrict(event.target.value);
        dispatch(action);
    },
    changeDisproportionalityIndex: (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("test");

        const action: ChangeDisproportionalityIndex = {
            type: PresentationMenuActionType.ChangeDisproportionalityIndex,
            index: event.target.value as DisproportionalityIndex
        };
        dispatch(action);
    }
});

const presentationSettingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PresentationSettingsMenu as any);

export default presentationSettingsContainer;
