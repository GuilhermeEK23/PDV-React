import "./Pdv.css";
import ArtItens from "../components/artItems/ArtItens.js";
import ArtEmpresa from "../components/artProduct/ArtEmpresa.js";
import ArtTotal from "../components/artTotal/ArtTotal.js";
import SearchProducts from "../components/modais/searchProducts/ModalSearchProducts.js";
import SearchOrder from "../components/modais/searchOrder/ModalSearchOrder.js";
import GetOrder from "../services/GetOrder.js";
import PutOrders from "../services/PutOrders.js";
import { useContext, useEffect } from "react";
import { ModaisContext } from "../contexts/ModaisContext.js";
import { CartContext } from "../contexts/CartContext.js";
import { OrderContext } from "../contexts/OrderContext.js";

function Pdv() {
  const { cartProducts } = useContext(CartContext);
  const { numberOrder } = useContext(OrderContext);
  const {
    state,
    openModalSearchProduct,
    closeModalSearchProduct,
    openModalSearchOrder,
    closeModalSearchOrder,
    openModalWeightProduct,
    closeModalWeightProduct,
  } = useContext(ModaisContext);

  const keysOpenModalSearchProduct = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9", // Números
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z", // Letras minúsculas
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z", // Letras maiúsculas
  ];

  // useEffect para adicionar a escuta de keydown na tela
  useEffect(() => {
    const handleKeyDown = (event) => {
      const isAnyModalOpen =
        state.modalSearchOrder ||
        state.modalSearchProduct ||
        state.modalWeightProduct;

      if (keysOpenModalSearchProduct.includes(event.key) && !isAnyModalOpen) {
        openModalSearchProduct();
      } else if (event.key === "F4" && !isAnyModalOpen) {
        openModalSearchOrder();
      } else if (event.key === "Escape") {
        if (state.modalSearchProduct && !state.modalWeightProduct) {
          closeModalSearchProduct();
        } else if (state.modalSearchOrder) {
          closeModalSearchOrder();
        } else if (state.modalWeightProduct) {
          closeModalWeightProduct();
        }
      } else if (
        event.key === "Enter" &&
        cartProducts.length > 0 &&
        numberOrder !== undefined &&
        !isAnyModalOpen
      ) {
        console.log("pode chamar o releaseOrder");
        releaseOrder();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    state,
    keysOpenModalSearchProduct,
    openModalSearchProduct,
    closeModalSearchProduct,
    openModalSearchOrder,
    closeModalSearchOrder,
    openModalWeightProduct,
    closeModalWeightProduct,
    cartProducts.length,
    numberOrder,
  ]);

  const releaseOrder = async () => {
    if (numberOrder === undefined || cartProducts.length === 0) {
      return;
    }
    try {
      const number = await GetOrder(numberOrder);

      await PutOrders(cartProducts, number[0].Code);
      window.location.reload();
    } catch (error) {
      alert("Erro de conexão com o servidor");
    }
  };

  return (
    <>
      <section className="widget-grid">
        <ArtItens releaseOrder={releaseOrder} />
        <ArtEmpresa />
        <ArtTotal />
      </section>
      <SearchProducts />
      <SearchOrder />
    </>
  );
}

export default Pdv;
