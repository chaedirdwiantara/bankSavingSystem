export interface DepositoType {
    id: string;
    name: string;              // e.g., "Deposito Bronze"
    yearlyReturn: number;      // e.g., 0.03 for 3%
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateDepositoTypeDTO {
    name: string;
    yearlyReturn: number;
}

export interface UpdateDepositoTypeDTO {
    name: string;
    yearlyReturn: number;
}
