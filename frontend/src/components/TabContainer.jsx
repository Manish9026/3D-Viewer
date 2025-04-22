import { motion, AnimatePresence } from "framer-motion";
const tabs = ['Overview', 'Courses', 'Reviews'];
import { useState } from "react";
import { Moon, Sun } from 'lucide-react';

export function TabContainer({components=[]}) {
  const [activeTab, setActiveTab] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className=" relative flex flex-col min-w-[300px] flex-1 sm:min-w-[400px] mx-auto">
          {/* Tabs */}
          <div className=" sticky top-0 flex bg-gray-200 dark:bg-gray-800 p-1 rounded-xl">
            {components.map((tab,index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`relative z-10 flex-1 text-center cursor-pointer px-4 py-2 font-semibold transition-colors duration-300 rounded-lg ${activeTab === index
                    ? 'text-white'
                    : 'text-gray-700 dark:text-gray-300'
                  }`}
              >
                {activeTab === index && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 bg-blue-600 dark:bg-blue-500 rounded-lg z-0"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab?.title}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            // key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-2 p-5 rounded-xl bg-gray-800 shadow-md"
          >
            {/* {activeTab === components[activeTab] &&  */}
            {components[activeTab].element}
            {/* {activeTab === 'Courses' && <p>All your Courses are listed here.</p>}
            {activeTab === 'Reviews' && <p>Check out Reviews here.</p>} */}
            {/* {components[activeTab].element} */}
          </motion.div>
        </div>
  );
}