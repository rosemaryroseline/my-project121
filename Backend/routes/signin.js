require('dotenv').config();
const {Router}=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../db')

const router=Router()
const JWT_SECRET = process.env.JWT_SECRET;
router.post('/register',async(req,res)=>{
  let {name,email,password}=req.body

  const salt=await bcrypt.genSalt(10)
  const hashedPassword=await bcrypt.hash(password,salt);

  const record=await User.findOne({email:email});
  if(record){
    return res.status(400).send({message:"Email is already registered"})
  }else{


const user=new User({
  name:req.body.name,
  email:email,
  password:hashedPassword
})
const result=await user.save()

const {_id}=await result.toJSON();
const token=jwt.sign({_id:_id},JWT_SECRET)
res.cookie('jwt',token,{
  httpOnly:true,
  maxAge:24*60*60*1000
})

res.send({message:'success',token:token});
}
})

router.post('/login',async(req,res)=>{
  const user=await User.findOne({email:req.body.email})
  if(!user){
    return res.status(404).send({message:"User not found"})
  }
  if(!(await bcrypt.compare(req.body.password,user.password))){
    return res.status(400).send({
      message:"Password is Incorrect"
    })
  }
  const token=jwt.sign({_id:user._id},JWT_SECRET)
  res.cookie('jwt',token,{
    httpOnly:true,

    maxAge:24*60*60*1000

  })
  res.send({message:"success"});
})



module.exports=router