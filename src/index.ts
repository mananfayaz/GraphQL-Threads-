import express, { query } from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function init(){
    const app =express();
    const PORT=Number(process.env.PORT)|| 8000

    app.use(express.json());  // anything in json format will be parsed by going througgh this middleware

    const gqlServer=new ApolloServer({
        typeDefs:`
        type Query{
        hello: String
        say(name: String):String
        }`, 
        resolvers:{
            Query: {
                hello: ()=>
                    'Hey There Im Graphql',
                say:(_, {name}:{name: String}) => `Hey  ${name} how are you`,
            },
        },
    
    });
    
    await gqlServer.start();

    app.get("/",(req,res)=>{
        res.json({message: "Server is up and running"})
    })
    app.use('/graphql',expressMiddleware(gqlServer));
    
    

    app.listen(PORT,()=>{
        console.log(`Server started at ${PORT}`);
    })
    
}

init();