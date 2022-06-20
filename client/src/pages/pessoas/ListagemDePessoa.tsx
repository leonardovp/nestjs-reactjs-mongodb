import { useEffect, useState } from "react"
import { Paper, Table, TableContainer, TableHead, 
    TableBody, TableRow, TableCell, TableFooter, LinearProgress,
Button, Container , Icon, IconButton} from '@mui/material';
import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { Environment } from "../../shared/environment";

export const ListagemDePessoa: React.FC = () => {

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

        PessoasService.getAll().then((result) => {
            if(result instanceof Error){
                return new Error('Erro ao listar os registros')
            }else{
                setIsLoading(false);
                setRows(result.data);
            }
        })    
    
      }, [rows])



    const handleDelete = (id: string) => {

        

        if(window.confirm('Realmente deseja apagar?')){
            PessoasService.deleteById(id)
            .then(result => {
                if(result instanceof Error){
                    alert('Não foi possível excluir');
                }
            });        
        }else{
            setRows(oldRows => {
                return[
                    ...oldRows.filter(oldRows => oldRows._id !== id),
                ]
            });
           
        }
    }

    return(
       <Container maxWidth="lg">
       <Button>Novo +</Button>
        <TableContainer component={Paper} variant="outlined" 
        sx={{            
            width: 'auto'
            }}>
            <Table>            
                <TableHead>
                    <TableRow>
                        <TableCell>Ações</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Usuário</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>

                </TableHead>
            
                <TableBody>
                    {
                        rows.map(row => (

                        <TableRow key={row._id}>
                            <TableCell>
                            <IconButton size="small" onClick={() => handleDelete(row._id)}>
                                <Icon>delete</Icon>  
                            </IconButton>
                            <IconButton size="small">
                                <Icon>edit</Icon>  
                            </IconButton>
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.userName}</TableCell>
                            <TableCell>{row.email}</TableCell>
                        </TableRow> 

                        ))
                    }
                </TableBody>
                
                {rows.length === 0 &&(
                    <caption>{Environment.LISTAGEM_VAZIA}</caption>
                )}

                <TableFooter>
                {isLoading && (
                    <TableRow>
                        <TableCell colSpan={4}>                       
                            <LinearProgress variant="indeterminate" />                       
                        </TableCell>
                    </TableRow>
                    )}
                </TableFooter>

            </Table>
        </TableContainer>
       </Container>
       

    )

}