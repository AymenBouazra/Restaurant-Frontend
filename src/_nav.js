const navs = [
    {
        name: 'Users',
        children: [{
            to: '/admin/users',
            name: 'List users'
        },
        {
            to: '/admin/users/add',
            name: 'Add user'
        }]
    },
    {
        name: 'Food',
        children: [{
            to: '/admin/food',
            name: 'List food'
        },
        {
            to: '/admin/food/add',
            name: 'Add food'
        }]
    },
    {
        name: 'Category',
        children: [{
            to: '/admin/categories',
            name: 'Category List'
        },
        {
            to: '/admin/categories/add',
            name: 'Add category'
        },]
    },


]
export default navs