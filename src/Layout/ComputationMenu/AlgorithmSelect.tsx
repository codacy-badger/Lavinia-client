import * as React from "react";
import { getAlgorithmName } from "../../computation/logic";

export interface AlgorithmSelectProps {
    algorithm: number;
    defaultAlgorithm: number;
    onAlgorithmChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export class AlgorithmSelect extends React.Component<AlgorithmSelectProps> {
    render() {
        const setttingWasChanged = this.props.algorithm !== this.props.defaultAlgorithm;
        return (
            <div className="field">
                <label className="label" htmlFor="algorithm_select">
                    Valgt metode
                </label>
                <div className="control">
                    <div className="select is-dark is-fullwidth">
                        <select
                            title="Beregningsmetode"
                            className="form-control"
                            id="algorithm_select"
                            name="calcMethod"
                            value={this.props.algorithm.toString()}
                            onChange={this.props.onAlgorithmChange}
                        >
                            <option value="1">Sainte-Lagüe</option>
                            <option value="2">d'Hondt</option>>
                        </select>
                    </div>
                </div>
                {setttingWasChanged && <label>Orginalt: {getAlgorithmName(this.props.defaultAlgorithm)}</label>}
            </div>
        );
    }
}
