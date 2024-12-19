import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import { toast } from 'sonner';

const TabContract = () => {
  const [isSigning, setIsSigning] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSign = () => {
    setOpenDialog(true);
    setIsSigning(true);

    // Show the signing gif for 2-3 seconds, then display a random toast
    setTimeout(() => {
      const isSigned = Math.random() > 0.5; // Randomly determine if signed or not
      setIsSigning(false);
      setOpenDialog(false); // Close the dialog after signing
      if (isSigned) {
        toast.success('Müqavilə uğurla imzalandı!');
      } else {
        toast.error('Müqavilə imzalanmadı.');
      }
    }, 3000); // Show gif for 2 seconds
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Müqavilə
      </Typography>

      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent
          sx={{
            border: '1px solid ',
            borderRadius: '10px',
            maxHeight: '400px',
            overflow: 'auto',
          }}
        >
          <Typography variant="body2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed illo sequi harum magni.
            Ipsum, ab. Magni, blanditiis dicta aspernatur impedit ad beatae explicabo officiis a
            minus dolores veniam molestias quis. Doloremque provident amet quas? Itaque
            reprehenderit fugit minus quam, ducimus rerum iusto tenetur. In eos sapiente numquam
            fugit doloremque! Excepturi possimus qui nam saepe quo dolorem voluptates, sunt natus
            unde expedita, quidem reiciendis adipisci commodi eveniet ex dignissimos, et impedit
            voluptate cumque cum at dolores officiis incidunt dolore! Sint qui totam animi quam est
            deserunt voluptas, eius a nesciunt. Incidunt eum praesentium quo? Molestiae voluptate
            ullam enim modi assumenda dolores maiores. Delectus corporis illum quis quam officia.
            Est, provident ipsum! Accusamus aliquam quos dignissimos debitis possimus autem!
            Voluptatum voluptate at cumque obcaecati perferendis molestias aliquid, nobis unde. Modi
            dolor asperiores inventore. Ullam, suscipit reprehenderit illo amet voluptas dolores
            saepe deserunt corporis exercitationem aperiam? Laudantium, placeat natus. Nam, deleniti
            ipsa consectetur aperiam, molestiae maxime accusamus minima, maiores eveniet corporis
            odit quia repellat aspernatur eum facilis. Corrupti nihil possimus iusto! Cupiditate
            magnam, adipisci a vel ad eaque architecto soluta nostrum esse libero quis praesentium
            facere quidem quae laboriosam, exercitationem accusantium vitae asperiores! Aspernatur
            minus necessitatibus veniam, accusantium neque, aperiam exercitationem itaque numquam
            voluptatibus magni quasi aliquid. Delectus tenetur doloremque, quae quisquam quod, iusto
            numquam possimus soluta odio voluptates recusandae! Placeat cupiditate consequatur omnis
            sed consectetur similique cum amet! Repellat quis cumque aliquid nesciunt nulla quia
            officia provident ducimus necessitatibus atque aperiam ipsa alias, iusto tempore quas
            error debitis rem at nostrum cupiditate facilis odit! Debitis, doloremque voluptatem
            odio magnam, ut perspiciatis cum accusantium ipsam rerum accusamus ipsa! Aliquam
            quisquam, autem ducimus, perferendis totam dolorum ratione pariatur tenetur ipsam
            nesciunt vel enim aut id minus culpa distinctio placeat quia qui quidem temporibus
            aspernatur, vero modi dolorem? Rerum ipsam tempore tenetur tempora quidem architecto
            iste expedita amet deleniti doloremque, laboriosam rem soluta a, vitae quae excepturi
            iure omnis facilis. Voluptatum accusamus rem non id placeat dignissimos debitis corrupti
            praesentium minus necessitatibus inventore, nisi at numquam ex accusantium tempora
            facere enim sint. Laudantium sapiente vitae sed, magnam quidem, tempora laborum, non
            enim quia atque omnis dignissimos corporis officia illum. Deleniti laborum velit non
            debitis fugiat nemo incidunt reiciendis, praesentium, eius distinctio assumenda, quod
            nobis! Ut delectus laborum voluptate, eligendi magnam sint accusamus, labore doloribus
            omnis rerum, perferendis sit. Neque nobis illum consectetur, necessitatibus, vel vero
            odio assumenda quae molestias laboriosam doloremque itaque, maxime similique modi! Sit
            temporibus sint commodi consequuntur necessitatibus, eum ex! Quae corporis cumque
            excepturi sit nostrum facilis veniam? Labore, in doloribus dolore deleniti velit alias
            officia maxime ea amet commodi molestiae quia eaque. Dignissimos excepturi adipisci
            tempora molestias quas corrupti earum. Vitae, iusto debitis amet quae necessitatibus
            veritatis perferendis incidunt et nihil, similique eos ex accusamus maiores, labore
            assumenda impedit qui mollitia pariatur! Voluptatem tempora, porro animi aperiam
            doloribus soluta laboriosam placeat voluptas deserunt dolore explicabo corporis
            voluptates odit cupiditate nisi totam, accusantium aspernatur? Ad nihil fuga corporis
            possimus a at vero dolore quis accusamus distinctio deserunt cum pariatur, eveniet
            inventore? Impedit.
          </Typography>
        </CardContent>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            color="success"
            variant="contained"
            onClick={handleSign}
            disabled={isSigning} // Disable the button while signing
            sx={{ textTransform: 'none' }}
          >
            Sima ilə imzalaması üçün təstiqə göndər
          </Button>
        </Box>
      </Card>

      {/* Dialog for signing */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          {isSigning && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 5,
                gap: 2,
              }}
            >
              <Typography variant="h6"> İmzalanır </Typography>
              <CircularProgress color="success" size={20} />
            </Box>
          )}

          {isSigning ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 300,
                marginLeft: 9,
              }}
            >
              <img src="/signing.gif" alt="Signing" width={330} height={290} />
            </Box>
          ) : (
            <Typography>İmzalama tamamlandı. Nəticə bildirildi.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary" disabled={isSigning}>
            Bağla
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TabContract;
