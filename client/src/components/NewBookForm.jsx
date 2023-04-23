import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from "../queries/queries";

export default function NewBookForm() {
  const { loading, data } = useQuery(GET_AUTHORS);
  const [addBook, { mdata, mloading, merror }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }, "GetBooks"],
  });
  const [newBook, setNewBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    addBook({ variables: { ...newBook } });
    setNewBook({ name: "", genre: "", authorId: "" });
  }

  function handleChange(evt) {
    const newBookData = { ...newBook, [evt.target.name]: evt.target.value };
    setNewBook(newBookData);
  }

  return (
    <>
      <form id="add-book" onSubmit={handleSubmit}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            name="name"
            value={newBook.name}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            value={newBook.genre}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Author</label>
          <select
            name="authorId"
            value={newBook.authorId}
            onChange={handleChange}
          >
            <option>Select Author</option>
            {loading ? (
              <option>Loading...</option>
            ) : (
              data.authors.map(({ name, id }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))
            )}
          </select>
        </div>
        <button>+</button>
      </form>
    </>
  );
}
