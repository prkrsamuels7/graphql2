const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// allow cross-orition requests
app.use(cors());

mongoose.set("strictQuery", true);

mongoose.connect(
  "mongodb+srv://prkrsamuels:4LbxTuXpWYudJ3@cluster0.bt2yj.mongodb.net/graphQL-ninja?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("listening on port 4000");
});
