"use client"

import Image from "next/image";
import add from "../../public/buttonAdd.png";
import { useEffect, useState } from "react";
import { MyCard } from "@/components/card";
import { Modal } from "@/components/modal";
import { Input, Textarea } from "@mui/joy";
import { Button, Card, Link } from "@mui/material";
import CardContent from '@mui/material/CardContent';

interface IData {
  _id: string;
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
  const [id, setId] = useState<string>("");
  const [taskToEdit, setTaskToEdit] = useState<IData | null>(null);
  const [taskEdit, setTaskEdit] = useState<IData | null>();
  const [isLogin, setIsLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openModalEdit = (taskToEdit: IData) => {
    setTaskToEdit(taskToEdit);
    setTitle(taskToEdit.title);
    setId(taskToEdit._id);
    setDescription(taskToEdit.description);
    setIsModalEditOpen(true);
  };

  const closeModalEdit = () => setIsModalEditOpen(false);

  const addTask = async () => {
    console.log(`Título: ${title}\nDescrição: ${description}`);
    try {
      const newTask = {
        title: title,
        description: description,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const res = await fetch("http://localhost:8080/task/", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!res.ok)
        throw new Error (`Erro ao criar task: ${res.status} - ${res.statusText}`);

      const data = await res.json();
      setTask((prevTasks) => [...prevTasks, data]);
      closeModal();
    } catch (error) {
      console.error("Erro ao criar task: ", error);
    }
  };





  const editTask = async () => {
    console.log(`Título: ${title}\nDescrição: ${description}`);
  
    try {
      const res = await fetch(`http://localhost:8080/task/${id}`);
      if (!res.ok) {
        throw new Error(`Erro ao buscar dados: ${res.status}`);
      }
      const data: IData = await res.json();
      setTaskEdit(data);
  
      const newTask = {
        title: title,
        description: description,
        completed: data.completed,
        createdAt: data.createdAt,
        updatedAt: new Date(),
      };
  
      const updateRes = await fetch(`http://localhost:8080/task/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
  
      if (!updateRes.ok)
        throw new Error(`Erro ao criar task: ${updateRes.status} - ${await updateRes.text()}`);
  
      window.location.reload();
      closeModalEdit();
  
    } catch (error) {
      console.error("Erro ao editar task: ", error);
    }
  };
  




  const changeCheck = async (taskId: string) => {
    console.log(`Título: ${title}\nDescrição: ${description}`);
  
    try {
      const res = await fetch(`http://localhost:8080/task/${taskId}`);
      if (!res.ok) {
        throw new Error(`Erro ao buscar dados: ${res.status}`);
      }
      const data: IData = await res.json();
      setTaskEdit(data);
  
      const newTask = {
        title: data.title,
        description: data.description,
        completed: !data.completed,
        createdAt: data.createdAt,
        updatedAt: new Date(),
      };
  
      const updateRes = await fetch(`http://localhost:8080/task/${taskId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
  
      if (!updateRes.ok)
        throw new Error(`Erro ao criar task: ${updateRes.status} - ${await updateRes.text()}`);
  
      window.location.reload();
      closeModalEdit();
  
    } catch (error) {
      console.error("Erro ao editar task: ", error);
    }
  };
  
  




  const calculatePosition = (index: number) => {
    const cols = window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 4;
    const x = (index % cols) * 340;
    const y = Math.floor(index / cols) * 200;
    return { x, y };
  };



  const load = async () => {
    try {
      const res = await fetch("http://localhost:8080/task/");
      if (!res.ok) {
        throw new Error(`Erro ao buscar dados: ${res.status}`);
      }
      const data: IData[] = await res.json();
      setTask((prevTasks) => [...prevTasks, ...data]);
      console.log(data)
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

    useEffect(() => {
    load();
  }, []);





  return (isLogin) ? (
    <div className="h-screen w-screen flex md:p-5 p-2 relative md:flex-row flex-col">
      <button onClick={openModal} className="bg-slate-600 p-2 rounded-full flex items-center justify-center shadow-lg transition ease-in-out hover:scale-110 active:bg-slate-700 active:scale-100 aspect-square max-h-14 max-w-14">
        <Image src={add} className="w-10" alt="Adicionar" width={1000} height={1000} priority />
      </button>

      <div className="md:h-5/6 w-full relative md:m-10 my-3 items-center justify-center gap-3 flex-col flex">
        {task.map((taskItem, index) => {
          const { x, y } = calculatePosition(index);

          return (
            <MyCard 
              key={taskItem._id} 
              edit={() => openModalEdit(taskItem)}
              title={taskItem.title} 
              description={taskItem.description} 
              completed={taskItem.completed} 
              createdAt={new Date(taskItem.createdAt)} 
              updatedAt={new Date(taskItem.updatedAt)} 
              positionX={x}
              positionY={y}
              changeCheck={() => changeCheck(taskItem._id)}
              taskId={taskItem._id}
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
  ) : (
    <div className="flex items-center justify-center h-screen">
      <div className="flex bg-slate-50 w-96 items-center flex-col p-2 rounded shadow-lg gap-5">
        <h1 className="text-2xl font-bold">Login</h1>
        <div className="flex flex-col gap-1">
          <label className="text-slate-800 text-lg">Email</label>
          <Input onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email..." variant="soft" sx={{ backgroundColor: 'transparent', '--Input-radius': '0px', borderBottom: '2px solid', borderColor: 'neutral.outlinedBorder', '&:hover': { borderColor: 'neutral.outlinedHoverBorder', }, '&::before': { border: '1px solid var(--Input-focusedHighlight)', transform: 'scaleX(0)', left: 0, right: 0, bottom: '-2px', top: 'unset', transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)', borderRadius: 0, }, '&:focus-within::before': { transform: 'scaleX(1)', }, }} />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-slate-800 text-lg">Senha</label>
          <Input onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha..." variant="soft" sx={{ backgroundColor: 'transparent', '--Input-radius': '0px', borderBottom: '2px solid', borderColor: 'neutral.outlinedBorder', '&:hover': { borderColor: 'neutral.outlinedHoverBorder', }, '&::before': { border: '1px solid var(--Input-focusedHighlight)', transform: 'scaleX(0)', left: 0, right: 0, bottom: '-2px', top: 'unset', transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)', borderRadius: 0, }, '&:focus-within::before': { transform: 'scaleX(1)', }, }} />
          <Link href="#" underline="none" className="self-end mt-2">
          <h4 className="text-sm">Não tem uma conta?</h4>
          </Link>
        </div>

        <Button variant="outlined">Entrar</Button>
      </div>
    </div>
  );
}

