import BookList from "./components/BookList";
import { ApolloClient,InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client"; //for injecting data from server to our application
import AddBook from "./components/AddBook";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache() 
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>My Reading List</h1>
        <BookList />
        <AddBook/>
      </div>
    </ApolloProvider>
  );
}

export default App;
