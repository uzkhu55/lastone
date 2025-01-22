"use client";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import QR from "qrcode-base64";

const Wizardheader = ({ username, setHeartCount, heartCount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);

  const fetchLeaderboardData = async () => {
    try {
      const response = await axios.get(
        "https://magicword.onrender.com/api/users/leaderboard"
      );
      setLeaderboardData(response.data); // Assuming your API returns an array of leaderboard items
    } catch (error) {
      let errorMessage = "Failed to load leaderboard data.";

      // Check for response from the server
      if (error.response) {
        // Server responded with a status code
        errorMessage += ` Status: ${error.response.status}.`;
        if (error.response.data && error.response.data.message) {
          errorMessage += ` Message: ${error.response.data.message}`;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage += " No response received from the server.";
      } else {
        // Something else caused the error
        errorMessage += ` Error: ${error.message}`;
      }

      // Log the complete error for debugging
      console.error("Error fetching leaderboard data:", error);

      // Display an error message to the user
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (isModalOpen2) {
      fetchLeaderboardData(); // Fetch data when the leaderboard modal opens
    }
  }, [isModalOpen2]);

  const [neg, setNeg] = useState();
  const modalRef = useRef(null);
  var imgData = QR.drawImg(
    "https://accredify.doubleslash.me/verify?id=3aad6b75-6ba7-4f6e-a7e9-be6f2a39cf15",
    {
      typeNumber: 5,
      errorCorrectLevel: "M",
      size: 150,
    }
  );
  const fetchHeartCount = async () => {
    const loggedInUsername = localStorage.getItem("username");

    if (!loggedInUsername) {
      setHeartCount(0);
      return;
    }

    try {
      const response = await axios.get(
        "https://magicword.onrender.com/api/users/heart-count",
        {
          params: { username: loggedInUsername }, // Use the logged-in username
        }
      );
      console.log("Heart count fetched:", response.data.heartCount); // Log heart count
      setHeartCount(response.data.heartCount || 0); // Update heart count state
    } catch (error) {
      console.error("Error fetching heart count:", error);
    }
  };
  const qracahbutton = async () => {
    try {
      const response = await axios.get(
        "https://magicword.onrender.com/api/users/qr"
      );
      setNeg(response);
    } catch (error) {
      console.error("Error fetching heart count:", error);
    }
  };
  useEffect(() => {
    fetchHeartCount(); // Fetch heart count on component mount

    const handleClickOutside = (event) => {
      if (
        (isModalOpen || isModalOpen1 || isModalOpen2) &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
        setIsModalOpen1(false);
        setIsModalOpen2(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, isModalOpen1, isModalOpen2]); // No need to include username here if you're fetching it in the function

  useEffect(() => {
    const handleStorageChange = () => {
      const newUsername = localStorage.getItem("username");
      setUsername(newUsername);
      fetchHeartCount(); // Re-fetch heart count when username changes
    };

    window.addEventListener("storage", handleStorageChange); // Listen for storage changes

    return () => {
      window.removeEventListener("storage", handleStorageChange); // Cleanup the event listener
    };
  }, [username, isModalOpen, isModalOpen1, isModalOpen2]); // Added username to dependencies

  const handleHeartSlotClick = async () => {
    const username = localStorage.getItem("username"); // Retrieve username from local storage
    console.log("Username retrieved from localStorage:", username); // Log the username

    try {
      const response = await axios.post(
        "https://magicword.onrender.com/api/users/mail",
        { username }
      );
      console.log(response); // Log the response
      alert("Email sent");
      // toast.success("Email sent!");
    } catch (error) {
      console.error(
        "Error adding heart slot:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        "Failed to add heart slot: " +
          (error.response ? error.response.data.message : "Unknown error")
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-wrap  items-center mx-4 justify-between md:h-[72px] h-[130px] md:mx-16">
      <button onClick={() => setIsModalOpen(true)}>
        <div className="p-2 px-8 md:text-2xl md:h-[48px] text-white w-[380px] h-[30px] md:mt-6 text-sm justify-between mt-2 bg-[#1e1e3a] rounded-2xl flex">
          <div className="flex gap-[4px] items-center">
            {Array.from({ length: heartCount }).map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faHeart}
                className="w-[20px]"
                beat
                fade
                style={{ color: "#f70a79" }}
              />
            ))}
          </div>
          Recharge
        </div>
      </button>
      <button
        onClick={() => setIsModalOpen1(true)}
        className="p-2 px-8 md:text-2xl md:h-[48px] text-white w-[380px] h-[30px] text-sm justify-center md:mt-6 bg-[#1e1e3a] rounded-2xl flex"
      >
        Task
      </button>
      <button
        onClick={() => setIsModalOpen2(true)}
        className="p-2 px-8 md:text-2xl md:h-[48px] text-white w-[380px] h-[30px] text-sm justify-center md:mt-6 bg-[#1e1e3a] rounded-2xl flex"
      >
        Leaderboard
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center gap-4 justify-start w-[414px] md:w-[580px] md:px-[90px] bg-opacity-100 z-50">
          <div
            ref={modalRef}
            className="bg-[#1e1e3a] p-6 rounded-lg text-white h-[80%] max-w-[430px] w-full"
          >
            <div className="flex justify-start mt-4 gap-16 items-center">
              <h2 className="text-2xl font-bold">Product</h2>
              <h2 className="text-2xl font-bold">Price</h2>
            </div>
            <div className="flex mt-4 flex-col items-center justify-between h-[80%] pt-4 gap-2">
              <div className="flex items-center w-[363px] justify-between">
                <div className="w-[83px]">1 Heart Slot</div>
                <div>10,000₮</div>
                <button
                  onClick={handleHeartSlotClick}
                  className="w-[93px] h-[53px] rounded-lg font-extrabold text-2xl bg-[#000122]"
                >
                  Авах
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen1 && (
        <div className="fixed inset-0 flex items-center gap-4 justify-center md:px-[90px] bg-opacity-100 z-50">
          <div
            ref={modalRef}
            className="bg-[#1e1e3a] p-6 rounded-lg text-white h-[80%] max-w-[430px] w-full"
          >
            <div className="flex justify-center mt-4 gap-12 items-center">
              <h2 className="text-2xl font-bold">Task Name</h2>
              <h2 className="text-2xl font-bold">Bonus</h2>
              <h2 className="text-2xl font-bold">Need</h2>
            </div>
            <div className="flex mt-4 items-start  h-[80%] pt-4 gap-2">
              <div className="h-[518px] flex flex-col items-center  w-[50px] ">
                <div className="p-4 font-extrabold text-xl">1</div>
                <div className="p-4 font-extrabold text-xl">2</div>
              </div>
              <div className="flex gap-2 flex-col">
                <button className="w-[303px] h-[53px] flex items-center justify-evenly rounded-lg font-extrabold text-md bg-[#000122]">
                  <div>Invite</div>
                  <div>3 Hearts</div>
                  <div>Per 1 member</div>
                </button>
                <button className="w-[303px] h-[53px] flex items-center justify-evenly rounded-lg font-extrabold text-md bg-[#000122]">
                  <div>Recharge</div>
                  <div>Full Heart</div>
                  <div>Min 1,000₮</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen2 && (
        <div className="fixed inset-0 flex items-center gap-4 justify-end md:px-[90px] bg-opacity-100 z-50">
          <div
            ref={modalRef}
            className="bg-[#1e1e3a] p-6 rounded-lg text-white h-[80%] max-w-[430px] w-full"
          >
            <div className="flex justify-center mt-4 gap-12 items-center">
              <h2 className="text-2xl font-bold">#</h2>
              <h2 className="text-2xl font-bold">Name</h2>
              <h2 className="text-2xl font-bold">Points</h2>
              <h2 className="text-2xl font-bold">Rewards</h2>
            </div>
            <div className="flex mt-4 flex-col items-center justify-between h-[80%] pt-4 gap-2">
              {leaderboardData.map((item, index) => (
                <div key={item.username} className="flex  gap-16 w-full">
                  <div>{index + 1}</div>
                  <div>{item.username}</div>
                  <div>{item.points}</div>
                  <div>{item.rewards}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Wizardheader;
