﻿import * as React from "react";
import ReactTable from "react-table";
import { PartyResult } from "../../../computation";
import { toSum } from "../../../utilities/reduce";

export interface ElectionOverviewProps {
    partyResults: PartyResult[];
    decimals: number;
    partyNameWidth: number;
}

export class ElectionOverview extends React.Component<ElectionOverviewProps, {}> {
    render() {
        const data = this.props.partyResults;
        const loosemoreHanbyIndex = data.map((value) => Math.abs(value.proportionality)).reduce(toSum, 0) / 2;
        return (
            <ReactTable
                className="-highlight -striped"
                data={data}
                defaultPageSize={data.length >= 10 ? 10 : data.length}
                pageSize={data.length >= 10 ? 10 : data.length}
                showPagination={data.length > 10}
                showPageSizeOptions={false}
                ofText={"/"}
                nextText={"→"}
                previousText={"←"}
                pageText={"#"}
                columns={[
                    {
                        Header: "Parti",
                        accessor: "partyName",
                        width: this.props.partyNameWidth + 165,
                        Footer: <strong>Utvalg</strong>
                    },
                    {
                        Header: "Stemmer",
                        accessor: "votes",
                        Footer: <strong>{data.map((value) => value.votes).reduce(toSum, 0)}</strong>
                    },
                    {
                        Header: "Distrikt",
                        accessor: "districtSeats",
                        Footer: <strong>{data.map((value) => value.districtSeats).reduce(toSum, 0)}</strong>
                    },
                    {
                        Header: "Utjevning",
                        accessor: "levelingSeats",
                        Footer: <strong>{data.map((value) => value.levelingSeats).reduce(toSum, 0)}</strong>
                    },
                    {
                        Header: "Sum",
                        accessor: "totalSeats",
                        Footer: <strong>{data.map((value) => value.totalSeats).reduce(toSum, 0)}</strong>
                    },
                    {
                        Header: "Proporsjonalitet",
                        accessor: "proportionality",
                        Footer: <strong>LHI: {loosemoreHanbyIndex.toFixed(this.props.decimals)}</strong>
                    }
                ]}
                defaultSorted={[
                    {
                        id: "totalSeats",
                        desc: true
                    }
                ]}
            />
        );
    }
}
