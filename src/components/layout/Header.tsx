// components/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { Bell, Search } from "lucide-react";
import { FaCaretLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { axiosInstance } from "../../lib/authInstances";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [image, setImage] = useState("/assets/profile.svg");
  const fileInputRef = useRef(null);

  // ✅ Fetch admin profile image on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/admin/profile/image", { withCredentials: true });
if (res.data?.imageUrl) {
  setImage(res.data.imageUrl);
}
      } catch (err) {
        console.error("Failed to fetch admin info", err);
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl); // Optional: instant preview

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosInstance.post(
        "/admin/profile/upload-image",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.imageUrl) {
        setImage(response.data.imageUrl);
      }
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <header className="h-16 bg-white flex items-center justify-between px-6">
      <div className="flex items-center flex-1">
        <div className="flex items-center gap-4 w-96 px-6 py-4 rounded-full border border-[#a3a3a3]">
          <Search className="w-7 h-7" color="#4c4c4c" />
          <input
            type="search"
            placeholder="Search jobs, employers, outlets, etc."
            className="w-full focus:outline-none text-[16px] leading-[20px] text-[#4c4c4c]"
          />
        </div>
      </div>

      <div className="flex items-center gap-8 relative">
        <Bell
          className="w-7 h-7 cursor-pointer"
          color="#000000"
          onClick={() => alert("Notifications feature coming soon!")}
        />
        <FaCaretLeft className="w-4 h-4" />

        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <div className="flex flex-col items-end">
            <h1 className="text-[30px] leading-[30px] text-[#000000] font-medium">Hi, Steve</h1>
            <p className="text-[14px] leading-[24px] text-[#4c4c4c] font-medium">Good Morning!</p>
          </div>
          <img src={image} alt="profile pic" className="w-16 h-16 bg-gray-200 rounded-full object-cover" />
        </div>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-20 right-0 bg-white border rounded-lg shadow-xl p-4 z-50 w-64 transition-opacity duration-300 ease-in-out"
            >
              <div className="flex flex-col items-center gap-2">
                <img
                  src={image}
                  alt="Enlarged Profile"
                  className="w-24 h-24 rounded-full object-cover border cursor-pointer"
                  onClick={() => fileInputRef.current.click()}
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
                <p className="text-lg font-semibold">Steve</p>
                <button className="text-sm text-blue-600" onClick={() => fileInputRef.current.click()}>
                  Change Photo
                </button>
              </div>
              <hr className="my-3" />
              <ul className="text-gray-700 text-sm">
                <li className="py-2 hover:text-blue-600 cursor-pointer">Settings</li>
                <li
                  className="py-2 hover:text-red-600 cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
