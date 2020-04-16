// 一个封装了mongodb_nodejs
// date: 2019/2/15
// author: 江震泳
const mongodb = require('mongodb').MongoClient
class MrMongo {
    /**
     * 
     * @param {string} dbURL 数据库地址 默认：mongodb://localhost:27017/
     *  (可有可无)
     */
    constructor(dbURL = 'mongodb://localhost:27017/') {
        // 默认的数据库地址
        this.dbURL = dbURL
    }
    // =======================================================================
    // 连接数据库
    /**
     * @return 数据库连接对象
     */
    connectDatabase() {
        const p = new Promise(res => {
            mongodb.connect(this.dbURL, (err, db) => {
                if (err) throw err
                res(db)
            })
        })
        return p
    }
    // =======================================================================
    // 获取一个文档
    /**
     * 
     * @param {string} databaseName 数据库名字
     * @param {string} collectionName 集合名字
     * @param {object} query 搜索索引
     * @return 找到的第一个对象
     */
    async getDocument(databaseName, collectionName, query = {}) {
        const db = await this.connectDatabase()
        const database = await db.db(databaseName)
        const p = new Promise(res => {
            try {
                database.collection(collectionName).find(query).toArray((err, data) => {
                    if (err) throw err
                    res(data[0])
                    db.close()
                })
            } catch (err) {
                db.close()
                throw err
            }
        })
        return p
    }
    // =======================================================================
    // 获取多个文档
    /**
     * 
     * @param {string} databaseName 数据库名字
     * @param {string} collectionName 集合名字
     * @param {object} query 搜索索引
     * @return 找到的第一个对象
     */
    async getDocuments(databaseName, collectionName, query = {}) {
        const db = await this.connectDatabase()
        const database = await db.db(databaseName)
        const p = new Promise(res => {
            try {
                database.collection(collectionName).find(query).toArray((err, data) => {
                    if (err) throw err
                    res(data)
                    db.close()
                })
            } catch (err) {
                db.close()
                throw err
            }
        })
        return p
    }
    // =======================================================================
    // 插入一个文档
    /**
     * 
     * @param {string} databaseName 数据库名字
     * @param {string} collectionName 集合名字
     * @param {object} document 文档对象
     * @return document
     */
    async insertDocument(databaseName, collectionName, document) {
        const db = await this.connectDatabase()
        const database = await db.db(databaseName)
        const p = new Promise(res => {
            try {
                if (typeof document !== 'object') {
                    throw new Error('document必须是一个对象')
                }
                database.collection(collectionName).insertOne(document, (err) => {
                    if (err) throw err
                    res(document)
                    db.close()
                })
            } catch (err) {
                db.close()
                throw err
            }
        })
        return p
    }
    // =======================================================================
    // 插入多个文档
    /**
     * 
     * @param {string} databaseName 数据库名字
     * @param {string} collectionName 集合名字
     * @param {object} documentArray 文档对象
     * @return documentArray
     */
    async insertDocuments(databaseName, collectionName, documentArray) {
        const db = await this.connectDatabase()
        const database = await db.db(databaseName)
        const p = new Promise(res => {
            try {
                if (typeof documentArray !== 'object') {
                    throw new Error('documentArray必须是一个对象')
                }
                if (documentArray.length === 0) {
                    throw new Error('documentArray不能是空数组')
                }
                database.collection(collectionName).insertMany(documentArray, (err) => {
                    if (err) throw err
                    res(documentArray)
                    db.close()
                })
            } catch (err) {
                db.close()
                throw err
            }
        })
        return p
    }
    // =======================================================================
    // 更新一个文档
    /**
     * 
     * @param {string} databaseName 数据库名
     * @param {string} collectionName 集合名
     * @param {object} query 搜索索引
     * @param {object} document 跟新的文档
     */
    async updataDocument(databaseName, collectionName, query, document) {
        const db = await this.connectDatabase()
        const database = await db.db(databaseName)
        const p = new Promise(res => {
            try {
                if (typeof query !== 'object') {
                    throw new Error('query必须是一个对象')
                }
                database.collection(collectionName).updateOne(query, { $set: document }, err => {
                    if (err) throw err
                    res(document)
                    db.close()
                })
            } catch (err) {
                db.close()
                throw err
            }
        })
    }
    // =======================================================================
    // 更新多个文档
    /**
     * 
     * @param {string} databaseName 数据库名
     * @param {string} collectionName 集合名
     * @param {object} query 搜索索引
     * @param {object} document 跟新的文档
     */
    async updataDocuments(databaseName, collectionName, query, document) {
        const db = await this.connectDatabase()
        const database = await db.db(databaseName)
        const p = new Promise(res => {
            try {
                if (typeof query !== 'object') {
                    throw new Error('query必须是一个对象')
                }
                database.collection(collectionName).updateMany(query, { $set: document }, err => {
                    if (err) throw err
                    res(document)
                    db.close()
                })
            } catch (err) {
                db.close()
                throw err
            }
        })
    }
    // =======================================================================
    // 删除一个文档
    /**
     * 
     * @param {string} databaseName 数据库名
     * @param {string} collectionName 集合名
     * @param {object} query 搜索索引
     * @return 要删除的文档
     */
    async deleteDocument(databaseName, collectionName, query) {
        const db = await this.connectDatabase()
        const database = await db.db(databaseName)
        const p = new Promise(res => {
            try {
                if (typeof query !== 'object') {
                    throw new Error('query必须是一个对象')
                }
                database.collection(collectionName).find(query).toArray((err, data) => {
                    if (err) throw err
                    res(data[0])
                    if (data.length > 0) {
                        database.collection(collectionName).deleteOne(query, err => {
                            if (err) throw err
                            db.close()
                        })
                    } else {
                        db.close()
                    }
                })
            } catch (err) {
                db.close()
                throw err
            }
        })
        return p
    }
    // =======================================================================
    // 删除多个文档
    /**
     * 
     * @param {string} databaseName 数据库名
     * @param {string} collectionName 集合名
     * @param {object} query 搜索索引
     * @return 要删除的文档
     */
    async deleteDocuments(databaseName, collectionName, query) {
        const db = await this.connectDatabase()
        const database = await db.db(databaseName)
        const p = new Promise(res => {
            try {
                if (typeof query !== 'object') {
                    throw new Error('query必须是一个对象')
                }
                database.collection(collectionName).find(query).toArray((err, data) => {
                    if (err) throw err
                    res(data)
                    if (data.length > 0) {
                        database.collection(collectionName).deleteMany(query, err => {
                            if (err) throw err
                            db.close()
                        })
                    } else {
                        db.close()
                    }
                })
            } catch (err) {
                db.close()
                throw err
            }
        })
        return p
    }
}
module.exports = new MrMongo()
// let i = () => {
//     let p = new Promise(req => {
//         let d = []
//         for(let c = 0; c < 1; c ++){
//             d.push({id: c  + 2, data: JSON.stringify(
//                 {
//                     title: 'test0',
//                     author: 'Mr-Jiang',
//                     docData: [
//                         {type: 0, data: 'a'}
//                     ],
//                     docClass: 'test21'
//                 }
//             )})
//         }
//         req(d)
//     })
//     return p
// }
// async function fun () {
//     let d = await i()
//     new MrMongo().insertDocuments('blogDataList', 'docList', d)
//         .then(res => {
//             console.log(res)
//         })
// }
// fun()
// new MrMongo().deleteDocuments('blogDataList', 'docList', {})
//     .then(req => {
//         console.log(req)
//     })
