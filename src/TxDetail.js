import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import {
    BrowserRouter as Router
} from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { AppContext } from './AppContext';

export default function TxDetail() {
    const [transaction, setTransaction] = useState({});
    let { txHash } = useParams();

    const alchemy = useContext(AppContext);

    useEffect(() => {

        async function getTransaction(txHash) {
            setTransaction(await alchemy.core.getTransaction(txHash));
        }
        getTransaction(txHash);
    }, [txHash])


    return (
        <Router>
            <Grid container spacing={3}>
                <Grid item>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Transaction: {txHash}
                            </Typography>
                            <dl>
                                <dt>Type</dt>
                                <dd>{transaction.type}</dd>

                                <dt>Block Number</dt>
                                <dd>{transaction.blockNumber}</dd>

                                <dt>Block Hash</dt>
                                <dd>{transaction.blockHash}</dd>

                                <dt>Confirmations</dt>
                                <dd>{transaction.confirmations}</dd>

                                <dt>From</dt>
                                <dd><Link href={`/account/${transaction.from}`}>{transaction.from}</Link></dd>

                                <dt>To</dt>
                                <dd><Link href={`/account/${transaction.to}`}>{transaction.to}</Link></dd>

                                <dt>Value</dt>
                                <dd>{transaction.value ? transaction.value.toString() : ""}</dd>
                            </dl>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Router>
    );
}