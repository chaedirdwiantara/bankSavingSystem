export interface Account {
    id: string;
    customerId: string;
    depositoTypeId: string;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateAccountDTO {
    customerId: string;
    depositoTypeId: string;
    initialBalance?: number;
}

export interface UpdateAccountDTO {
    balance: number;
}
