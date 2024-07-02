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
  const { selectedOrganization, organizations } = useContext(OrganizationContext);
  const { userInfo } = useContext(AuthContext);

  const [isDialogOpen, setisDialogOpen] = useState<boolean>(false);

  type Price = {
    id: string | null;
    price_value: number;
    recurrence: string | null;
  }

  type BillingPrice = {
    id: string | null;
    price: number;
    reccurence: string | null;
  }


  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch(`${process.env.NEXT_PUBLIC_BILLING_HOST}/api/v1/products/${app.id}`);
  //       const data = await response.json();

  //       let products: Product[] = []
  //       data.data.forEach((resProduct: BillingProductResponse) => {

  //         let prices: Price[] = []

  //         resProduct.price.forEach((resPrice: BillingPrice) => {
  //           let price: Price = {
  //             id: resPrice.id,
  //             price_value: resPrice.price,
  //             recurrence: resPrice.reccurence
  //           }

  //           prices.push(price);
  //         });

  //         let product: Product = {
  //           id: resProduct.id,
  //           app_id: resProduct.app_id,
  //           app: null,
  //           tier_name: resProduct.tier_name,
  //           prices: prices,
  //         }

  //         products.push(product)
  //       });

  //       setProducts(products);

  //     } catch (error) {
  //       console.error("error fetching products: ", error);
  //     }
  //   }

  //   if (isDialogOpen) fetchProducts();
  // }, [isDialogOpen]);

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
          <div className={cn("flex items-center space-x-4 h-50 hover:bg-gray-200 rounded-lg", className)} {...props}>
            <div className="space-x-4 overflow-hidden rounded-sm">

            </div>
            <div className="text-sm">
              <h3 className="font-medium leading-none">{todo.name}</h3>
            </div>
            {
              todo.is_done && <p>✅</p>
            }
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