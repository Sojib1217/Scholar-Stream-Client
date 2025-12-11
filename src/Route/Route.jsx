import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout/RootLayout";
import AllScholarships from "../Pages/All-Scholarships/AllScholarships";
import Home from "../Pages/Home/Home/Home";


export const router=createBrowserRouter([
{
  path:'/',
  Component:RootLayout,
  children:[
    {
        index:true, Component:Home
    },
    {
        path:'all-scholarships',
        Component:AllScholarships
    }
  ]
}
])