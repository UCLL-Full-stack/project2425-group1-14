import React from 'react';
import { Container, Typography, Paper, Button, TextField, List, ListItem, ListItemText } from '@material-ui/core';

const AdminVotingPage: React.FC = () => {
    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Admin Voting Page
            </Typography>
            <Typography variant="body1" gutterBottom>
                Welcome to the admin voting page. Here you can manage the voting process.
            </Typography>
            <Paper style={{ padding: 16, marginBottom: 16 }}>
                <Typography variant="h5" gutterBottom>
                    Create New Vote
                </Typography>
                <form noValidate autoComplete="off">
                    <TextField label="Vote Title" fullWidth margin="normal" />
                    <TextField label="Description" fullWidth margin="normal" multiline rows={4} />
                    <Button variant="contained" color="primary" style={{ marginTop: 16 }}>
                        Create Vote
                    </Button>

                </form>
            </Paper>
            <Paper style={{ padding: 16 }}>
                <Typography variant="h5" gutterBottom>
                    Current Votes
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText primary="Vote 1" secondary="Description of vote 1" />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Vote 2" secondary="Description of vote 2" />
                    </ListItem>
                    {/* moeten hier beschikbare opties zetten voor votes, best met backend */}
                </List>
            </Paper>
        </Container>
    );
};

export default AdminVotingPage;