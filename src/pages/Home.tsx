// src/pages/HomePage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeModal from "../components/WelcomeModal";

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <WelcomeModal
      isOpen={isModalOpen}
      onClose={closeModal}
      grandPrizeHandler={() => navigate("/grandprize")}
      doorPrizeHandler={() => navigate("/doorprize")}
      imageUrl="images/undian_finnet18.png"
    />
  );
};

export default HomePage;
