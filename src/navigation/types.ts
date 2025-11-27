import { NavigatorScreenParams } from '@react-navigation/native';

// Root Stack
export type RootStackParamList = {
    Main: NavigatorScreenParams<MainTabParamList>;
};

// Main Tab Navigator
export type MainTabParamList = {
    CustomersTab: NavigatorScreenParams<CustomerStackParamList>;
    AccountsTab: NavigatorScreenParams<AccountStackParamList>;
    DepositoTypesTab: NavigatorScreenParams<DepositoStackParamList>;
};

// Customer Stack
export type CustomerStackParamList = {
    CustomerList: undefined;
    CustomerForm: { customerId?: string; mode: 'create' | 'edit' };
    CustomerDetail: { customerId: string };
};

// Account Stack
export type AccountStackParamList = {
    AccountList: undefined;
    AccountForm: { accountId?: string; mode: 'create' | 'edit' };
    AccountDetail: { accountId: string };
    TransactionHistory: { accountId: string };
    DepositForm: { accountId: string };
    WithdrawalForm: { accountId: string };
};

// Deposito Type Stack
export type DepositoStackParamList = {
    DepositoTypeList: undefined;
    DepositoTypeForm: { depositoTypeId?: string; mode: 'create' | 'edit' };
};
