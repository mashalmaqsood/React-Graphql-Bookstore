import { useQuery } from "@apollo/client"; //for parsing graphql queries
import { getBooksQuery,getBookQuery } from "../queries/queries";

function BookDetails({bookId}) {
  const {loading,error,data} = useQuery(getBookQuery,
    {
        variables:{id:bookId}
    }
  );
  if(error) return <p>Error : {error.message}</p>
  if(loading) return <p>Loading ... </p>
  const displayBookDetails = () =>
  {
    const {book} = data;
    if(book){
        return (
            <div>
                <p>{book.name}</p>
                <p>{book.genre}</p>
                <p>{book.author.name}</p>
                <p>All other books by this author:</p>
                <ul className="other-books">
                    {book.author.books.map(item =>
                        {
                            return <li key={item.id}>{item.name}</li>
                        }
                    )}
                </ul>
                <p>{book.name}</p>
            </div>
        )
    }else{
        return <div>No book selected!</div>
    }

  }
  return (
    <div id="book-details">
        <p>Output book details here</p>
        {displayBookDetails()}
    </div>
  );
}

export default BookDetails;
