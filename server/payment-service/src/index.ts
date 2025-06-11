import express from "express"

const app = express()


//health check route
app.get("/", async(req,res)=> {
    res.status(200).json({"message":"hello"})
})

app.listen(3000, () => {
    console.log("server is up and running")
})