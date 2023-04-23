import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/queries";
import BookDetails from "./BookDetails";
import { useState } from "react";

export default function Booklist() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [bookId, setBookId] = useState("");

  return (
    <>
      <div>
        <ul id="book-list">
          {loading ? (
            <p>Loading...</p>
          ) : (
            data.books.map(({ name, id }) => (
              <li onClick={() => setBookId(id)} value={name} key={id}>
                {name}
              </li>
            ))
          )}
        </ul>
        <BookDetails bookId={bookId} />
      </div>
    </>
  );
}
