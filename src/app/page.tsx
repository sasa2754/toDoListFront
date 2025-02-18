// "use client"

// import Image from "next/image";
// import edit from "../../public/buttonEdit.png";
// import add from "../../public/buttonAdd.png";
// import { useEffect, useState } from "react";
// import { Card } from "@/components/card";

// interface IData {
//   id: number;
//   title: string;
//   description: string;
//   completed: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// export default function Home() {
//   const [task, setTask] = useState<IData[]>([]);

//   const edit = () => {
//     alert("Foi");
//   };

// const calculatePosition = (index: number) => {
//   // Definindo as colunas e linhas para os cards com base no índice e tamanho da tela
//   const cols = window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 4; // 2, 3 ou 4 colunas dependendo da largura da tela
//   const x = (index % cols) * 340;  // Posição X (220px para cada card, ajustável)
//   const y = Math.floor(index / cols) * 200;  // Posição Y (260px para cada card, ajustável)
//   return { x, y };
// };

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await fetch("http://localhost:8080/task/");  // Ajuste para buscar as tarefas do backend
//         if (!res.ok) {
//           throw new Error(`Erro ao buscar dados: ${res.status}`);
//         }
//         const data: IData[] = await res.json();
//         setTask(data);
//       } catch (error) {
//         console.error("Erro ao buscar dados:", error);
//       }
//     };
//     load();
//   }, []);

//   return (
//     <div className="h-screen w-screen flex md:p-5 p-2 relative">
//       <div>
//         <button className="bg-slate-600 p-2 rounded-full flex items-center justify-center shadow-lg transition ease-in-out hover:scale-110 active:bg-slate-700 active:scale-100">
//           <Image src={add} className="w-10" alt="Adicionar" width={1000} height={1000} priority />
//         </button>
//       </div>

//       <div className="h-5/6 w-full relative">
//         {task.map((taskItem, index) => {
//           const { x, y } = calculatePosition(index); // Calculando a posição

//           return (
//             <Card 
//               key={taskItem.id} 
//               edit={() => edit()} 
//               title={taskItem.title} 
//               description={taskItem.description} 
//               completed={taskItem.completed} 
//               createdAt={new Date(taskItem.createdAt)} 
//               updatedAt={new Date(taskItem.updatedAt)} 
//               positionX={x} // Posição calculada
//               positionY={y} // Posição calculada
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }


"use client"

import Image from "next/image";
import add from "../../public/buttonAdd.png";
import { useEffect, useState } from "react";
import { Card } from "@/components/card";
import { Modal } from "@/components/modal";
import { Input, Textarea } from "@mui/joy";
import { Button } from "@mui/material";

interface IData {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [task, setTask] = useState<IData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [taskToEdit, setTaskToEdit] = useState<IData | null>(null); // Novo estado para tarefa a ser editada

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openModalEdit = (taskToEdit: IData) => {
    setTaskToEdit(taskToEdit); // Define a tarefa que será editada
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
    setIsModalEditOpen(true);
  };
  const closeModalEdit = () => setIsModalEditOpen(false);

  const addTask = () => {
    console.log(`Título: ${title}\nDescrição: ${description}`);
    closeModal();
  };

  const editTask = () => {
    console.log(`Título: ${title}\nDescrição: ${description}`);
    closeModalEdit();
  };

  const changeCheck = (taskId: number) => {
    setTask((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const calculatePosition = (index: number) => {
    const cols = window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 4;
    const x = (index % cols) * 340;
    const y = Math.floor(index / cols) * 200;
    return { x, y };
  };

  useEffect(() => {
    const loadFakeData = () => {
      const fakeData: IData[] = [
        { id: 1, title: "Tarefa 1", description: "Descrição da tarefa 1", completed: false, createdAt: "2025-02-17T10:00:00", updatedAt: "2025-02-17T10:00:00" },
        { id: 2, title: "Tarefa 2", description: "Descrição da tarefa 2 ", completed: true, createdAt: "2025-02-17T10:00:00", updatedAt: "2025-02-17T10:00:00" },
        { id: 3, title: "Tarefa 3", description: "Descrição da tarefa 3", completed: false, createdAt: "2025-02-17T10:00:00", updatedAt: "2025-02-17T10:00:00" },
        { id: 4, title: "Tarefa 4", description: "Descrição da tarefa 4", completed: false, createdAt: "2025-02-17T10:00:00", updatedAt: "2025-02-17T10:00:00" },
        { id: 5, title: "Tarefa 5", description: "Descrição da tarefa 5", completed: true, createdAt: "2025-02-17T10:00:00", updatedAt: "2025-02-17T10:00:00" },
        { id: 6, title: "Tarefa 6", description: "Descrição da tarefa 6", completed: false, createdAt: "2025-02-17T10:00:00", updatedAt: "2025-02-17T10:00:00" },
      ];
      setTask(fakeData);
    };
    loadFakeData();
  }, []);

  return (
    <div className="h-screen w-screen flex md:p-5 p-2 relative md:flex-row flex-col">
      <button onClick={openModal} className="bg-slate-600 p-2 rounded-full flex items-center justify-center shadow-lg transition ease-in-out hover:scale-110 active:bg-slate-700 active:scale-100 aspect-square max-h-14 max-w-14">
        <Image src={add} className="w-10" alt="Adicionar" width={1000} height={1000} priority />
      </button>

      <div className="md:h-5/6 w-full relative md:m-10 my-3 items-center justify-center gap-3 flex-col flex">
        {task.map((taskItem, index) => {
          const { x, y } = calculatePosition(index);

          return (
            <Card 
              key={taskItem.id} 
              edit={() => openModalEdit(taskItem)}
              title={taskItem.title} 
              description={taskItem.description} 
              completed={taskItem.completed} 
              createdAt={new Date(taskItem.createdAt)} 
              updatedAt={new Date(taskItem.updatedAt)} 
              positionX={x}
              positionY={y}
              changeCheck={() => changeCheck(taskItem.id)}
              taskId={taskItem.id}
            />
          );
        })}
      </div>

      {/* Modal editar task */}
      {taskToEdit && (
        <Modal classExtra="bg-black opacity-60" title="Editar Task" edit={addTask} isOpen={isModalEditOpen} closeModal={closeModalEdit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-slate-800 text-lg">Título</label>
              <Input onChange={(e) => setTitle(e.target.value)} value={title} variant="soft" sx={{ backgroundColor: 'transparent', '--Input-radius': '0px', borderBottom: '2px solid', borderColor: 'neutral.outlinedBorder', '&:hover': { borderColor: 'neutral.outlinedHoverBorder', }, '&::before': { border: '1px solid var(--Input-focusedHighlight)', transform: 'scaleX(0)', left: 0, right: 0, bottom: '-2px', top: 'unset', transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)', borderRadius: 0, }, '&:focus-within::before': { transform: 'scaleX(1)', }, }} />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-slate-800 text-lg">Descrição</label>
              <Textarea onChange={(e) => setDescription(e.target.value)} value={description} minRows={3} placeholder="Digite aqui..." variant="soft" sx={{ backgroundColor: 'transparent', borderBottom: '2px solid black', borderColor: 'neutral.outlinedBorder', borderRadius: 0, '&:hover': { borderColor: 'neutral.outlinedHoverBorder', }, '&::before': { border: '1px solid var(--Textarea-focusedHighlight)', transform: 'scaleX(0)', left: 0, right: 0, bottom: '-2px', top: 'unset', transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)', borderRadius: 0, }, '&:focus-within::before': { transform: 'scaleX(1)', }, }} />
            </div>

            <div className="self-end flex gap-2">
              <Button onClick={closeModalEdit} sx={{ backgroundColor: 'white', color: 'grey' }} variant="outlined">Cancelar</Button>
              <Button onClick={editTask} sx={{ backgroundColor: 'grey', color: 'white' }} variant="outlined">Salvar</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal adicionar task */}
      <Modal classExtra="bg-black opacity-60" title="Adicionar nova Task" edit={addTask} isOpen={isModalOpen} closeModal={closeModal}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-slate-800 text-lg">Título</label>
            <Input onChange={(e) => setTitle(e.target.value)} placeholder="Digite o título..." variant="soft" sx={{ backgroundColor: 'transparent', '--Input-radius': '0px', borderBottom: '2px solid', borderColor: 'neutral.outlinedBorder', '&:hover': { borderColor: 'neutral.outlinedHoverBorder', }, '&::before': { border: '1px solid var(--Input-focusedHighlight)', transform: 'scaleX(0)', left: 0, right: 0, bottom: '-2px', top: 'unset', transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)', borderRadius: 0, }, '&:focus-within::before': { transform: 'scaleX(1)', }, }} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-slate-800 text-lg">Descrição</label>
            <Textarea onChange={(e) => setDescription(e.target.value)} minRows={3} placeholder="Digite aqui..." variant="soft" sx={{ backgroundColor: 'transparent', borderBottom: '2px solid black', borderColor: 'neutral.outlinedBorder', borderRadius: 0, '&:hover': { borderColor: 'neutral.outlinedHoverBorder', }, '&::before': { border: '1px solid var(--Textarea-focusedHighlight)', transform: 'scaleX(0)', left: 0, right: 0, bottom: '-2px', top: 'unset', transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)', borderRadius: 0, }, '&:focus-within::before': { transform: 'scaleX(1)', }, }} />
          </div>

          <div className="self-end flex gap-2">
            <Button onClick={closeModal} sx={{ backgroundColor: 'white', color: 'grey', borderColor: 'grey', '&:hover': { borderColor: 'darkgrey', }, }} variant="outlined">Cancelar</Button>
            <Button onClick={addTask} sx={{ backgroundColor: 'grey', color: 'white', borderColor: 'grey', '&:hover': { borderColor: 'darkgrey', }, }} variant="outlined">Adicionar</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}

