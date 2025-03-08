import './App.css'
import Layout from "./layout.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import { Explore } from './pages/explore.tsx';
import {ApolloProvider} from "@apollo/client";
import client from "@/apollo.ts";
import {Profile} from "@/pages/profile";
import {NoteDetail} from "@/components/note-detail.tsx";
import {noteDetailStore} from "@/store/use-note-detail.ts";

function App() {
  const { id } = noteDetailStore();

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
        <NoteDetail id={id!} />
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
