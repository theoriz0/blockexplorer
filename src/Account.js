import { useContext, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { AppContext } from './AppContext';
import {Grid, Paper, Typography} from "@mui/material";
import { Utils } from 'alchemy-sdk';

export default function Account() {
  const [balance, setBalance] = useState();
  let { address } = useParams();


  const alchemy = useContext(AppContext);

  useEffect(() => {
    async function getBalance(address) {
      setBalance(await alchemy.core.getBalance(address));
    }
    getBalance(address);
  }, [address])

  return (
    <Grid container spacing={3}>
      {/* Latest Block Number */}
      <Grid item>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Account:
          </Typography>
          <Typography component="p" variant="h4">
            {address}
          </Typography>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Account balance:
          </Typography>
          <Typography component="p" variant="h4" sx={{ flex: 1 }}>
            {balance ? Utils.formatEther(balance.toString()) : ""}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}