import productsMutations from "./mutations";
import productsActions from "./actions";
import productsGetters from "./getters";
export default {
  namespaced: true,
  state() {
    return {
      products: {
        data: [],
      },
      // product: [],
      loading: true,
      dataSuccess: true,
    };
  },
  getters: productsGetters,
  mutations: productsMutations,
  actions: productsActions,
};
