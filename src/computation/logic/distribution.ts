import { copyDictionary, Dictionary } from "../../utilities/dictionary";
import { QuotientDictionary } from "./quotient-dictionary";

/**
 * A general function for distributing a number of items on a number of names based on updated quotients.
 *
 * Each time a name wins an item, their count of items won is updated.
 * Subsequently the denominator used to calculate their quotient is updated to reflect their win on whether or not they will win following items.
 *
 * @param numberToDistribute Number of items to distribute
 * @param distributeOn A dictionary of names to distribute on, if there is already a partial distribution the values in this dictionary will be used as a starting point for how many items they have already received
 * @param baseValue The value used as the numerator for each name
 * @param denominatorFunction The function used to select the denominator to be used depending on how many items each name has won
 */
export function distributionByQuotient(
    numberToDistribute: number,
    distributeOn: Dictionary<number>,
    baseValue: Dictionary<number>,
    denominatorFunction: (timesWon: number) => number
): Dictionary<number> {
    const updatedDistribution = copyDictionary(distributeOn);
    const quotientDictionary = new QuotientDictionary(denominatorFunction);
    quotientDictionary.populateQuotients(updatedDistribution, baseValue);

    // Begin drawing winners
    for (let distributionIndex = 0; distributionIndex < numberToDistribute; distributionIndex++) {
        const winner = quotientDictionary.getWinner(baseValue);
        updatedDistribution[winner.key]++;

        // Calculate new quotient
        quotientDictionary.insertParty(winner.key, baseValue[winner.key], updatedDistribution[winner.key]);
    }

    return updatedDistribution;
}

/**
 * Denominator function for Sainte Lagues
 * @param numberOfSeatsAssigned The number of seats the party or district has won
 * @param firstDivisor The first divisor to be used if the party or district has not won any seats yet
 */
export function sainteLagues(numberOfSeatsAssigned: number, firstDivisor: number): number {
    if (numberOfSeatsAssigned === 0) {
        return firstDivisor;
    } else {
        return 2 * numberOfSeatsAssigned + 1;
    }
}

/**
 * Denominator function for d'Hondt
 * @param numberOfSeatsAssigned The number of seats the party or district has won
 */
export function dHondt(numberOfSeatsAssigned: number): number {
    return numberOfSeatsAssigned + 1;
}
