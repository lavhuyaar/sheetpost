import { NavLink } from "react-router";

import useTheme from "../hooks/useTheme";

import Footer from "../components/Footer";
import Header from "../components/Header";

const FeatureCard = ({ content }: { content: string }) => {
  return (
    <div className="text-lg flex w-full sm:w-auto sm:max-w-[200px] items-center justify-center px-6 py-6 bg-surface rounded-md">
      {content}
    </div>
  );
};

//Page logo
const Logo = () => {
  const { theme } = useTheme();

  return theme === "dark" ? (
    <img src="/images/sheetpost_logo_dark.png" alt="" className="size-60" />
  ) : (
    <img src="/images/sheetpost_logo_light.png" alt="" className="size-60" />
  );
};

const Home = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen w-full p-6 sm:p-[5%] bg-background text-text-primary items-center justify-center">
        <div className="flex flex-col text-center gap-6 items-center">
          <section className="flex flex-col">
            <h1 className="text-2xl sm:text-4xl font-bold mb-4">
              {" "}
              Welcome to SheetPost – Where Thoughts Get Rolled Out!
            </h1>
            <h2 className="text-xl sm:text-2xl">
              A minimal, no-nonsense blogging space for creators who just want
              to write, share, and manage without the clutter.
            </h2>
          </section>
          <Logo />
          <section className="flex flex-col items-center gap-8">
            <h3 className="text-xl font-semibold">
              Got a thought? A story? A hot take? With SheetPost, you can:
            </h3>
            <div className="flex flex-wrap justify-center gap-5">
              <FeatureCard content="Write Posts in a clean, efficient way" />
              <FeatureCard content="Manage Your blogs and posts easily" />
              <FeatureCard content="Read Comments from your readers" />
              <FeatureCard content="Delete Spam or Hate with a single click" />
              <FeatureCard content="Share Ideas with the world on your terms" />
            </div>
          </section>

          <section className="flex flex-col sm:flex-row items-center justify-center flex-wrap sm:gap-5">
            <a href="https://sheetpost-admin.vercel.app" target="_main" className="primary-btn w-full sm:w-auto sm:max-w-[200px] mt-4">
              Be an Author
            </a>
            <NavLink to="/posts" className="primary-btn w-full sm:w-auto sm:max-w-[200px] mt-4">
              See all posts
            </NavLink>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
