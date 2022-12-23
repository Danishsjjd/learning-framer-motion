import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Checkbox } from "../components/Checkbox";
import PageTransition from "../components/PageTransition";
import Transition from "../components/Transition";
import Header from "../layout/Header";
import Layout from "../sections/LayoutAnimation";
import MainPage from "../sections/MainPage";
import Overview from "../sections/Overview";
import Scroll from "../sections/Scroll";

const Home = ({ previousPath }: { previousPath: string | undefined }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <motion.div exit={{}}>
      <Header />
      <h1 className="pointer-events-none text-center text-7xl font-bold">
        Main Page Animation's
      </h1>
      <MainPage />

      <div className="flex flex-col items-center gap-3">
        <h1 className="pointer-events-none text-center text-7xl font-bold">
          Examples
        </h1>
        <Checkbox isChecked={isChecked} setIsChecked={setIsChecked} />
        <PageTransition previousPath={previousPath} />
        <Link to={"/transition"} className="link text-3xl">
          transition
        </Link>
        <Link to={"/cards"} className="link text-3xl">
          Cards
        </Link>
      </div>

      <div>
        <h1 className="pointer-events-none text-center text-7xl font-bold">
          Animations
        </h1>
        <Overview />
        <Layout />
      </div>

      <div>
        <h3 className="pointer-events-none text-center text-4xl font-bold">
          Gestures
        </h3>
        <p>
          in Gestures, we have while&#123;hover, focus, inView, Tap, darg,
          pan&#125;
        </p>
      </div>

      <h3 className="pointer-events-none text-center text-4xl font-bold">
        Scroll
      </h3>
      <Scroll />

      <h3 className="pointer-events-none text-center text-4xl font-bold">
        Transition
      </h3>
      <Transition />
    </motion.div>
  );
};
export default Home;
