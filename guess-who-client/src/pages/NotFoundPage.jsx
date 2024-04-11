import Lottie from "react-lottie";
import notFound from "../assets/animations/404.json";
export default function NotFoundPage() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notFound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <section className="flex items-center justify-center h-[90vh] bg-primary-dark">
      <div className="container flex_col gap-8 h-fit w-3/5">
        <h1 className="mb-0 text-accent4-dark text-center">
          Sorry this page is not available at the moment
        </h1>
        <Lottie options={defaultOptions} height={300} width={300} />
      </div>
    </section>
  );
}
