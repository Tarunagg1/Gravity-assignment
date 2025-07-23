
const salesAggregationPipeline = [
    // Stage 1: Unwind the items array to process each item separately
    {
        $unwind: "$items"
    },

    // Stage 2: Add computed fields for revenue and month
    {
        $addFields: {
            // Calculate revenue for each item (quantity * price)
            itemRevenue: { $multiply: ["$items.quantity", "$items.price"] },
            // Extract year-month from the date field
            month: {
                $dateToString: {
                    format: "%Y-%m",
                    date: "$date"
                }
            }
        }
    },

    // Stage 3: Group by store and month to aggregate data
    {
        $group: {
            _id: {
                store: "$store",
                month: "$month"
            },

            // Sum up all item revenues for total revenue
            totalRevenue: { $sum: "$itemRevenue" },

            // Calculate average price of items
            averagePrice: { $avg: "$items.price" },

            // Keep track of store and month for output
            store: { $first: "$store" },
            month: { $first: "$month" }
        }
    },

    // Stage 4: Project the final output format
    {
        $project: {
            _id: 0,
            store: 1,
            month: 1,
            totalRevenue: { $round: ["$totalRevenue", 2] },
            averagePrice: { $round: ["$averagePrice", 2] }
        }
    },

    // Stage 5: Sort by store first, then by month
    {
        $sort: {
            store: 1,
            month: 1
        }
    }
];


// Function to execute the aggregation
async function getSalesAnalytics(db, collectionName = 'sales') {
    try {
        const collection = db.collection(collectionName);
        const result = await collection.aggregate(salesAggregationPipeline).toArray();
        return result;
    } catch (error) {
        console.error('Error executing sales aggregation:', error);
        throw error;
    }
}



module.exports = {
    getSalesAnalytics
};

