import { Environment } from "../../../environment"
import { Api } from "../axios-config"

export interface IPessoa {
    id: number,
    name: string,
    userName: string
    email: string,
    password: string,
}

export interface IListagemPessoa {
    id: number,
    name: string,
    userName: string
    email: string,
}

type TPessoasComTotalCount = {
    data: IListagemPessoa[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TPessoasComTotalCount | Error> => {
    try {

        const urlRelativa = `/users?_page=${page}&_limit=${Environment.LIMITE_LINHAS}&name_like=${filter}`        

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

const create = async (dados: Omit<IPessoa, 'id'>): Promise<number | Error> => {

    try {
        
        const { data } = await Api.post<IPessoa>('/users')

        if (data) {
            return data.id
        }

        return new Error('Erro ao criar o registro')

    } catch (error) {
        console.error(error);

        return new Error((error as {message: string}).message || 'Erro ao criar o registro')
    }

}

const updateById = async (): Promise<any> => {

}

const deleteById = async (): Promise<any> => {

}

export const PessoasService = {
    getAll,
    getByID,
    create,
    updateById,
    deleteById,
}