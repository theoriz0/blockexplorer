import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AppContext } from './AppContext';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Box, Button, Input } from "@mui/material";
import Link from '@mui/material/Link';

import TxDetail from './TxDetail';

export default function Home() {

    const [latestBlock, setLatestBlock] = useState();
    const [block, setBlock] = useState({ transactions: [] });
    const [inputBlock, setInputBlock] = useState();
    const alchemy = useContext(AppContext);

    async function updateLatestBlock() {
        setLatestBlock(await alchemy.core.getBlockNumber());
    }

    useEffect(() => {
        async function updateLatestBlock() {
            setLatestBlock(await alchemy.core.getBlockNumber());
        }

        updateLatestBlock();
    }, []);

    async function getBlockWithTransactions(blockNumber) {
        await alchemy.core.getBlockWithTransactions(blockNumber)
            .then(setBlock);
    }

    return (
        <Router>
            <Switch>
                <Route path="/tx/:txHash" children={<TxDetail transactions={block.transactions} />} />
                <Route path="/" children={<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>

                    <Grid container spacing={3}>
                        {/* Latest Block Number */}
                        <Grid item xs={12} md={3} lg={2}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Latest Block Number
                                </Typography>
                                <Typography component="p" variant="h4" sx={{ flex: 1 }}>
                                    {latestBlock}
                                </Typography>
                                <div>
                                    <Button color="primary" href="#" onClick={updateLatestBlock}>
                                        Refresh
                                    </Button>
                                </div>
                                <div>
                                    <Button color="primary" href="#" onClick={() => getBlockWithTransactions(latestBlock)}>
                                        Read Block
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>
                        {/* Input Block Number */}
                        <Grid item xs={12} md={3} lg={2}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Input Block Number
                                </Typography>
                                <Box sx={{ flex: 1 }}>
                                    <Input onChange={(e) => { setInputBlock(parseInt(e.currentTarget.value)) }}>{inputBlock}</Input>
                                </Box>
                                <div>
                                    <Button color="primary" href="#" onClick={() => getBlockWithTransactions(inputBlock)}>
                                        Read Block
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>
                        {/* Block Info */}
                        <Grid item xs={12} md={6} lg={8}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <dl>
                                    <dt>Number</dt>
                                    <dd>{block.number}</dd>

                                    <dt>Hash</dt>
                                    <dd>{block.hash}</dd>

                                    <dt>Parent Hash</dt>
                                    <dd>{block.parentHash}</dd>

                                    <dt>Miner</dt>
                                    <dd><Link href={`/account/${block.miner}`}>{block.miner}</Link></dd>

                                    <dt>Time</dt>
                                    <dd>{block.timestamp ? (new Date(block.timestamp * 1000)).toISOString() : ""}</dd>
                                </dl>
                            </Paper>
                        </Grid>
                        {/* Transactions in Block */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Transactions:
                                </Typography>
                                <ul>
                                    {block.transactions.map(element => {
                                        return (
                                            <li key={element.hash}>
                                                <Link href={`/tx/${element.hash}`}>{element.hash}</Link></li>
                                        );
                                    })}
                                </ul>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>} />
            </Switch>
        </Router>
    );
}