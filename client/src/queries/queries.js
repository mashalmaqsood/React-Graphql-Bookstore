import { gql } from "@apollo/client";
//to dipslay authors name dropdown
const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const addBookMutation = gql`
mutation($name:String!,$genre:String!,$authorId:ID!){
  addBook(  name: $name, genre:$genre , authorId : $authorId){
    name
    id
  }
}
`

export {getAuthorsQuery,getBooksQuery,addBookMutation};
