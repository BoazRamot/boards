import React from "react";

interface IProps {}

const Fav: React.FC<IProps> = () => {
  return (
    <div
      className="border shadow bg-light p-2"
      style={{ height: "100vh" }}
    >
      <h4 className="mt-2 text-info">מיקומים מועדפים</h4>
    </div>
  );
};

export default Fav;
