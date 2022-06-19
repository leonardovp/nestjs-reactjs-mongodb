import {Routes, Route, Navigate} from 'react-router-dom';
import { ListagemDePessoa } from '../pages';

export const AppRoutes = () => {

    return(
        <Routes>
            <Route path='/pessoas' element={<ListagemDePessoa/>}/>           

            <Route path='*' element={<Navigate to='/pessoas'/>} />
        </Routes>
    )

}