import Image from "next/image"
import { PlusCircledIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useContext, useEffect, useState } from "react"
import { OrganizationContext } from "@/providers/OrganizationProvider";
import { AuthContext } from "@/providers/AuthProvider"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { toast } from "sonner"
interface Todo {
  id: number;
  name: string;
  content: string;
  is_done: boolean;
}

interface AppProps extends React.HTMLAttributes<HTMLDivElement> {
  todo: Todo
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function TodoList({
  todo,
  aspectRatio = "square",
  width,
  height,
  className,
  ...props
}: AppProps) {
  const { selectedOrganization, organizations, tenantServingURL } = useContext(OrganizationContext);
  const { userInfo } = useContext(AuthContext);

  const [isDialogOpen, setisDialogOpen] = useState<boolean>(false);

  const handleChange = (open: boolean) => {
    setisDialogOpen(open)
  }

  const handleSubmit = () => {
  }

  type TenantData = {
    tenant_id: string;
    org_id: string;
    tenant_name: string;
  }

  return (
    <>
      <Dialog onOpenChange={handleChange} open={isDialogOpen}>
        <DialogTrigger asChild>
          <div className={cn("flex flex-col space-y-2 p-4 hover:bg-gray-200 rounded-lg", className)} {...props}>
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-lg">{todo.name}</h3>
              {todo.is_done && <div className="text-xl">✅</div>}
            </div>
            <hr className="border-t border-gray-300 my-2" />
            <div className="text-sm text-justify whitespace-pre-line">
              {todo.content}
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <div className="flex items-center">
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center justify-between">
                  <div>
                    <p>{todo.name}</p>
                    <DialogDescription>
                      Update {todo.name}
                    </DialogDescription>
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>
            {/* {selectedProduct && (
              <div className="ml-auto text-lg font-semibold">
                <p>${selectedProduct.price.price_value}</p>
              </div>
            )} */}
          </div>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <p>{todo.content}</p>
                {/* <Label htmlFor="tier" className="pb-2">Tiers</Label>
                <Select onValueChange={(value) => {
                  const product = products.find(p => p.id === value);
                  setSelectedProduct(product ?? null);
                  console.log(product);
                }}>
                  <SelectTrigger id="tier">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {products.map((product: Product) => (
                      <SelectItem key={product.id} value={product.id}>{product.tier_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
              </div>

            </div>
          </form>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSubmit}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}