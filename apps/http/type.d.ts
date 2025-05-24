
// modifying the express request handler
declare namespace Express{
    interface Request{
        userId?:string
    }
}