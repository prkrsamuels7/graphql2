import BookList from "../components/BookList";
import NewBookForm from "../components/NewBookForm";

export default function App() {
  return (
    <div id="main">
      <h1>My Reading List</h1>
      <BookList />
      <NewBookForm />
    </div>
  );
}
