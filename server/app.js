const express = require('express');
const { graphqlHTTP } = require('express-graphql'); //telling express to run graphql api's
const app = express();
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors');
app.use(cors());
mongoose.connect('mongodb+srv://root:password2401@atlascluster.cdcjswx.mongodb.net/')
mongoose.connection.once('open', () => {
    console.log("Connected to database") 

})
app.use('/graphql',graphqlHTTP({
  schema,
  graphiql : true
}))

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});