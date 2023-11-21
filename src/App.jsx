import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from 'react';
import { ToastContainer } from "react-toastify";

import { Home } from './pages/home/home';
import { Selection } from './pages/selection/selection';
import { Layout } from './components/layout/layout';
import { Payment } from "./pages/payment/payment";
import { Confirm } from "./pages/confirm/confirm";
import { Reg } from "./pages/reg/reg";
import { Profile } from "./pages/profile/profile";
import { OrderPage } from "./pages/orderPage/orderPage";
import { Page404 } from "./pages/404/404";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <Layout>
          <Home/>
        </Layout>,
    },
    {
      path: "/selection",
      element:
      <Layout>
        <Selection />
      </Layout>,
    },
    {
      path: "/payment",
      element:
      <Layout>
        <Payment />
      </Layout>,
    },
    {
      path: "/confirm",
      element:
      <Layout>
        <Confirm />
      </Layout>,
    },
    {
      path: "/reg",
      element:
      <Layout>
        <Reg />
      </Layout>,
    },
    {
      path: "/profile",
      element:
      <Layout>
        <Profile />
      </Layout>
    },
    {
      path: "/order",
      element:
      <Layout>
        <OrderPage />
      </Layout>
    },
    {
      path: "*",
      element:
      <Layout>
        <Page404 />
      </Layout>
    }


  ])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer/>
    </>
  );
}

export default App;
