const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // 修改為你的 MongoDB 連接字串
const dbName = "412637984"; // 資料庫名稱
const collectionName = "studentslist"; // 集合名稱

(async () => {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("成功連接到 MongoDB");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // 使用 Aggregation Pipeline 查詢各院系人數
        const result = await collection.aggregate([
            {
                $group: {
                    _id: "$院系", // 根據院系分組
                    student_count: { $count: {} } // 計算每組的學生數
                }
            },
            {
                $sort: { student_count: -1 } // 按人數降序排序
            }
        ]).toArray();

        console.log("各科系人數統計：", result);
    } catch (error) {
        console.error("發生錯誤：", error);
    } finally {
        await client.close();
        console.log("已斷開連接");
    }
})();
