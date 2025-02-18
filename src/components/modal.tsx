"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import close from '../../public/close.png'

interface IModal {
  title: string;
  edit: () => void;
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  classExtra?: string;
}

export const Modal = ({ title, edit, isOpen, closeModal, children, classExtra }: IModal) => {
  useEffect(() => {
    // Adiciona um listener de tecla ESC para fechar o modal
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyPress);


    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [closeModal]);

  if (!isOpen) return null;

  return (
    <>
      <div className={`fixed top-0 left-0 w-full h-full  ${classExtra}`} onClick={closeModal}></div>
      <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 md:w-3/6 w-5/6 bg-white rounded-lg shadow-lg p-6 z-50" onClick={(e) => e.stopPropagation()} >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700" aria-label="Fechar" >
            <Image className="w-8 transition ease-in-out hover:scale-110 active:scale-100 active:opacity-70" src={close} alt="Fechar" width={1000} height={1000} priority/>
          </button>
        </div>
        <div className="mt-4 flex flex-col">
            {children}
        </div>
      </div>
    </>
  );
};
