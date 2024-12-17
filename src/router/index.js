import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/crud-stock/Login.vue";
import HomeView from "@/views/HomeView.vue";
import AddProduct from "@/components/crud-stock/AddProduct.vue";
import GetProductsCategories from "@/components/crud-stock/GetProductsCategories.vue";
import App from "@/App.vue";
import GetProductsByCategory from "@/components/crud-stock/GetProductsByCategory.vue";
import LessQuantity from "@/components/crud-stock/LessQuantity.vue";
import DecrementHistory from "@/components/crud-stock/Decrement-History.vue";
import IncrementHistory from "@/components/crud-stock/Increment-History.vue";
import ModifyProduct from "@/components/crud-stock/ModifyProduct.vue";
import FileReader from "@/components/crud-stock/FileReader.vue";
import UpdateQuantity from "@/components/crud-stock/UpdateQuantity.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "https://www.xn--stock-gebrderzulfaj-fbc.com/ ",
      name: "login",
      component: Login,
    },
    {
      path: "https://www.xn--stock-gebrderzulfaj-fbc.com/home",
      name: "home",
      component: GetProductsCategories,
    },
    {
      path: "https://www.xn--stock-gebrderzulfaj-fbc.com/products",
      name: "Products",
      component: GetProductsByCategory,
    },
    {
      path: "https://www.xn--stock-gebrderzulfaj-fbc.com/less-quantity",
      name: "less-quantity",
      component: LessQuantity,
    },
    {
      path: "https://www.xn--stock-gebrderzulfaj-fbc.com/add",
      name: "add-product",
      component: AddProduct,
    },
    {
      path: "https://www.xn--stock-gebrderzulfaj-fbc.com/discount-history",
      name: "discount",
      component: DecrementHistory,
    },
    {
      path: "https://www.xn--stock-gebrderzulfaj-fbc.com/increment-history",
      name: "increment-history",
      component: IncrementHistory,
    },
    {
      path: "https://www.xn--stock-gebrderzulfaj-fbc.com/update/:id",
      name: "update",
      component: ModifyProduct,
    },
    {
      path: "https://www.xn--stock-gebrderzulfaj-fbc.com/file-reader",
      name: "file-reader",
      component: FileReader,
    },
    {
      path: "https://www.xn--stock-gebrderzulfaj-fbc.com/update-quantity",
      name: "update-quantity",
      component: UpdateQuantity,
    },
  ],
});

export default router;
