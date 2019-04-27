import { RootState } from "../../../reducers";
import { connect } from "react-redux";
import { PresentationSettingsMenu, PresentationSettingsProps } from "./PresentationSettings";
import {
    selectDistrict,
    changeDecimals,
    changeShowPartiesNoSeats,
    changeDisproportionalityIndex,
    toggleShowComparison,
    toggleShowFilters,
} from "../presentation-menu-actions";
import { DisproportionalityIndex } from "../../Presentation/presentation-models";

/**
 * Describes which properties we want to pick from the properties of the
 * component for mapping from state to props.
 */
interface StateProps
    extends Pick<
            PresentationSettingsProps,
            | "currentPresentation"
            | "districtSelected"
            | "decimals"
            | "showPartiesWithoutSeats"
            | "results"
            | "disproportionalityIndex"
            | "showComparison"
            | "showFilters"
        > {}

function mapStateToProps(state: RootState): StateProps {
    return {
        currentPresentation: state.presentationMenuState.currentPresentation,
        decimals: state.presentationMenuState.decimals,
        results: state.computationState.current,
        showPartiesWithoutSeats: state.presentationMenuState.showPartiesWithoutSeats,
        districtSelected: state.presentationMenuState.districtSelected,
        disproportionalityIndex: state.presentationMenuState.disproportionalityIndex,
        showComparison: state.presentationMenuState.showComparison,
        showFilters: state.presentationMenuState.showFilters,
    };
}

/**
 * Describes which properties we want to pick from the properties of the
 * component for mapping from dispatch to props.
 */
interface DispatchProps
    extends Pick<
            PresentationSettingsProps,
            | "changeDecimals"
            | "toggleShowPartiesWithoutSeats"
            | "selectDistrict"
            | "changeDisproportionalityIndex"
            | "toggleShowComparison"
            | "toggleShowFilters"
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
        const action = changeDisproportionalityIndex(event.target.value as DisproportionalityIndex);
        dispatch(action);
    },
    toggleShowComparison: (event: React.ChangeEvent<HTMLInputElement>) => {
        const action = toggleShowComparison(event.target.checked);
        dispatch(action);
    },
    toggleShowFilters: (event: React.ChangeEvent<HTMLInputElement>) => {
        const action = toggleShowFilters(event.target.checked);
        dispatch(action);
    },
});

export const ConnectedPresentationSettings = connect(
    mapStateToProps,
    mapDispatchToProps
)(PresentationSettingsMenu as any);