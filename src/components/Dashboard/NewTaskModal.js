import {observer} from "mobx-react-lite";
import {Box, Button, Dialog, DialogContent, DialogTitle, Input, TextField} from "@material-ui/core";
import {useState} from "react";
import useStore from "../../hooks/useStore";


const NewTaskModal = ({
                          open, setOpen, close = () => {
    }
                      }) => {

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    const {users, boards} = useStore();

    return <Dialog open={open} onClose={close}>
        <DialogTitle>
            Create new task:
        </DialogTitle>
        <form>
            <DialogContent style={{minWidth: 500}}>
                <Box p={1}>
                    <TextField fullWidth required={true} type={'text'} label={'Name'} value={name} onChange={(e) => {
                        setName(e.target.value)
                    }}> </TextField>

                    <TextField mb={4} fullWidth required={false} type={'text'} label={'Description'} value={desc}
                               onChange={(e) => {
                                   setDesc(e.target.value)
                               }}> </TextField>

                    <Box mt={3} display={'flex'} justifyContent={'flex-end'}>
                        <Box mr={3}>
                            <Button variant={'outlined'} color={'secondary'} onClick={() => {
                                setName('')
                                setDesc('')
                                setOpen(false)
                            }}>Close</Button>
                        </Box>
                        <Button variant={'outlined'} color={'primary'} onClick={() => {
                            boards.active.addTask(name, desc, users.me.id);
                            setName('')
                            setDesc('')
                            setOpen(false)
                        }}>Create</Button>
                    </Box>

                </Box>
            </DialogContent>
        </form>
    </Dialog>
}

export default observer(NewTaskModal);