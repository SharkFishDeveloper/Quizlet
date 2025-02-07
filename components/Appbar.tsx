import React from "react";
import { Link } from "react-router-dom";

const Appbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-lg">
      {/* Home Link */}
      <Link
        to="/"
        className="text-xl font-semibold tracking-wide text-[#31096b] hover:text-[#5a1ca8] transition duration-300"
      >
        Home
      </Link>

      {/* Lobby Link */}
      <Link
        to="/lobby"
        className="text-lg font-medium text-[#31096b] hover:text-[#5a1ca8] transition duration-300"
      >
        Lobby
      </Link>
    </div>
  );
};

export default Appbar;
