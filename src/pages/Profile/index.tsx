import Grid from '@mui/material/Grid2';
import { GeneralTemplate } from '../../components/template/general.template';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFromLocalStorage, update } from '../../store/publication/thunks';
import { Box, Button, FormControl, FormLabel, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export const Profile = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { user } = useSelector((state: RootState ) => state.publication);

    const [name, setName] = useState(user.name);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);


    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');


    useEffect(() => {
        dispatch(fetchUserFromLocalStorage());

        return () => {
            console.log('SignUp unmounted');
        }
    }, []);



    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const full_name = document.getElementById('full_name') as HTMLInputElement;
        const username = document.getElementById('username') as HTMLInputElement;

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }


        if (!full_name.value || full_name.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('Name is required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        if (!username.value || username.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('Name is required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        return isValid;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (nameError || emailError) {
            return;
        }

        const data = new FormData(event.currentTarget);
        console.log({
            full_name: data.get('full_name'),
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
        });

        const userData = {
            name: data.get('full_name') as string,
            username: data.get('username') as string,
            email: data.get('email') as string,
            password: data.get('password') as string,
        }
        console.log(userData);
        
        dispatch(update(userData));
    };

    return (
        <GeneralTemplate>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Grid container spacing={2} columns={8}>
                    <Grid
                        size={{ xs: 12, md: 6 }}
                        sx={{ marginX: 'auto' }}
                    >
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                        >
                            <FormControl>
                                <FormLabel htmlFor="full_name">Full name</FormLabel>
                                <TextField
                                    autoComplete="name"
                                    name="full_name"
                                    required
                                    fullWidth
                                    id="full_name"
                                    placeholder="Jon Snow"
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    color={nameError ? 'error' : 'primary'}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="username">User name</FormLabel>
                                <TextField
                                    autoComplete="username"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    placeholder="JonSnow"
                                    error={nameError}
                                    helperText={nameErrorMessage}
                                    color={nameError ? 'error' : 'primary'}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    placeholder="your@email.com"
                                    name="email"
                                    autoComplete="email"
                                    variant="outlined"
                                    error={emailError}
                                    helperText={emailErrorMessage}
                                    color={emailError ? 'error' : 'primary'}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ width: 100 }}
                                onClick={validateInputs}
                                // disabled={loading}
                            >
                                Actualizar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </GeneralTemplate>
    );
}
