/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type TCProvider = {
  handleFormSubmit: (data: any) => void;
  children: React.ReactNode;
};

const CProvider = ({ handleFormSubmit, children }: TCProvider) => {
  return <form onSubmit={handleFormSubmit}>{children}</form>;
};

export default CProvider;
