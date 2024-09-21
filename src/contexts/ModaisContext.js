import { createContext, useReducer } from "react";
export const ModaisContext = createContext(false);

// Valor inicial dos estados dos modais
const initialState = {
  modalSearchProduct: false,
  modalSearchOrder: false,
  modalWeightProduct: false
}

// Função para alterar os estados dos modais
const modalReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_MODAL_SEARCH_PRODUCT':
      return { ...state, modalSearchProduct: true }
    case 'CLOSE_MODAL_SEARCH_PRODUCT':
      return { ...state, modalSearchProduct: false }

    case 'OPEN_MODAL_SEARCH_ORDER':
      return { ...state, modalSearchOrder: true }
    case 'CLOSE_MODAL_SEARCH_ORDER':
      return { ...state, modalSearchOrder: false }

    case 'OPEN_MODAL_WEIGHT_PRODUCT':
      return { ...state, modalWeightProduct: true }
    case 'CLOSE_MODAL_WEIGHT_PRODUCT':
      return { ...state, modalWeightProduct: false }

    default:
      return state;
  }
}

function ModaisProvider({ children }) {
  // useReducer para gerenciar os estados dos modais
  const [state, dispatch] = useReducer(modalReducer, initialState);


  // Funções para abrir ou fechar os modais
  const openModalSearchProduct = () => (dispatch({ type: 'OPEN_MODAL_SEARCH_PRODUCT' }));
  const closeModalSearchProduct = () => (dispatch({ type: 'CLOSE_MODAL_SEARCH_PRODUCT' }));

  const openModalSearchOrder = () => (dispatch({ type: 'OPEN_MODAL_SEARCH_ORDER' }));
  const closeModalSearchOrder = () => (dispatch({ type: 'CLOSE_MODAL_SEARCH_ORDER' }));

  const openModalWeightProduct = () => (dispatch({ type: 'OPEN_MODAL_WEIGHT_PRODUCT' }));
  const closeModalWeightProduct = () => (dispatch({ type: 'CLOSE_MODAL_WEIGHT_PRODUCT' }));

  return (
    <ModaisContext.Provider
      value={
        {
          state,
          openModalSearchProduct,
          closeModalSearchProduct,
          openModalSearchOrder,
          closeModalSearchOrder,
          openModalWeightProduct,
          closeModalWeightProduct
        }
      }
    >
      {children}
    </ModaisContext.Provider>
  )
}

export default ModaisProvider;