import { gql, useQuery } from "@apollo/client"; //for parsing graphql queries
import { getBooksQuery } from "../queries/queries";
function BookList() {
  const {loading,error,data} = useQuery(getBooksQuery);
  if(error) return <p>Error : {error.message}</p>
  if(loading) return <p>Loading ... </p>
  console.log("data",data);
  return (
    <div id="main">
      <ul id="book-list">
        {data.books.map(book => (
             <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
