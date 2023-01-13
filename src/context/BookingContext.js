import React, {useState} from 'react';

export const BookingContext = React.createContext(null);

const initialState = 
{
    id_user: '', jenis_booking: '', id_item: '', tanggal_booking:'', bukti_transfer:'', status:'', id_booking:''
}

export const ContextProvider = props => {
  const [booking, setBooking] = useState(initialState);

  const book = (bookData) => {
    setBooking(bookData);          
  }

  return (
    <AuthContext.Provider
      value={{
        booking,
        book,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};