import { NavLink } from "react-router";

import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

import Footer from "../components/Footer";
import Header from "../components/Header";

const FeatureCard = ({ content }: { content: string }) => {
  return (
    <div className="text-lg flex items-center justify-center px-6 py-6 bg-surface rounded-md">
      {content}
    </div>
  );
};

//Page logo
const Logo = () => {
  const { theme } = useTheme();

  return theme === "dark" ? (
    <img
      src="/images/sheetpost_logo_dark.png"
      alt=""
      className="size-60"
    />
  ) : (
    <img
      src="/images/sheetpost_logo_light.png"
      alt=""
      className="size-60"
    />
  );
};

const Home = () => {
  const { userInfo } = useAuth();

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

          {userInfo ? (
            <NavLink to="/dashboard" className="primary-btn max-w-[200px] mt-4">
              Go to Dashboard
            </NavLink>
          ) : (
            <NavLink to="/login" className="primary-btn max-w-[200px] mt-4">
              Get Started Now!
            </NavLink>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
