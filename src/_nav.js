const navs = [
    {
        name:'Users-List',
        children:[{
            to: '/users',
            name:'List users'
        },
        {
            to: '/users/add',
            name:'Add user'
        }]
    },
    {
        name:'Product-List',
        children:[{
            to: '/products',
            name:'List product'
        },
        {
            to: '/products/add',
            name:'Add product'
        }]
    },
    {
        name:'Category-List',
        children:[{
            to: '/categories',
            name:'Category List'
        },
        {
            to: '/categories/add',
            name:'Add category'
        },]
    },
    

]
export default navs