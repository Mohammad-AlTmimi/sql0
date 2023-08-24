import DS  from './dataSource.js';

const intialize = (() =>{
    
    DS.dataSource.initialize().then(() =>{
        console.log("Connect to DB!")
    }).catch(err =>{
        console.error('Failed to connect to DB: ' , err);
    })
    DS.dataSource.manager
})
export default {intialize , DS};