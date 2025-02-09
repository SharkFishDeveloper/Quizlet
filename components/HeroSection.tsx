import { FaBookOpen, FaCheckCircle, FaClock } from "react-icons/fa";
import StartButton from "./StartButton";
import { motion } from "framer-motion";


const HeroSection = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 80 }} // Starts below
        animate={{ opacity: 1, y: 0 }} // Moves up smoothly
        transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
        className="bg-white shadow-2xl rounded-2xl p-10 max-w-3xl w-full text-center"
      >
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Welcome to{" "}
          <span className="text-yellow-500">
            <span className="text-[#31096b]">Test</span>
            <span className="text-cyan-400">Line</span>
          </span>
        </h1>
        <ul className="text-xl text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed space-y-4 text-left">
          <li className="flex items-center space-x-2">
            <span className="text-yellow-500 text-2xl">✔</span>
            <span>Practice daily</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-yellow-500 text-2xl">✔</span>
            <span>Topic-wise test series</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-yellow-500 text-2xl">✔</span>
            <span>Smart revision</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-yellow-500 text-2xl">✔</span>
            <span>Personal guidance</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-yellow-500 text-2xl">✔</span>
            <span>Track progress effortlessly</span>
          </li>
        </ul>
        <div className="flex justify-center space-x-6 mb-8 text-gray-700 text-4xl">
          <FaBookOpen className="hover:text-yellow-500 transition-all" />
          <FaCheckCircle className="hover:text-green-500 transition-all" />
          <FaClock className="hover:text-blue-500 transition-all" />
        </div>
        <StartButton />
      </motion.div>
    </div>
  );
};

export default HeroSection;
