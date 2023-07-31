const express= require("express");
const app=express();
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://API:Api%401234567@hdka.tq2mbha.mongodb.net/Akshar").then(success =>app.listen(process.env.PORT || 3000,(msg)=>console.log("db connected")))
.catch(err=>console.log(err.message));

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
const schema={
    jobname: String,
    desc: String,
    location: String,
    jid:String
};
const API=mongoose.model("Jobs",schema);

app.get("/",async function(req,res){
res.sendFile(__dirname+"/index.html")
});
app.get("/getdata",async function(req,res){

const data=await API.find();
res.send(data);

});
app.delete("/:ID",async (req,res)=>{  
    const id= req.params.ID;
 const del= await API.deleteOne({jid:id});
 
 if(del.deletedCount==0)
 {
    res.send("no record found ");
 }
 else{ res.send("your record has been deleted ");}
});
app.post("/",function(req,res){
    

    const newdata=new API({

    jobname:req.body.jobname,
     desc:req.body.desc,
     location:req.body.location,
    jid:req.body.jid
});
newdata.save();
res.send({Status:1})


});
app.get("/getdata/:updateid",async function(req,res){
    
    const data=await API.findOne({jid:req.params.updateid});
   
    res.send(data);
    
    });
    app.put("/",async function(req,res){
    
        const data=await API.updateOne({jid:req.body.jid},{jobname:req.body.jobname,desc:req.body.desc,location:req.body.location});
        if(data.acknowledged)
        {
            res.send(data)
        }
        
        });

// app.listen(3000,function(error){
//     console.log("server is runing");
// });
    


