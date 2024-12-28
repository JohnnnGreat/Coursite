"use client";
const Enroll = ({ course }) => {
   const handleEnroll = async () => {
      console.log("Enrolling in course:");
   };

   return (
      <button
         onClick={handleEnroll}
         className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
      >
         Enroll Now
      </button>
   );
};

export default Enroll;
