import Card from "@/components/Cart/Card";
import Layout from "@/components/Layout/Layout";
import { EStateGeneric } from "@/shared/types";
import { selectAllCartStatus, selectAllCart, getCartUser } from "@/states/cart/cartSlice";
import { useAppDispatch } from "@/states/store";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {}

const Cart = (props: Props) => {
  const { data: session } = useSession()
  const dispatch = useAppDispatch();
  const cartStatus = useSelector(selectAllCartStatus);
  const cart = useSelector(selectAllCart);
  useEffect(() => {
    (async () => {
      if (cartStatus === EStateGeneric.IDLE) {
        if (session) dispatch(getCartUser(session.user.id))
      }
    })();
  }, [session, dispatch, cartStatus]);
  return (
    <Layout>
      {session &&
        <div className="p-10 max-w-screen-2xl">
          {cartStatus === EStateGeneric.SUCCEEDED &&
            <div className="flex gap-4">
              <div className="flex-1 bg-white">
                <h2 className="text-2xl font-bold p-4">Carrito de Compras</h2>
                <hr />
                <div className="flex-1 flex flex-col">
                  {cart.products.map((product, index) => <Card key={index} session={session} {...product} />)}
                </div>
              </div>
              <div className="md:w-1/4 relative">
                <div className="flex flex-col gap-y-8 sticky top-12">
                  <div className="bg-white p-6">
                    <div className="grid grid-cols-1 gap-y-6">
                      <Link href="/checkout">
                        <Link href="/checkout">Go to checkout</Link>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      }
      {!session &&
        <div className="p-10 flex justify-center items-center max-w-screen-2xl">
          <div className="">
            <h2 className="text-2xl font-bold">Carrito de Compras</h2>
            <p className="text-lg text-gray-600 mb-4">Inicia sesión para ver y completar tu carrito de compras.</p>
            <button className="bg-blue-950 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded shadow" onClick={() => signIn()}>Iniciar sesión</button>
          </div>
        </div>
      }
    </Layout>
  )

}

export default Cart;
