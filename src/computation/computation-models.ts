import { Election, Votes, Metrics, Parameters } from "../requested-data/requested-data-models";
import { Dictionary } from "../utilities/dictionary";

export enum AlgorithmType {
    SAINTE_LAGUE = "SAINTE_LAGUE",
    D_HONDT = "D_HONDT",
    UNDEFINED = "UNDEFINED",
}

export interface ComputationPayload {
    election: Election;
    algorithm: AlgorithmType;
    firstDivisor: number;
    districtThreshold: number;
    electionThreshold: number;
    districtSeats: number;
    levelingSeats: number;
    areaFactor: number;
    votes: Votes[];
    metrics: Metrics[];
    parameters: Parameters;
}

export interface DistrictResult {
    /** Name of the district */
    name: string;
    /** Number of district seats available */
    districtSeats: number;
    /** Number of leveling seats received */
    levelingSeats: number;
    totalSeats: number;
    /** Total number of votes cast in the district */
    votes: number;
    /** How many percent of all votes were cast in this district */
    percentVotes: number;
    /** Average number of votes per seat */
    votesPerSeat: number;
    /** Overview of details regarding quotients per party and winner for each district seat */
    districtSeatResult: SeatResult[];
    /** Overview of how many votes, percent of votes and seats each party got */
    partyResults: PartyResult[];
}

export interface DistrictResultv2 {
    /** Name of the district */
    name: string;
    /** Number of district seats available */
    districtSeats: number;
    /** Number of leveling seats received */
    levelingSeats: number;
    /** Total number of seats received */
    totalSeats: number;
    /** Total number of votes cast in the district */
    votes: number;
    /** How many percent of all votes were cast in this district */
    percentVotes: number;
    /** Average number of votes per seat */
    votesPerSeat: number;
}

/**
 * Stores the quotients for all the parties in a district
 */
export interface DistrictQuotients {
    /**
     * The district, the key of the row
     */
    district: string;
    levellingSeatRounds: PartyQuotient[];
}

/**
 * Stores the quotient of a party and whether it won a leveling seat in a specific district
 */
export interface PartyQuotient {
    partyCode: string;
    quotient: number;
    wonLevellingSeat: boolean;
}

export interface DistributionResult {
    /** A dictionary taking partyCodes and returning the matching number of seats won in this distribution */
    seatsWon: Dictionary<number>;
    /** List of information regarding the distribution of the individual seats */
    seatResults: SeatResult[];
}

export interface LagueDhontResult {
    /** A list of party results, with information about national results */
    partyResults: PartyResult[];
    /** A list of district results, with information about district-level results */
    districtResults: DistrictResult[];
    /** A list of information regarding the distribution of the leveling seats */
    levelingSeatDistribution: PartyRestQuotients[];
    /** A list of what the final quotients were for each party in each district */
    finalQuotients: DistrictQuotients[];
}

export interface LevelingSeat {
    /** The number of when this seat was selected, 0 if it was never selected. */
    seatNumber: number;
    /** The number this quotient had in the total quotient list. */
    quotientNumber: number;
    /** The district the seat belongs to */
    district: string;
    /** The party the seat belongs to */
    partyCode: string;
    /** The rest-quotient computed for this seat */
    quotient: number;
}

export interface PartyRestQuotients {
    partyCode: string;
    levelingSeats: LevelingSeat[];
}

export interface PartyResult {
    /** The partyCode associated with the party */
    partyCode: string;
    /** The party name of the party */
    partyName: string;
    /** The number of votes the party received, either nationally or within the district */
    votes: number;
    /** The percent of votes the party received, either nationally or within the district */
    percentVotes: number;
    /** The number of seats the party received, either nationally or within the district */
    districtSeats: number;
    /** The number of leveling seats the party received, either nationally or within the district */
    levelingSeats: number;
    /** The total number of seats the party received, either nationally or within the district */
    totalSeats: number;
    /** The difference between the partys number of votes and seats, either nationally or within the district */
    proportionality: number;
}
export interface NationalPartyResult {
    /** The partyCode associated with the party */
    partyCode: string;
    /** The party name of the party */
    partyName: string;
    /** The number of votes the party received, nationally or within the district */
    votes: number;
    /** The percent of votes the party received, nationally or within the district */
    percentVotes: number;
    /** The number of seats the party received, nationally or within the district */
    districtSeats: number;
    /** The number of leveling seats the party received, nationally or within the district */
    levelingSeats: number;
    /** The total number of seats the party received within, nationally or the district */
    totalSeats: number;
    /** The difference between the partys number of votes and seats, nationally or within the district */
    proportionality: number;
}

export interface PartyResultv2 extends NationalPartyResult {
    /** The district which the results are from */
    district: string;
}

export interface Result {
    resultId: number;
    votes: number;
    percentage: number;
    electionId: number;
    partyId: number;
    countyId: number;
    countyName: string;
    partyCode: string;
    partyName: string;
}

export interface SeatPartyResult {
    /** The partyCode of the participating party */
    partyCode: string;
    /** The quotient the party got in the distribution */
    quotient: number;
    /** The denominator used to calculate the result */
    denominator: number;
    /** The number of votes used to calculate the result */
    votes: number;
}

export interface SeatResult {
    /** Which number this seat has in the distribution (first seat = 0) */
    seatIndex: number;
    /** The partyCode of the party that won the seat */
    winner: string;
    /** A list with information regarding the parties compeating for the seat */
    partyResults: SeatPartyResult[];
}
