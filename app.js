const express=require('express')
const app = express()
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const path = require('path')
const userModel=require("./models/user")

app.use(express.static(path.join(__dirname, 'public')))

app.get("/",(req,res)=>{
    res.render('index')

})

app.post("/create",async(req,res)=>{
    let {name,email,image}=req.body
    let user=await userModel.create({
        name,
        email,
        image
    })
    res.redirect("/read")
})


app.get("/read",async(req,res)=>{
    const users=await userModel.find()

    res.render('read',{users})
})


app.get("/delete/:id",async(req,res)=>{
    const {name,email,image}=req.body
    const user=await userModel.findOneAndDelete({_id:req.params.id},{name,image,email})
    res.redirect("/read")
})

app.get("/edit/:id",async(req,res)=>{
    const id=req.params.id
    const user=await userModel.findById({_id:id})
    res.render("edit",{user})
    

})


app.post("/update/:id",async(req,res)=>{
    const {name,email,image}=req.body
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {name, email, image});

    res.redirect("/read")
})
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})      
