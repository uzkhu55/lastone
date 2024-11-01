// "use client";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Link from "next/link";
// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// const Wizardfooter = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalOpen1, setIsModalOpen1] = useState(false);
//   const [isModalOpen2, setIsModalOpen2] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [usernameToSearch, setUsernameToSearch] = useState(""); // State for username input
//   const modalRef = useRef(null); // Create a ref for the modal
//   const [uploadImages, setUploadImages] = useState([]); // State for uploaded image URLs
//   const [feedbackMessage, setFeedbackMessage] = useState(""); // State for feedback message
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const token = localStorage.getItem("token"); // Retrieve the token from local storage
//       if (token) {
//         setIsLoggedIn(true); // User is logged in if the token exists
//       } else {
//         setIsLoggedIn(false); // User is not logged in
//         router.push("/"); // Redirect to home page if not logged in
//       }
//     };

//     checkLoginStatus();
//   }, [router]);

//   useEffect(() => {
//     // Load uploaded image URLs from localStorage on component mount
//     const storedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
//     setUploadImages(storedImages);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Remove the token from local storage
//     setIsLoggedIn(false); // Update login status
//     router.push("/"); // Redirect to the home page
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         isModalOpen &&
//         modalRef.current &&
//         !modalRef.current.contains(event.target)
//       ) {
//         setIsModalOpen(false);
//       }
//       if (
//         isModalOpen1 &&
//         modalRef.current &&
//         !modalRef.current.contains(event.target)
//       ) {
//         setIsModalOpen1(false);
//       }
//       if (
//         isModalOpen2 &&
//         modalRef.current &&
//         !modalRef.current.contains(event.target)
//       ) {
//         setIsModalOpen2(false);
//       }
//     };

//     window.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       window.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isModalOpen, isModalOpen1, isModalOpen2]);

//   const handleAddHeartSlot = async () => {
//     const trimmedUsername = usernameToSearch.trim();
//     console.log("Searching for username:", trimmedUsername);
//     console.log("Stored usernames in localStorage:", Object.keys(localStorage));

//     // Retrieve the stored username
//     const storedUsername = localStorage.getItem("username");

//     // Check if the trimmed username matches the stored username
//     if (storedUsername && storedUsername === trimmedUsername) {
//       try {
//         const response = await axios.post(
//           "http://localhost:8000/api/users/admin-heart-slot",
//           { username: trimmedUsername }
//         );

//         setFeedbackMessage(response.data.message); // Set success message
//       } catch (error) {
//         console.error("Error adding heart slot:", error);
//         setFeedbackMessage("Failed to add heart slot."); // Set error message
//       }
//     } else {
//       setFeedbackMessage("Username not found in local storage."); // Set error message
//       setUsernameToSearch(""); // Clear the input field
//     }
//   };

//   const cloud_name = "dbldfhlfy"; // Replace with your Cloudinary cloud name
//   const upload_preset = "uzkhu55"; // Replace with your Cloudinary upload preset
//   const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

//   const handleImageUpload = async (event) => {
//     const files = Array.from(event.target.files);
//     setUploadImages(files); // Store the selected images

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

//           return res.data.secure_url; // Return the uploaded image URL
//         })
//       );

//       console.log(uploadedImageUrls); // Log uploaded image URLs

//       // Update state and localStorage
//       const newUploadImages = [...uploadImages, ...uploadedImageUrls];
//       setUploadImages(newUploadImages);
//       localStorage.setItem("uploadedImages", JSON.stringify(newUploadImages)); // Save to localStorage

//     } catch (error) {
//       console.error("Image upload failed:", error.response.data);
//       setFeedbackMessage("Image upload failed."); // Set error message
//     }
//   };
