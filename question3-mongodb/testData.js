
const sampleSalesData = [
    {
        "_id": "ObjectId1",
        "date": new Date("2024-06-15T00:00:00Z"),
        "store": "Store A",
        "items": [
            {
                "name": "item1",
                "quantity": 5,
                "price": 10.0
            },
            {
                "name": "item2",
                "quantity": 3,
                "price": 20.0
            }
        ]
    },
    {
        "_id": "ObjectId2",
        "date": new Date("2024-06-20T00:00:00Z"),
        "store": "Store A",
        "items": [
            {
                "name": "item3",
                "quantity": 2,
                "price": 15.0
            },
            {
                "name": "item4",
                "quantity": 4,
                "price": 25.0
            }
        ]
    },
    {
        "_id": "ObjectId3",
        "date": new Date("2024-06-10T00:00:00Z"),
        "store": "Store B",
        "items": [
            {
                "name": "item1",
                "quantity": 3,
                "price": 12.0
            },
            {
                "name": "item5",
                "quantity": 2,
                "price": 18.0
            }
        ]
    },
    {
        "_id": "ObjectId4",
        "date": new Date("2024-06-25T00:00:00Z"),
        "store": "Store B",
        "items": [
            {
                "name": "item2",
                "quantity": 1,
                "price": 20.0
            },
            {
                "name": "item6",
                "quantity": 5,
                "price": 8.0
            }
        ]
    },
    {
        "_id": "ObjectId5",
        "date": new Date("2024-07-05T00:00:00Z"),
        "store": "Store A",
        "items": [
            {
                "name": "item7",
                "quantity": 6,
                "price": 22.0
            }
        ]
    }
];

// Function to insert sample data
async function insertSampleData(db, collectionName = 'sales') {
    try {
        const collection = db.collection(collectionName);

        // Clear existing data
        await collection.deleteMany({});

        // Insert sample data
        const result = await collection.insertMany(sampleSalesData);
        console.log(`Inserted ${result.insertedCount} sample documents`);

        return result;
    } catch (error) {
        console.error('Error inserting sample data:', error);
        throw error;
    }
}


// Function to test the aggregation pipeline
async function testAggregation() {
    const { MongoClient } = require('mongodb');
    const { getSalesAnalytics } = require('./salesAggregation');

    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB for testing');

        const db = client.db('salesTestDatabase');

        // Insert sample data
        await insertSampleData(db);

        // Run aggregation
        const results = await getSalesAnalytics(db);

        console.log('\n=== Aggregation Results ===');
        console.log(JSON.stringify(results, null, 2));

    } catch (error) {
        console.error('Error during testing:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}


// If this file is run directly, simulate the aggregation
if (require.main === module) {
    testAggregation();
}
