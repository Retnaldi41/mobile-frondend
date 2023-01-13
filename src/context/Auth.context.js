import React, {useState} from 'react';

export const AuthContext = React.createContext(null);

const initialState = {
  id_user: '',
  nama_user: '',
  alamat_user: '',
  telpon_user: '',
  username: '',
  password: ''
}

export const ContextProvider = props => {
  const [user, setUser] = useState(initialState);

  const login = (userLogin) => {
    setUser(userLogin);          
  }

  const logout = () => {
    setUser({nama: '', password: ''}); 
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};