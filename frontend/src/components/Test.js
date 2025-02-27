// "use client";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Link from "next/link";
// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { toast, ToastContainer } from "react-toastify"; // Import toast
// import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

// const Wizardfooter = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalOpen1, setIsModalOpen1] = useState(false);
//   const [isModalOpen2, setIsModalOpen2] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [usernameToSearch, setUsernameToSearch] = useState("");
//   const [userDetails, setUserDetails] = useState(null); // State to hold user details
//   const [adminUsername, setAdminUsername] = useState(""); // State for admin username
//   const modalRef = useRef(null);
//   const [uploadImages, setUploadImages] = useState([]); // State for uploaded image URLs
//   const [feedbackMessage, setFeedbackMessage] = useState("");
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [imageExists, setImageExists] = useState(false);

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const token = localStorage.getItem("token");
//       setIsLoggedIn(!!token);
//       if (!token) router.push("/signup");
//     };
//     checkLoginStatus();
//   }, [router]);

//   // Get username from local storage on component mount
//   useEffect(() => {
//     const username = localStorage.getItem("username");
//     if (username) {
//       setAdminUsername(username); // Set the admin username state
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     setIsLoggedIn(false);
//     router.push("/");
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (modalRef.current && !modalRef.current.contains(event.target)) {
//         setIsModalOpen(false);
//         setIsModalOpen1(false);
//         setIsModalOpen2(false);
//       }
//     };
//     window.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       window.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isModalOpen, isModalOpen1, isModalOpen2]);

//   useEffect(() => {
//     const savedImages = JSON.parse(localStorage.getItem("uploadImages")) || [];
//     setUploadImages(savedImages);
//     setImageExists(savedImages.length > 0); // Check if images already exist
//   }, []);

//   const handleAddHeartSlot = async () => {
//     const trimmedUsername = usernameToSearch.trim();
//     const storedUsername = localStorage.getItem("username");

//     if (storedUsername && storedUsername === trimmedUsername) {
//       try {
//         const response = await axios.post(
//           "https://magicword.onrender.com/api/users/admin-heart-slot",
//           { username: trimmedUsername }
//         );
//         setFeedbackMessage(response.data.message);
//         toast.success("Heart added!"); // Show success toast
//       } catch (error) {
//         console.error("Error adding heart slot:", error);
//         setFeedbackMessage("Failed to add heart slot.");
//       }
//     } else {
//       setFeedbackMessage("Username not found in local storage.");
//       setUsernameToSearch("");
//     }
//   };

//   const fetchUserByUsername = async () => {
//     const trimmedUsername = usernameToSearch.trim();
//     if (!trimmedUsername) {
//       toast.error("Please enter a username.");
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `https://magicword.onrender.com/api/user/${trimmedUsername}`
//       );
//       setUserDetails(response.data); // Update state with fetched user details
//       toast.success("User found!"); // Show success toast
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       toast.error("User not found."); // Show error toast
//       setUserDetails(null); // Reset user details on error
//     }
//   };

//   const cloud_name = "dbldfhlfy"; // Replace with your Cloudinary cloud name
//   const upload_preset = "uzkhu55"; // Replace with your Cloudinary upload preset
//   const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

//   const handleImageUpload = async (event) => {
//     const files = Array.from(event.target.files);
//     try {
//       const uploadedImageUrls = await Promise.all(
//         files.map(async (image) => {
//           const formData = new FormData();
//           formData.append("file", image);
//           formData.append("upload_preset", upload_preset);

//           const res = await axios.post(url, formData, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           });

//           return res.data.secure_url;
//         })
//       );

//       const updatedUploadImages = [...uploadImages, ...uploadedImageUrls];
//       setUploadImages(updatedUploadImages); // Update the state with the uploaded image URLs
//       setSelectedImage(uploadedImageUrls[0]); // Set the first uploaded image as selected (optional)
//       setFeedbackMessage("Images uploaded successfully!"); // Set success message
//       setImageExists(true); // Indicate that images exist now

//       localStorage.setItem("uploadImages", JSON.stringify(updatedUploadImages));
//     } catch (error) {
//       console.error("Image upload failed:", error.response.data);
//       setFeedbackMessage("Image upload failed.");
//     }
//   };

//   return (
//     <div className="flex flex-wrap justify-evenly items-center mx-4 sm:mx-8 gap-4 lg:mx-16">
//       <button
//         onClick={() => setIsModalOpen1(true)}
//         className="p-2 px-8 text-2xl text-white w-[430px] justify-center mb-6 bg-[#1e1e3a] rounded-2xl flex gap-[100px]"
//       >
//         Winners
//       </button>
//       <button
//         onClick={() => setIsModalOpen2(true)}
//         className="p-2 px-8 text-2xl text-white w-[430px] justify-center bg-[#1e1e3a] mb-6 rounded-2xl flex gap-[100px]"
//       >
//         Updates
//       </button>
//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="p-2 px-8 text-2xl text-white w-[430px] justify-center bg-[#1e1e3a] mb-6 rounded-2xl flex gap-[100px]"
//       >
//         Profile
//       </button>
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center gap-4 justify-end px-[90px] bg-opacity-100 z-50">
//           <div
//             ref={modalRef}
//             className="bg-[#1e1e3a] p-6 rounded-lg text-white h-[80%] max-w-[430px] w-full"
//           >
//             <div className="flex justify-between items-center">
//               <div>
//                 {imageExists ? (
//                   <img
//                     className="w-[75px] h-[75px] rounded-full"
//                     src={uploadImages[0]}
//                     alt="Profile"
//                   />
//                 ) : (
//                   <input
//                     type="file"
//                     multiple
//                     onChange={handleImageUpload}
//                     className="w-[100px]"
//                   />
//                 )}
//               </div>
//               {/* Display the username from local storage */}
//               <div className="font-extrabold">{adminUsername || "ADMIN"}</div>
//             </div>
//             <div className="flex mt-4 flex-col items-center justify-between h-[80%] pt-4 gap-2">
//               <button className="w-[363px] h-[53px] rounded-lg font-extrabold text-2xl bg-[#000122]">
//                 Add Reward
//               </button>
//               <button className="w-[363px] h-[53px] rounded-lg font-extrabold text-2xl bg-[#000122]">
//                 Give Points
//               </button>
//               <input
//                 type="text"
//                 value={usernameToSearch}
//                 onChange={(e) => setUsernameToSearch(e.target.value)}
//                 placeholder="          Enter username"
//                 className="w-[363px] h-[53px] p-2  rounded-lg font-extrabold text-2xl bg-[#000122]"
//               />
//               <button
//                 className="w-[363px] h-[53px] rounded-lg font-extrabold text-2xl bg-[#000122]"
//                 onClick={handleAddHeartSlot}
//               >
//                 Add Heart Slot
//               </button>
//               {feedbackMessage && <p>{feedbackMessage}</p>}
//               {userDetails && (
//                 <div className="flex flex-col text-white">
//                   <p>Username: {userDetails.username}</p>
//                   <p>Email: {userDetails.email}</p>
//                   <p>Points: {userDetails.points}</p>
//                   {/* Add more fields as necessary */}
//                 </div>
//               )}
//               <button className="w-[363px] h-[53px] rounded-lg font-extrabold text-2xl bg-[#000122]">
//                 Settings
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="w-[363px] h-[53px] rounded-lg font-extrabold text-2xl bg-[#000122]"
//               >
//                 Exit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {isModalOpen1 && (
//         <div className="fixed inset-0 flex items-center gap-4 justify-start px-[90px] bg-opacity-100 z-50">
//           <div
//             ref={modalRef}
//             className="bg-[#1e1e3a] rounded-lg text-white h-[80%] max-w-[430px] w-full"
//           >
//             <div className="flex justify-center mt-4 gap-12 items-center">
//               <h2 className="text-2xl font-bold">#</h2>
//               <h2 className="text-2xl font-bold">Name</h2>
//               <h2 className="text-2xl font-bold">Rewards</h2>
//               <h2 className="text-2xl font-bold">When</h2>
//             </div>
//             <div className="flex mt-4 items-start justify-around bg-white text-black h-[80%] pt-4 gap-2">
//               <h2 className="text-2xl font-bold">1</h2>
//               <h2 className="text-2xl font-bold ">Jak</h2>
//               <h2 className="text-2xl ml-4 font-bold">9$</h2>
//               <h2 className="text-md font-bold">10.10.2024</h2>
//             </div>
//           </div>
//         </div>
//       )}
//       {isModalOpen2 && (
//         <div className="fixed inset-0 flex items-center gap-4 justify-center px-[90px] bg-opacity-100 z-50">
//           <div
//             ref={modalRef}
//             className="bg-[#1e1e3a] rounded-lg text-white h-[80%] max-w-[430px] w-full"
//           >
//             <div className="flex justify-center mt-4 gap-12 items-center">
//               <h2 className="text-2xl font-bold">#</h2>
//               <h2 className="text-2xl font-bold">Name</h2>
//               <h2 className="text-2xl font-bold">Points</h2>
//               <h2 className="text-2xl font-bold">Rewards</h2>
//             </div>
//             <div className="flex mt-4 items-start justify-evenly bg-white text-black h-[80%] pt-4 gap-2">
//               <h2 className="text-2xl font-bold">1</h2>
//               <h2 className="text-2xl font-bold">Jak</h2>
//               <h2 className="text-2xl font-bold">9$</h2>
//               <h2 className="text-2xl font-bold">10</h2>
//             </div>
//           </div>
//         </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default Wizardfooter;
