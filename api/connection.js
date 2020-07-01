const mongoose=require('mongoose');
var URL = 'mongodb://127.0.0.1:27017/nodejs';
//let domainUrl = 'mongodb+srv://ZaaraZoha:ZaaraZoha@#123@cluster0-pt35t.mongodb.net/test?retryWrites=true&w=majority';
mongoose.set('useCreateIndex', true)
mongoose.connect(URL,{ useNewUrlParser: true,useUnifiedTopology: true },function(err,db){
    if(err){
        console.log('jfg');
        console.log(err);
    }
    else {
        console.log('connection created succesfully');
    }
});
