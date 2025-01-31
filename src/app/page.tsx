/* eslint-disable react/no-children-prop */
"use client";

import { AuthContext } from "@/providers/AuthProvider";
import { parseJwt } from "@/lib/parseJwt";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { OrganizationContext } from "@/providers/OrganizationProvider";
import { TodoList } from "./components/Todo";
import { redirect, usePathname, useRouter } from "next/navigation";
import CreateTodoDialog from "@/components/CreateTodoDialog";

export default function Home() {
  const { userInfo } = useContext(AuthContext);
  const [publicTodos, setPublicTodos] = useState<Todo[]>([]);
  const [personalTodos, setPersonalTodos] = useState<Todo[]>([]);
  const router = useRouter();
  const {  selectedOrganization, tenantServingURL } = useContext(OrganizationContext);
  const [createTodoDialog, setCreateTodoDialog] = React.useState(false);

  type Todo = {
    id: number;
    user_id: string;
    name: string;
    is_done: boolean;
    content: string;
  }

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          `${tenantServingURL}/todo`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")} `,
              "x-tenant-id": "e6a8e5db-326c-4ab6-a067-646f36927e29",
              "x-user-id": userInfo?.user_id ?? "",
            }
          }
        );
        const data = await response.json();
        console.log(localStorage.getItem("token"))
        setPublicTodos(data.data);
      } catch (error) {
        console.error("error fetching todos: ", error);
      }
    };

    fetchTodos();

  }, [selectedOrganization, createTodoDialog, userInfo?.user_id, tenantServingURL]);

  useEffect(() => {
    const fetchPersonalTodos = async () => {
      try {
        const response = await fetch(
          `${tenantServingURL}/todo?personal=1`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")} `,
              "x-tenant-id": "e6a8e5db-326c-4ab6-a067-646f36927e29",
              "x-user-id": userInfo?.user_id ?? "",
            }
          }
        );
        const data = await response.json();
        setPersonalTodos(data.data);
      } catch (error) {
        console.error("error fetching personal todos: ", error);
      }
    };

    fetchPersonalTodos();

  }, [selectedOrganization, createTodoDialog, userInfo?.user_id, tenantServingURL]);


  const [showNewOrgDialog, setShowNewOrgDialog] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!userInfo) {
    return (
      router.push('/login')
    );
  }


  if (tenantServingURL == "") {
    return <>
      <p className="font-normal">Organization does not have SaaS Todos</p>
    </>
  }



  return (
    <div>
      <div>
        <div>
          <CreateTodoDialog
            showDialog={createTodoDialog}
            setShowDialog={setCreateTodoDialog}
          >
          </CreateTodoDialog>

        </div>
        <p className="p-5 pb-0 font-bold">
          Personal Todos
        </p>
        <div className="p-5 grid grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.isArray(personalTodos) && personalTodos?.map((todo: Todo) => (
            <TodoList
              todo={todo}
              key={todo.id}
              aspectRatio="square"
              width={150}
              height={150}
              className=""
            />
          ))}
        </div>
      </div>
      <div>
        <p className="p-5 pb-0 font-bold">
          Public Todos
        </p>
        <div className="p-5 grid grid-cols-3 lg:grid-cols-4 gap-5 w-4/7">
          {Array.isArray(publicTodos) && publicTodos?.map((todo: Todo) => (
            <TodoList
              todo={todo}
              key={todo.id}
              aspectRatio="square"
              width={150}
              height={150}
              className=""
            />
          ))}
        </div>
      </div>
    </div >
  );
}

