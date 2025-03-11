import Image from "next/image";
import styles from "./page.module.css";
import { Button, Typography } from "@mui/material";
import CasinoIcon from '@mui/icons-material/Casino';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/card-game.png"
          alt="Next.js logo"
          width={180}
          height={180}
          priority
        />
           <Typography variant="h5" > 
              Mì cay hảo hảo ...
           </Typography>
           <Typography variant="h5" style={{paddingLeft : 50}} > 
               ... Không cay không hảo
           </Typography>

        <div className={styles.ctas}>
          <Button endIcon={<CasinoIcon />} variant="outlined" color="primary" style={{marginTop: 50}}
            href="/game"
          >
            Bắt đầu chơi
          </Button>
                
        </div>
      </main>
      <footer className={styles.footer}>
      
      </footer>
    </div>
  );
}
