import './App.css'
import Layout from "./layout.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import { Explore } from './pages/explore.tsx';
import {ApolloProvider} from "@apollo/client";
import client from "@/apollo.ts";
import {Profile} from "@/pages/profile";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="explore" />} />
            <Route path="explore" element={<Explore />} />
            <Route path="profile/:id" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
