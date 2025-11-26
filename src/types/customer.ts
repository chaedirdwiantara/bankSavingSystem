export interface Customer {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateCustomerDTO {
    name: string;
}

export interface UpdateCustomerDTO {
    name: string;
}
