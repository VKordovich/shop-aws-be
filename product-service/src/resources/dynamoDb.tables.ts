export default {
    ProductsTable: {
        Type: "AWS::DynamoDB::Table",
        DeletionPolicy: "Delete",
        Properties: {
            TableName: "Products",
            AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
            KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            }
        },
    },
    StockTable: {
        Type: "AWS::DynamoDB::Table",
        DeletionPolicy: "Delete",
        Properties: {
            TableName: "Stock",
            AttributeDefinitions: [{ AttributeName: "product_id", AttributeType: "S" }],
            KeySchema: [{ AttributeName: "product_id", KeyType: "HASH" }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            }
        },
    }
};
