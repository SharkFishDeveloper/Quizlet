
import { Link } from "react-router-dom";

const StartButton = () => {
    return (
        <Link to="/lobby">
            <button className="px-6 py-3 text-lg font-medium rounded-xl border border-gray-400 text-black hover:bg-gray-200 transition-all cursor-pointer">
            Start your journey
            </button>
        </Link>
    
    );
  }
  
export default StartButton;
