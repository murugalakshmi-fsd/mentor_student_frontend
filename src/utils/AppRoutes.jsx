import React from 'react'
import TopBar from '../common/TopBar'
import Dashboard from '../page/Dashboard'
import Mentor from '../page/mentor/Mentor'
import Student from '../page/student/Student'
import Allstudent from '../page/student/Allstudent'
import Studentlist from '../page/student/Studentlist'
import Edit from '../common/Edit'
import Studentedit from '../page/student/Studentedit'
import { Navigate } from 'react-router-dom'

const AppRoutes = [
    {
        path:"/",
        exact:true,
        element:<><TopBar/><Dashboard/></>
    },
    {
        path:"/mentor",
        exact:true,
        element:<><TopBar/><Mentor/></>
    },
    {
        path:"/student",
        exact:true,
        element:<><TopBar/><Student/></>
    },
    {
        path:"/all-student",
        exact:true,
        element:<><TopBar/><Allstudent/></>
    },
    {
        path:"/student-list/:id",
        exact:true,
        element:<><TopBar/><Studentlist/></>
    },
    {
        path:"/edit/:id",
        exact:true,
        element:<><Edit/></>
    },
    {
        path:"/student-edit/:id",
        exact:true,
        element:<><Studentedit/></>
    },
    {
        path:"/*",
        exact:true,
        element:<Navigate to="/"/>
    }
]

export default AppRoutes