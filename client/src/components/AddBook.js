import { gql, useMutation, useQuery } from "@apollo/client"; //for parsing graphql queries
import { getAuthorsQuery,addBookMutation, getBooksQuery } from "../queries/queries";
import { useState } from "react";

function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAAuthorId] = useState("");
  console.log("result", useMutation(addBookMutation));
  const [addBook] = useMutation(addBookMutation)
  const { loading, error, data } = useQuery(getAuthorsQuery);
  console.log("DATAAA",data);
  const displayAuthors = () => {
    if (loading) return <option disabled>Loading authors</option>;
    if (error) return <option disabled>Error loading authors</option>;
    return data.authors.map((author) => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  };

  const submitForm = async(e) => {
    e.preventDefault();
    console.log({ name, genre, authorId });
    try {
      await addBook({
        variables: {
          name,
          genre,
          authorId
        },
        refetchQueries : [{query : getBooksQuery}]
      });
      console.log('Book added successfully!');
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };
  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setAAuthorId(e.target.value)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default AddBook;
