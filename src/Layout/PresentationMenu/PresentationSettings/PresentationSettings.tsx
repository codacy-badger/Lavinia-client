﻿import * as React from "react";
import { LagueDhontResult, ComputationPayload } from "../../../computation";
import { SmartNumericInput } from "../../../common";
import { PresentationType, DisproportionalityIndex } from "../../Presentation/presentation-models";
import { DisproportionalitySelect } from "./DisproportionalitySelect";
import { NoSeatsCheckbox } from "./NoSeatsCheckbox";
import { ComparisonCheckbox } from "./ComparisonCheckbox";
import { FiltersCheckbox } from "./FiltersCheckbox";
import { MergeDistrictsCheckbox } from "./MergeDistrictsCheckbox";
import { ElectionType, Votes, Metrics, Parameters } from "../../../requested-data/requested-data-models";
import {
    mergeElectionDistricts,
    districtMap,
    mergeVoteDistricts,
    mergeMetricDistricts,
} from "../../../computation/logic/district-merging";
import { ComputationMenuPayload } from "../../ComputationMenu/computation-menu-models";

export interface PresentationSettingsProps {
    currentPresentation: PresentationType;
    districtSelected: string;
    displayedDecimals?: number;
    decimals: string;
    showPartiesWithoutSeats: boolean;
    changeDecimals: (decimals: string, decimalsNumber: number) => void;
    toggleShowPartiesWithoutSeats: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectDistrict: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    results: LagueDhontResult;
    changeDisproportionalityIndex: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    disproportionalityIndex: DisproportionalityIndex;
    toggleShowComparison: (event: React.ChangeEvent<HTMLInputElement>) => void;
    showComparison: boolean;
    toggleShowFilters: (event: React.ChangeEvent<HTMLInputElement>) => void;
    showFilters: boolean;
    year: number;
    mergeDistricts: boolean;
    toggleMergeDistricts: (checked: boolean) => void;
    electionType: ElectionType;
    votes: Votes[];
    metrics: Metrics[];
    parameters: Parameters;
    computationPayload: ComputationPayload;
    settingsPayload: ComputationMenuPayload;
    updateCalculation: (computationPayload: ComputationPayload, autoCompute: boolean, forceCompute: boolean) => any;
}
export class PresentationSettingsMenu extends React.Component<PresentationSettingsProps> {
    /**
     * Helper function for reducing code in render(), allows conditional
     * rendering.
     *
     * @returns true if the view contains decimals, false otherwise
     */
    needsDecimals(): boolean {
        return (
            this.props.currentPresentation === PresentationType.DistrictTable ||
            this.props.currentPresentation === PresentationType.ElectionTable ||
            this.props.currentPresentation === PresentationType.SingleDistrict ||
            this.props.currentPresentation === PresentationType.RemainderQuotients
        );
    }

    /**
     * Helper function that checks whether the current component should
     * show disproportionality index as an option
     *
     * @returns true if the current view requires displaying disproportionality options, false otherwise
     */
    showDisproportionalitySelect(): boolean {
        return (
            this.props.currentPresentation === PresentationType.SingleDistrict ||
            this.props.currentPresentation === PresentationType.ElectionTable
        );
    }

    /**
     * Helper function for evaluating whether the district select should
     * be shown.
     *
     * @returns true if the dropdown should be shown, false otherwise
     */
    showDistrictSelect(): boolean {
        if (this.props.currentPresentation === PresentationType.SingleDistrict) {
            return true;
        }
        return false;
    }

    /**
     * Helper function for evaluating whether comparison should be shown.
     *
     * @returns true if comparison should be shown, false otherwise
     */
    showComparison(): boolean {
        return this.props.currentPresentation === PresentationType.ElectionTable;
    }

    /**
     * Helper function for evaluating whether filters checkbox should be shown.
     *
     * @returns true if filters checkbox should be shown, false otherwise
     */
    showFilters(): boolean {
        return this.props.currentPresentation === PresentationType.ElectionTable;
    }

    /**
     * Helper function for evaluating whether the merge districts checkbox should be shown.
     *
     * @returns true if merge districts checkbox should be shown, false otherwise
     */
    showMergeDistricts(): boolean {
        return this.props.year >= 2005;
    }

    onToggleMergeDistricts = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.toggleMergeDistricts(event.target.checked);

        const year = this.props.year;
        let election = this.props.electionType.elections.find((election) => election.year === year);
        let votes = this.props.votes.filter((vote) => vote.electionYear === year);
        let metrics = this.props.metrics.filter((metric) => metric.electionYear === year);
        const parameters = this.props.parameters;

        if (election !== undefined) {
            if (year >= 2005 && event.target.checked) {
                election = mergeElectionDistricts(election, districtMap);
                votes = mergeVoteDistricts(votes, districtMap);
                metrics = mergeMetricDistricts(metrics, districtMap);
            }

            this.props.updateCalculation(
                {
                    ...this.props.computationPayload,
                    election,
                    metrics,
                    votes,
                    parameters,
                },
                this.props.settingsPayload.autoCompute,
                false
            );
        }
    };

    render() {
        return (
            <div className="columns">
                <div className="columns">
                    <div className="column">
                        <NoSeatsCheckbox
                            showPartiesWithoutSeats={this.props.showPartiesWithoutSeats}
                            toggleShowPartiesWithoutSeats={this.props.toggleShowPartiesWithoutSeats}
                        />
                        <FiltersCheckbox
                            hidden={!this.showFilters()}
                            showFilters={this.props.showFilters}
                            toggleShowFilters={this.props.toggleShowFilters}
                        />
                        <ComparisonCheckbox
                            hidden={!this.showComparison()}
                            showComparison={this.props.showComparison}
                            toggleComparison={this.props.toggleShowComparison}
                        />
                    </div>
                    <div className="column">
                        <MergeDistrictsCheckbox
                            hidden={!this.showMergeDistricts()}
                            mergeDistricts={this.props.mergeDistricts}
                            toggleMergeDistricts={this.onToggleMergeDistricts}
                        />
                    </div>
                </div>
                <div className="column">
                    <div className="columns">
                        <div className="column">
                            <SmartNumericInput
                                hidden={!this.needsDecimals()}
                                name="decimalPlaces"
                                defaultValue={2}
                                min={0}
                                max={16}
                                integer={true}
                                slider={false}
                                title="Antall desimaler"
                                value={this.props.decimals}
                                onChange={this.props.changeDecimals}
                            />
                        </div>
                        <div className="column">
                            <DisproportionalitySelect
                                hidden={!this.showDisproportionalitySelect()}
                                changeDisproportionalityIndex={this.props.changeDisproportionalityIndex}
                                disproportionalityIndex={this.props.disproportionalityIndex}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
