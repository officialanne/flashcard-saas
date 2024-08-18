'use client'

import {useUser} from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import db from '@/firebase'
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
  } from '@mui/material'

import { doc, collection, setDoc, getDoc, writeBatch } from 'firebase/firestore'



export default function Generate() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState({})
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const [dialogOpen, setDialogOpen] = useState(false)
    const handleOpenDialog = () => setDialogOpen(true)
    const handleCloseDialog = () => setDialogOpen(false)

    const handleCardClick = (id) => {
        setFlipped ((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const saveFlashcards = async () => {
        if (!name.trim) {
            alert('Please enter a name')
            return
        }

        try {
            if (!name) {
                alert('Please enter a name')
                return
            }

            const batch = writeBatch(db)
            const userDocRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(userDocRef)

            if (docSnap.exists()){
                const collections = docSnap.data().flashcards || []
                if (collections.find((f) => f.name === name)) {
                    alert('Flashcard collection with the same name already exists.')
                }
                else{
                    collections.push({name})
                    batch.set(userDocRef, {flashcards: collections}, {merge: true})
                }
            }

            else {
                batch.set(userDocRef, {flashcards: [{name}]})
            }

            const colRef = collection(userDocRef, name)
            flashcards.forEach((flashcard) => {
                const cardDocRef = doc(colRef)
                batch.set(cardDocRef, flashcard)
            })

            await batch.commit()
            handleClose()
            router.push('/flashcards')

            alert('Flashcards saved successfully!')
            handleCloseDialog()
            setName('')
        }   catch (error) {
                console.error('Error saving flashcards:', error)
                alert('An error occurred while saving flashcards. Please try again.')   
            }

    }


    const handleSubmit = async () => {
        // Instead of calling an API, set the flashcards from the randomly selected list
        if (!text.trim()) {
        alert('Please enter some text to generate flashcards.');
        return;
        }

        const hardcodedFlashcardsPool = [
            {
                front: "What is a variable in programming?",
                back: "A variable is a storage location in memory with a specific name that holds a value which can be changed during program execution."
            },
            {
                front: "What is the difference between supervised and unsupervised learning?",
                back: "Supervised learning involves training a model on labeled data, whereas unsupervised learning involves finding patterns in unlabeled data."
            },
            {
                front: "Explain the concept of recursion.",
                back: "Recursion is a process where a function calls itself directly or indirectly to solve a problem."
            },
            {
                front: "What is a neural network?",
                back: "A neural network is a series of algorithms that attempt to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates."
            },
            {
                front: "What is Big O notation?",
                back: "Big O notation is a mathematical representation used to describe the efficiency of an algorithm in terms of time or space complexity."
            },
            {
                front: "Define overfitting in machine learning.",
                back: "Overfitting occurs when a model learns the details and noise in the training data to the extent that it negatively impacts the performance of the model on new data."
            },
            {
                front: "What is a hash table?",
                back: "A hash table is a data structure that maps keys to values for efficient lookup."
            },
            {
                front: "Describe the difference between GET and POST methods in HTTP.",
                back: "GET requests data from a specified resource, while POST submits data to be processed to a specified resource."
            },
            {
                front: "What is an API?",
                back: "An API (Application Programming Interface) is a set of protocols and tools for building software applications, allowing different software programs to communicate with each other."
            },
            {
                front: "What is the purpose of a for loop?",
                back: "A for loop is used to repeat a block of code a certain number of times or while a condition is true."
            },
            // Add more flashcards here...
        ];
        
        // Function to randomly select 10 flashcards from the pool
        function getRandomFlashcards(pool, count) {
            const shuffled = [...pool].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        }
        
        
        const selectedFlashcards = getRandomFlashcards(hardcodedFlashcardsPool, 10);
        setFlashcards(selectedFlashcards);
    }

    

    

        

    return (
        <Container 
            maxWidth = "md"
        >
            <Box
                sx = {{
                    mt: 4, 
                    mb: 6, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center'
                }}
            >
                <Typography
                    variant = "h4"
                >
                    Generate Flashcards
                </Typography>
                <Paper
                    sx = {{p: 4, width: '100%'}}
                > 
                    <TextField
                        value = {text}
                        onChange = {(e) => setText(e.target.value)}
                        label = "Enter Text"
                        fullWidth
                        multiline
                        rows = {4}
                        variant='outlined'
                        sx = {{mb: 2}}
                    >
                    </TextField>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleSubmit}
                        fullWidth
                    >
                        Submit
                    </Button>
                </Paper>
            </Box>

            {flashcards.length >0 && (
                <Box sx = {{mt: 4}}>
                    <Typography
                        variant='h5'

                    >
                        Flashcards Preview
                    </Typography>
                    <Grid container spacing={3}>
                        {flashcards.map((flashcard, index) => (
                            <Grid
                                item xs = {12}
                                sm = {6}
                                md = {4}
                                key = {index}
                            >
                                <CardActionArea
                                    onClick={() => {
                                        handleCardClick(index)
                                    }}
                                >
                                    <CardContent>
                                        {/* animations */}
                                        <Box
                                            sx={{
                                                perspective: '1000px',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '200px',
                                                    transition: 'transform 0.6s',
                                                    transformStyle: 'preserve-3d',
                                                    transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        backfaceVisibility: 'hidden',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        padding: 2,
                                                        boxSizing: 'border-box',
                                                        backgroundColor: 'white',
                                                        border: '1px solid #ccc',
                                                    }}
                                                >
                                                    <Typography variant="h5" component="div">
                                                        {flashcard.front}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        backfaceVisibility: 'hidden',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        padding: 2,
                                                        boxSizing: 'border-box',
                                                        backgroundColor: '#f0f0f0',
                                                        border: '1px solid #ccc',
                                                        transform: 'rotateY(180deg)',
                                                    }}
                                                >
                                                    <Typography variant="h5" component="div">
                                                        {flashcard.back}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Grid>
                        ))}
                    </Grid>
                    <Box
                        sx = {{
                            mt: 4,
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <Button
                            variant='contained'
                            color = 'secondary'
                            onClick = {handleOpenDialog}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            )}


            <Dialog
                open = {dialogOpen}
                onClose = {handleCloseDialog}
            >
                <DialogTitle>
                    Save Flashcards
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your flashcards collection
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin = 'dense'
                        label = 'Collection Name'
                        type = 'text'
                        fullWidth 
                        value = {name}
                        onChange = {(e) => setName(e.target.value)}
                        variant = 'outlined'
                    >

                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick = {handleCloseDialog}>Cancel</Button> 
                    <Button onclick = {saveFlashcards}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )

}



