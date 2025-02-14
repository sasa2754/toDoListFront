"use client"

import Image from "next/image";
import edit from "../../public/buttonEdit.png";
import add from "../../public/buttonAdd.png";
import { useEffect, useState, Suspense } from "react";

interface IData {
  id: number,
  title: string,
  description: string,
  completed: boolean
  createdAt: string,
  updatedAt: string 
}

export default function Home() {
  const [task, setTask] = useState<IData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:8080/task/");
        if (!res.ok) {
          throw new Error(`Erro ao buscar dados: ${res.status}`);
        }
        const data: IData[] = await res.json();
        setTask(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="h-screen w-screen flex md:p-5 p-2">
      <div>
        <button className="bg-slate-600 p-2 rounded-full flex items-center justify-center shadow-lg transition ease-in-out hover:scale-110 active:bg-slate-700 active:scale-100">
          <Image src={add} className="w-10" alt="Editar" width={1000} height={1000} priority></Image>
        </button>
      </div>

      <div className="h-5/6 w-5/6 md:p-2 p-1">
        
      </div>
    </div>
  );
}
