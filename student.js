const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

// MongoDB 連接資訊
const uri = "mongodb://localhost:27017"; // MongoDB 連接 URI
const dbName = "412637984"; // 資料庫名稱
const collectionName = "studentslist"; // 集合名稱

// 主函式
async function parseAndInsert() {
    const client = new MongoClient(uri);

    try {
        // 連接到 MongoDB
        await client.connect();
        console.log("成功連接到 MongoDB");

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // 讀取 CSV 檔案
        const results = [];
        fs.createReadStream('studentslist.csv') // CSV 檔案路徑
            .pipe(csv())
            .on('data', (data) => results.push(data)) // 收集每行數據
            .on('end', async () => {
                try {
                    // 插入資料到 MongoDB
                    const insertResult = await collection.insertMany(results);
                    console.log(`成功插入 ${insertResult.insertedCount} 筆資料！`);
                } catch (insertError) {
                    console.error("插入資料時發生錯誤：", insertError);
                } finally {
                    // 關閉連接
                    await client.close();
                    console.log("已關閉與 MongoDB 的連接");
                }
            });

    } catch (error) {
        console.error("發生錯誤：", error);
    }
}

// 執行函式
parseAndInsert();
