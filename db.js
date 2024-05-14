const {MongoClient}=require('mongodb');

let dbConnection;

module.exports={
    connectToDb:(cb)=>{
        MongoClient.connect('mongodb://localhost:27017/e-commerce')
        .then((client)=>{
            dbConnection=client.db();
            return cb();
        })
        .catch(err=>{
            console.log(err);
            return cb(err);
        })
    },
    getDb:()=>dbConnection,
    getOrderModel: () => dbConnection.collection('orders'),
    getUserModel: () => dbConnection.collection('users'),
    getCustomerEnquiries: () => dbConnection.collection('customer-enquiries'),
    getNewsletter:()=>dbConnection.collection('newsletters'),
    getResetPwd:()=>dbConnection.collection('reset-password'),
    
};