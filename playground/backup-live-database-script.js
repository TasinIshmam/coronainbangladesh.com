const MongoBackup = require('mongodb-atlas-backup').default;


// Create an instance of the database connection
const backup = new MongoBackup({
    user: 'admin',
    password: 'yufgJnAKGZ5GpwhS',
    replicaSet: 'corona-in-bd-mongo-shard-0',
    nodes: [
        'corona-in-bd-mongo-shard-00-02-qcuic.gcp.mongodb.net:27017',
        'corona-in-bd-mongo-shard-00-00-qcuic.gcp.mongodb.net:27017',
        'corona-in-bd-mongo-shard-00-00-qcuic.gcp.mongodb.net:27017'
    ]
});

// Dump your cluster

backup.dump();

//todo FIND HOW TO DISCONNECT THE CONNECTION FFS.

// Restore data to your cluster
//backup.restore();