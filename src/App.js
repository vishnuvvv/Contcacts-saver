import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Favourite from "./pages/Favourite";
import Nav from "./components/Nav";
import Notfound from "./pages/Notfound";
import { useEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const getContacts = async () => {
      const contactsFormServer = await fetchContacts();
      setContacts(contactsFormServer);
    };

    getContacts();
  }, []);

  const formSub = async (data) => {
    const res = await fetch("http://localhost:3004/contacts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newdata = await res.json();
    if (res.ok) {
      setContacts([...contacts, newdata]);
    }
  };
  const fetchContacts = async () => {
    const res = await fetch("http://localhost:3004/contacts");
    const data = await res.json();

    return data;
  };
  const deleteContact = async (id) => {
    const res = await fetch(`http://localhost:3004/contacts/${id}`, {
      method: "DELETE",
    });

    if(res.status ===200){

    let newContact = contacts.filter((singleContact) => {
      return singleContact.id !== id;
    });
    setContacts(newContact);
  }
  };

    // get single contact
    const getCon = async (id) => {
      const res = await fetch(`http://localhost:3004/contacts/${id}`);
      const data = await res.json();
  
      return data;
    };


    const favToggle = async (id) => {
      const singleCon = await getCon(id);
  
      const updTask = { ...singleCon, fav: !singleCon.fav };
  
      const res = await fetch(`http://localhost:3004/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updTask),
      });
      if (res.status ===200) {
        let updatedContact = contacts.map((singleContact) => {
          return singleContact.id === id
            ? { ...singleContact, fav: !singleContact.fav }
            : singleContact;
        });
        setContacts(updatedContact);
      }
    };
  return (
    <BrowserRouter>
      <div className="h1"></div>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              formSub={formSub}
              contacts={contacts}
              favToggle={favToggle}
              deleteContact={deleteContact}
            />
          }
        ></Route>
        <Route
          path="Favourite/"
          element={
            <Favourite
              contacts={contacts}
              favToggle={favToggle}
              deleteContact={deleteContact}
            />
          }
        ></Route>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
