const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const { RootQueryType, RootMutationType } = require("./todos");
const app = express();

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);
app.listen(4000);

console.log("Running a GraphQL API server at localhost:4000/graphql");