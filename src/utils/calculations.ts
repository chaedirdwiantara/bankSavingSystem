import { format, differenceInMonths } from 'date-fns';

export interface InterestCalculation {
    startingBalance: number;
    monthsHeld: number;
    monthlyReturn: number;
    yearlyReturn: number;
    interestEarned: number;
    endingBalance: number;
}

export function calculateInterest(
    startingBalance: number,
    depositDate: Date,
    withdrawalDate: Date,
    yearlyReturn: number,
): InterestCalculation {
    // Calculate months between dates
    const months = calculateMonthsBetween(depositDate, withdrawalDate);

    // Calculate monthly return from yearly
    const monthlyReturn = yearlyReturn / 12;

    // Calculate interest earned using simple interest formula
    const interestEarned = startingBalance * months * monthlyReturn;

    // Calculate ending balance
    const endingBalance = startingBalance + interestEarned;

    return {
        startingBalance,
        monthsHeld: months,
        monthlyReturn,
        yearlyReturn,
        interestEarned,
        endingBalance,
    };
}

function calculateMonthsBetween(startDate: Date, endDate: Date): number {
    const months = differenceInMonths(endDate, startDate);
    return Math.max(0, months);
}
