import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import RatelimitedUI from "../components/RatelimitedUI.jsx";
import api from "../lib/axios.js";
import NoteCard from "../components/NoteCard.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";

const HomePage = () => {
  const [rateLimited, setRateLimited] = useState(true);
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNodes(res.data);
        setRateLimited(false);
      } catch (error) {
        console.log("error fetching the nodes");
        if (error.response.status === 429) {
          setRateLimited(true);
        } else {
          toast.error("failed to load nodes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar></Navbar>

      {rateLimited && <RatelimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6"></div>
      {loading && (
        <div className="text-center text-primary py-10">Loading Notes...</div>
      )}
      {nodes.length === 0 && !rateLimited && <NoteNotFound />}

      {nodes.length > 0 && !rateLimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nodes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNodes} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
