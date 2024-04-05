export default function Info() {
  const id = localStorage.getItem("id");
  return (
    <section className="parent-container">
      <div>
        <p>Name {id}</p>
      </div>
    </section>
  );
}
