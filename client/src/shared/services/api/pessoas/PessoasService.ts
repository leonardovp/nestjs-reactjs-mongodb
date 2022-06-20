import { Environment } from "../../../environment"
import { Api } from "../axios-config"

export interface IPessoa {    
    name: string,
    userName: string
    email: string,
    password: string,    
}

export interface IPessoaRetornoCadastro {  
    _id: string,  
    name: string,
    userName: string
    email: string,
    password: string,    
}export interface IListagemPessoa {
    _id: string,
    name: string,
    userName: string
    email: string,
}

export type TPessoasComTotalCount = {
    data: IListagemPessoa[];
    totalCount: number;
}

const getAll = async (): Promise<TPessoasComTotalCount | Error> => {
    try {

        const urlRelativa = `/users`        

        const { data, headers } = await Api.get(urlRelativa)

        if(data){
            return{
                data,
                totalCount : Number(headers['x-total-count'] || Environment.LIMITE_LINHAS),
            }
        }

        return new Error('Erro ao listar os registros')

    } catch (error) {

        console.error(error);

        return new Error((error as {message: string}).message || 'Erro ao listar os registros')

    }
}

const getByID = async (): Promise<any> => {

}

const create = async (dados: IPessoa) : Promise<string | Error> => {

    try {

        console.log(dados);
        
        const { data } = await Api.post<IPessoaRetornoCadastro>('/users', dados)  

        if (data) {
            return data._id
        }

        return new Error('Erro ao criar o registro')

    } catch (error) {
        console.error(error);

        return new Error((error as {message: string}).message || 'Erro ao criar o registro')
    }

}

const updateById = async (): Promise<any> => {

}

const deleteById = async (id: string): Promise<void | Error> => {
    try {
      await Api.delete(`/users/${id}`);
    } catch (error) {
      console.error(error);
      return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
    }
  };

export const PessoasService = {
    getAll,
    getByID,
    create,
    updateById,
    deleteById,
}