const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const _ = require("lodash");
const Book = require('../models/book')
const Author = require('../models/author');
// origin  https://github.com/mashalmaqsood/react-graphql-bookstore.git (fetch)
// origin  https://github.com/mashalmaqsood/react-graphql-bookstore.git (push)
// Changes not staged for commit:
//   (use "git add/rm <file>..." to update what will be committed)
//   (use "git restore <file>..." to discard changes in working directory)
//         modified:   package-lock.json
//         modified:   package.json
//         deleted:    src/App.css
//         modified:   src/App.js
//         deleted:    src/App.test.js
//         modified:   src/index.css

// Untracked files:
//   (use "git add <file>..." to include in what will be committed)
//         src/components/
//         src/queries/
// var books = [
//     { name: 'Name of the Wind', genre: 'Fantasy', id: '1',authorId : '1' },
//     { name: 'The Final Empire', genre: 'Fantasy', id: '2' ,authorId : '2'},
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3',authorId : '2' },
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//     { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
//     { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
// ];

// var authors = [
//     { name: 'Patrick Rothfuss', age: 44, id: '1' },
//     { name: 'Brandon Sanderson', age: 42, id: '2' },
//     { name: 'Terry Pratchett', age: 66, id: '3' }
// ];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    //even if type of id is ID it is for graphql but here it is received as a string
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    //defining the relation type here
    author: {
      type: AuthorType,
      //parent is the book here for eg
      // parent { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' }
      resolve(parent, args) {
        // return _.find(authors,{id:parent.authorId}) //we will use mongo db now instead of dummy data
        return Author.findById(parent.authorId)
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    //even if type of id is ID it is for graphql but here it is received as a string
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    //each author might have a list of books
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books,{authorId : parent.id})
        return Book.find({authorId: parent.id})
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get Data from db or other source
        // return _.find(books,{id : args.id})
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get Data from db or other source
        // return _.find(authors,{id : args.id})
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({})
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Author.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type:new GraphQLNonNull( GraphQLString )},
                age: { type:new GraphQLNonNull( GraphQLInt )}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull( GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString )},
                authorId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        },

    }
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation : Mutation
});
