const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: String,
  year: Number,
  genre: String,
  ratings: [
    {
      userId: {
        type: String,
        required: true,
      },
      grade: {
        type: Number,
        default: 0,
      },
    },
  ],
  averageRating: Number,
});

module.exports = mongoose.model("Book", BooksSchema);

// Book {
//     userId : String - identifiant MongoDB unique de l'utilisateur qui a créé le livre
//     title : String - titre du livre
//     author : String - auteur du livre
//     imageUrl : String - illustration/couverture du livre
//     year: Number - année de publication du livre
//     genre: String - genre du livre
//     ratings : [
//     {
//     userId : String - identifiant MongoDB unique de l'utilisateur qui a noté le livre
//     grade : Number - note donnée à un livre
//     }
//     ] - notes données à un livre
//     averageRating : Number - note moyenne du livre