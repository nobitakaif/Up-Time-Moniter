import express, { response } from "express"
import { prismaClient } from "db/client"
import { authMiddleware } from "./middleware"

const app = express()
app.use(express.json())

app.post('/api/v1/website',authMiddleware, async(req,res)=>{

    const userId = req.userId!
    const url = req.body.url
    
    const data = await prismaClient.website.create({
        data:{
            userId,
            url
        }
    })

    res.json({
        id:data.id
    })

})

app.get('/api/v1/website/status',authMiddleware, async(req,res)=>{

    const websiteId = req.query.websiteId! as unknown as string // query parameter can be an array like /status?a=10&b=20 but we are inforce it is indeed 1 parameter like /status?a=10
    const userId = req.userId

    const data = await prismaClient.website.findFirst({
        where:{
            id:websiteId,
            userId,
            disabled:false
        },
        include:{
            ticks:true
        }
    })
    
    res.json(data)
})

app.get('/api/v1/website',authMiddleware, async(req,res)=>{

    const userId = req.userId!

    const website = await prismaClient.website.findMany({
        where:{
            userId,
            disabled:false
        }
    })
    
    res.json({
        website
    })

})

app.delete('/api/v1/website',authMiddleware, async(req,res)=>{
    // we are not deleting the website from the db just disabled the website access that in future user is try to get all the website then it does not sent disbaled website

    const websiteId = req.body.websiteId
    const userId = req.userId

    await prismaClient.website.update({
        where:{
            userId,
            id:websiteId
        },
        data:{
            disabled:true
        }
    })
    res.json({
        msg:"website deleted successfully"
    })

})

app.listen(8000,()=>{
    console.log(`Server is running or port ${8000}`)
})