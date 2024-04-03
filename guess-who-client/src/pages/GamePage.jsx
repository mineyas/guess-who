import { Icon } from "@iconify/react";

export default function GamePage() {
  return (
    <section className="parent-container">
      <h1>Gameee</h1>
      <div className="flex_row justify-between">
        <div className="question-bar w-fit">
          <button>
            <Icon icon="icons8:gender" width={35} className="mx-auto" />
          </button>
          <button>
            <Icon icon="emojione:eyes" width={35} className="mx-auto" />
          </button>
          <button>
            <Icon icon="mdi:glasses" width={35} className="mx-auto" />
          </button>
          <button>
            <Icon icon="mingcute:hair-2-fill" width={35} className="mx-auto" />
          </button>
          <button>
            <Icon icon="mdi:mustache" width={35} className="mx-auto" />
          </button>
          <button>
            <Icon icon="mingcute:hat-fill" width={35} className="mx-auto" />
          </button>
        </div>
        <div className="board grid grid-cols-6 gap-2 w-fit">
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
          <article>lorem</article>
        </div>

        <div className="card-players flex_col gap-4">
          <article>one</article>
          <article>two</article>
        </div>
      </div>
    </section>
  );
}
