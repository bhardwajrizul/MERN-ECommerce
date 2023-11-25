import React, { useState } from "react";
import { FaCopy } from 'react-icons/fa';

const CopyToClipboard = ({ textToCopy, children }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div>
      {children}
      <button className="" onClick={handleCopyClick}>
        <FaCopy className="ms-2" />
      </button>
      {isCopied && <span style={{ color: "green" }}>Copied!</span>}
    </div>
  );
};

export default CopyToClipboard;
