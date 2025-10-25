import React, { useState } from "react";
import AddContributionModal from "../components/AddContributionModal";

const ContributionsPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Contributions</h1>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded-md"
        onClick={() => setShowModal(true)}
      >
        Add Contribution
      </button>

      {showModal && (
        <AddContributionModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ContributionsPage;
