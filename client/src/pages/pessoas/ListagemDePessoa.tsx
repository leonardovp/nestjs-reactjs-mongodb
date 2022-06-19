import { useEffect, useState } from "react"
import { Paper, Table, TableContainer, TableHead, 
    TableBody, TableRow, TableCell, TableFooter, LinearProgress,
Button, Container } from '@mui/material';
import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { Environment } from "../../shared/environment";

export const ListagemDePessoa: React.FC = () => {

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        setIsLoading(true)

        PessoasService.getAll()
            .then((result) =>{       
                
                setIsLoading(false)

                if(result instanceof Error){
                    alert(result.message)
                    return
                }else{

                    setRows(result.data)

                }
            })

    }, []);

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

                        <TableRow key={row.id}>
                            <TableCell>Ações</TableCell>
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