"use client"

import { Rnd } from 'react-rnd';
import React, { useEffect } from 'react';
import Image from "next/image";

import editButton from "../../public/buttonEdit.png";
import checked from "../../public/checked.png";
import unchecked from "../../public/unchecked.png";


interface ICard {
    title: string,
    description: string,
    completed: boolean,
    createdAt: Date,
    updatedAt: Date,
    edit: () => void;
    positionX: number;
    positionY: number;
    changeCheck: (taskId: number) => void;
    taskId: number
}

export const Card = ({ title, description, completed, createdAt, updatedAt, edit, positionX, positionY, changeCheck, taskId }: ICard) => {

    const handleEditClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        edit();
    };

    const calculateScreen = () => {
        if (window.innerWidth < 800)
            return false;
        else
            return true;
    }


    useEffect(() => {
        calculateScreen();
        window.addEventListener("resize", calculateScreen);
    
        return () => {
          window.removeEventListener("resize", calculateScreen);
        };
      }, []);

    return calculateScreen() ? (
        <Rnd default={{ x: positionX, y: positionY, width: 320, height: 'auto', }} style={{cursor: 'default'}}>
            <div className="rounded-xl p-3 md:w-80 w-64 object-cover flex flex-col items-center justify-between bg-gray-800 shadow-xl">
                <div className='flex items-start justify-between w-full'>
                    <h1 className="font-bold text-2xl mb-2">{title}</h1>
                    <button onClick={handleEditClick} className='transition ease-in-out hover:scale-110 active:scale-100 active:opacity-70'>
                        <Image src={editButton} className="w-8" alt="Editar" width={1000} height={1000} priority></Image>
                    </button>
                </div>
                <h2 className="text-lg">{description}</h2>
                <div className="flex justify-between w-full flex-col my-2">
                    <button 
                        onClick={() => changeCheck(taskId)} 
                        className="transition ease-in-out hover:scale-110 active:scale-100 active:opacity-70 self-end"
                        >
                        <Image 
                            src={completed ? checked : unchecked} 
                            className="w-7" 
                            alt={completed ? "Checked" : "Unchecked"} 
                            width={1000} 
                            height={1000} 
                            priority 
                        />
                    </button>


                    <div>
                        <h2 className="text-sm text-slate-400">
                            Criado em: {createdAt.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).replace(',', ' -')}
                        </h2>
                        <h2 className="text-sm text-slate-400">
                            Última modificação: {updatedAt.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).replace(',', ' -')}
                        </h2>
                    </div>
                </div>
            </div>
        </Rnd>
    ) : (
        <div className="rounded-xl p-3 md:w-80 w-72 object-cover flex flex-col items-center justify-between bg-gray-800 shadow-xl">
            <div className='flex items-start justify-between w-full'>
                <h1 className="font-bold text-2xl mb-2">{title}</h1>
                <button onClick={handleEditClick} className='transition ease-in-out hover:scale-110 active:scale-100 active:opacity-70'>
                    <Image src={editButton} className="w-8" alt="Editar" width={1000} height={1000} priority></Image>
                </button>
            </div>
            <h2 className="text-lg">{description}</h2>
            <div className="flex justify-between w-full flex-col my-2">
                <button 
                    onClick={() => changeCheck(taskId)} 
                    className="transition ease-in-out hover:scale-110 active:scale-100 active:opacity-70 self-end"
                    >
                    <Image 
                        src={completed ? checked : unchecked} 
                        className="w-7" 
                        alt={completed ? "Checked" : "Unchecked"} 
                        width={1000} 
                        height={1000} 
                        priority 
                    />
                </button>
                <div>
                    <h2 className="text-sm text-slate-400">
                        Criado em: {createdAt.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).replace(',', ' -')}
                    </h2>
                    <h2 className="text-sm text-slate-400">
                        Última modificação: {updatedAt.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).replace(',', ' -')}
                    </h2>
                </div>
            </div>
        </div>
    );
};