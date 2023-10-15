import { DatabaseTables } from '../interfaces/common.interface';

export const databaseTables = (): DatabaseTables => {
    const { PRODUCTS_TABLE_NAME, STOCK_TABLE_NAME } = process.env;
    return {
        productsTable: PRODUCTS_TABLE_NAME ?? "unknown-list-table",
        stockTable: STOCK_TABLE_NAME ?? "unknown-tasks-table",
    };
};
