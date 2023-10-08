import React, { useEffect, useState } from 'react';
import './home.css';
import ContactAppCard from '../contactappcard/contactappcard';

export default function Home() {

    const [contacts, setContacts] = useState(
        [
            {
                name: 'abc',
                mobile: '70***25354',
                email: 'abc@gmail.com'
            },
            {
                name: 'pqr',
                mobile: '75467535***',
                email: 'pqr@gmail.com'
            },
            {
                name: 'frd',
                mobile: '7089***024',
                email: 'frd@gmail.com'
            },
        ]
    );


    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [editIndex, setEditIndex] = useState('-1');
    const [isEditMode, setIsEditMode] = useState(false);


    const addContact = () => {

        if (!name) {
            alert('Name is required');
            return;
        };

        if (!mobile) {
            alert('mobile number is required');
            return;
        };

        if (!email) {
            alert('email is required');
            return;
        };

        const obj = {
            name: name,
            mobile: mobile,
            email: email
        }
        const newContacts = [...contacts, obj];
        setContacts(newContacts);
        saveToLocalStorage(newContacts);
        alert('Contact Saved successfully');

        setName('');
        setMobile('');
        setEmail('');
    };

    const deleteContact = (mobileNumber) => {
        let indexToDel = -1;

        contacts.forEach((contactDetail, index) => {
            if (contactDetail.mobile == mobileNumber) {
                indexToDel = index;
            }
        })
        contacts.splice(indexToDel, 1);
        setContacts([...contacts])
        saveToLocalStorage([...contacts]);

        alert('contact deleted successfully');
    }

    const saveToLocalStorage = (contactsData) => {
        localStorage.setItem('contacts', JSON.stringify(contactsData));
    }

    const loadFromLocalStorage = () => {
        const contactsData = JSON.parse(localStorage.getItem('contacts'));

        if (contactsData) {
            setContacts(contactsData);
        }
    }

    useEffect(() => {
        loadFromLocalStorage();
    }, [])

    const enableEditMode = (index) => {
        const contactsData = contacts[index];
        setName(contactsData.name);
        setMobile(contactsData.mobile);
        setEmail(contactsData.email);
        setEditIndex(index);
        setIsEditMode(true);
    }

    const editContact = () => {
        const obj = {
            name : name,
            email : email,
            mobile: mobile
        }
        contacts[editIndex] = obj;
        setContacts([...contacts]);

        saveToLocalStorage(contacts);

        alert('contacts edited successfully');

        setName('');
        setMobile('');
        setEmail('');

        setIsEditMode(false);
    }

    return (
        <div>
            <h1 className="home-title">☎️ Contact App</h1>
            <div className='container'>
                <div className='contactscontainer'>
                    <h2 className="subheading">Show Contacts</h2>
                    {
                        contacts.map((contacts, index) => {
                            return <ContactAppCard
                                key={index}
                                name={contacts.name}
                                mobile={contacts.mobile}
                                email={contacts.email}
                                deleteContact={deleteContact}
                                enableEditMode={enableEditMode}
                                index={index}
                            />
                        })
                    }

                </div>

                <div className='addcontactscontiner'>
                    <h2 className="subheading">
                        {isEditMode ? 'Edit Contact' : 'Add Contact'}
                    </h2>

                    <input
                        type='text'
                        placeholder='Name'
                        className='userinput'
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        value={name}
                    />
                    <br />
                    <input
                        type='text'
                        placeholder='Mobile number'
                        className='userinput'
                        onChange={(e) => {
                            setMobile(e.target.value);
                        }}
                        value={mobile}
                    />
                    <br />
                    <input
                        type='email'
                        placeholder='email'
                        className='userinput'
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                    />
                    <br /> <button className='btnsubmit' onClick={()=>{
                        isEditMode ? editContact() : addContact()
                    }}>
                    {isEditMode ? 'Edit Contact' : 'Add Contact'}
                    </button>

                </div>
            </div>
        </div>
    )


}