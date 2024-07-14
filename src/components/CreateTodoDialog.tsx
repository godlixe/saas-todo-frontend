'use client'

import { AuthContext } from "@/providers/AuthProvider";
import React, { useContext, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { OrganizationContext } from "@/providers/OrganizationProvider";

interface Props {
    showDialog: boolean;
    setShowDialog: (show: boolean) => void;
    children?: React.ReactNode;
}

const CreateTodoDialog: React.FC<Props> = ({
    showDialog,
    setShowDialog,
    children,
}) => {
    const { userInfo } = useContext(AuthContext);
    const [todoName, setTodoName] = useState('')
    const [todoContent, setTodoContent] = useState('')
    const { tenantServingURL } = useContext(OrganizationContext);

    const handleConfirm = async () => {
        const todo = {
            name: todoName,
            is_done: false,
            content: todoContent,
        };

        try {
            const response = await fetch(`${tenantServingURL}/todo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")} `,
                    "x-tenant-id": "e6a8e5db-326c-4ab6-a067-646f36927e29",
                    "x-user-id": userInfo?.user_id ?? "",
                },
                body: JSON.stringify(todo),
            });

            if (response.ok) {
                toast.success("Successfully created Todo", {
                    description: ""
                })
                setShowDialog(false); // Close the dialog on success
            } else {
                toast.error("Failed to create Todo", {
                    description: ""
                })
                // Handle error response
                console.error('Failed to create todo');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Dialog onOpenChange={setShowDialog} open={showDialog} >
            <DialogTrigger asChild>
                <div className="p-5 pb-0 font-bold">
                    <Button>Create New Todo</Button>
                </div>
            </DialogTrigger>
            <DialogContent>
                <div className="flex items-center">
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p>Create New Todo</p>
                                    <DialogDescription>
                                        Fill out the form below:
                                    </DialogDescription>
                                </div>
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                </div>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="space-y-2">
                            <Label>Name</Label>
                            <Input
                                placeholder="Your todo name"
                                value={todoName}
                                onChange={(e) => setTodoName(e.target.value)}
                            >
                            </Input>
                        </div>

                        <div className="space-y-2">
                            <Label>Content</Label>
                            <Textarea
                                placeholder="Your todo content"
                                value={todoContent}
                                onChange={(e) => setTodoContent(e.target.value)}
                            >seTodoContent
                            </Textarea>
                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};

export default CreateTodoDialog;