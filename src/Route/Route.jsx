import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout/RootLayout";
import AllScholarships from "../Pages/All-Scholarships/AllScholarships";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import PrivateRoute from "./PrivateRoute";
import ScholarshipDetails from "../Pages/ScholarshipDetails/ScholarshipDetails";
import Dashboard from "../Layout/Dashboard/Dashboard";
import PaymentSuccess from "../Pages/payment/paymentSuccess";
import paymentCancelled from "../Pages/payment/paymentCancelled";
import Payments from "../Pages/payment/Payments";
import PaymentHistory from "../Pages/payment/paymentHistory";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import MyApplications from "../Pages/Dashboard/MyApplications/MyApplications";
import MyReviews from "../Pages/Dashboard/MyReviews/MyReviews";





export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true, Component: Home
      },
      {
        path: 'all-scholarships',
        Component: AllScholarships
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'scholarships/:id',
        element: <PrivateRoute><ScholarshipDetails></ScholarshipDetails></PrivateRoute>
      },
      
    ]
  },
  {
    path: 'dashboard',
    Component: Dashboard,
    children: [
      {
       index:true,
        Component:MyProfile
      },
      {
        path:'my-profile',
        Component:MyProfile
      },
      {
        path: 'payments',
        Component: Payments
      },

      {
        path: 'payment-history',
        Component: PaymentHistory
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: paymentCancelled
      },
      {
        path:'my-applications',
        Component:MyApplications
      },
      {
        path:'my-reviews',
        Component:MyReviews
      }


    ]
  }

])