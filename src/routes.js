import {lazy} from "react"
const Home = lazy(() => import('./components/Home'))
const CreateProduct = lazy(()=> import('./components/Pages/Product/CreateProduct'))
const ListProduct = lazy(()=> import('./components/Pages/Product/ListProduct'))
const ListCategory = lazy(()=> import('./components/Pages/Category/ListCategory'))
const CreateCategory = lazy(()=> import('./components/Pages/Category/CreateCategory'))
const routes = [
    {
        path: '/',
        element: Home,
        name:'Home',
        exact: true
    },
    {
        path: '/products/add',
        element: CreateProduct,
        name:'Create-product',
        exact: true
    },
    {
        path: '/products',
        element: ListProduct,
        name:'Products',
        exact: true
    },
    {
        path: '/categories/add',
        element: CreateCategory,
        name:'Categories',
        exact: true
    },
    {
        path: '/categories',
        element: ListCategory,
        name:'Home',
        exact: true
    },

]

export default routes