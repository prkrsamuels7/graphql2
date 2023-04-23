import { useQuery, gql } from "@apollo/client";
import { GET_BOOK, GET_AUTHORS } from "../queries/queries";
import { useState, useEffect } from "react";

export default function BookDetails({ bookId }) {
  const [currentBook, setCurrentBook] = useState("");
  const { loading, data } = useQuery(GET_BOOK, {
    variables: { id: bookId },
  });

  useEffect(() => {
    if (loading) return;
    setCurrentBook(bookId);
  }, [data]);

  return (
    <>
      {!currentBook ? (
        "No Book Selected"
      ) : loading ? (
        ``
      ) : (
        <div id="book-details">
          <h2>{data.book.name}</h2>
          <p>{data.book.genre}</p>
          <p>{data.book.author.name}</p>
          <ul>
            {data.book.author.books.map(({ id, name }) => {
              return <li key={id}>{name}</li>;
            })}
          </ul>
        </div>
      )}
    </>
  );
}
