import Contact from "../components/Contact";
import Form from "../components/Form";

function Home({ formSub, contacts, deleteContact, favToggle }) {
  console.log(Contact)
  return (
    <div className="container my-5">
      <div className="row justify-content-sm-center my-5">
        <Form formSub={formSub} />
      </div>
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
        })}
        {contacts.length ===0 &&<div>No contacts to show</div>}
    </div>
    </div>
  );
}

export default Home;
