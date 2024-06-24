import { gql, useQuery } from "@apollo/client"; //for parsing graphql queries
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";
import { useState } from "react";
function BookList() {
  const [selectedBook,setSelectedBook] = useState(null)
  const {loading,error,data} = useQuery(getBooksQuery);
  if(error) return <p>Error : {error.message}</p>
  if(loading) return <p>Loading ... </p>
  console.log("data",data);
  return (
    <div id="main">
      <ul id="book-list">
        {data.books.map(book => (
             <li key={book.id} onClick={(e)=> setSelectedBook(book.id)}>{book.name} </li>
        ))}
        <BookDetails bookId={selectedBook}/>
      </ul>
    </div>
  );
}

export default BookList;
