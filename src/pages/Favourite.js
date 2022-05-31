import Contact from "../components/Contact";

function Favourite({ contacts, deleteContact, favToggle }) {
  return (
    <>
      <div className="container my-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-5">
          {contacts.map((singleContact) => {
            return (
              <Contact
                key={singleContact.id}
                deleteContact={deleteContact}
                contact={singleContact}
                favToggle={favToggle}
              />
            );
          })};
          {contacts.filter(single=>single.fav).length===0 && <h1>No Favourite contacts to show</h1>}
        </div>
      </div>
    </>
  );
}

export default Favourite;
