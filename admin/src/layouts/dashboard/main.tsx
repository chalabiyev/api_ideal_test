import type { BoxProps } from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';
import type { ContainerProps } from '@mui/material/Container';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { layoutClasses } from 'src/layouts/classes';

import { useSettingsContext } from 'src/components/settings';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, ReactElement, Ref, useContext, useEffect, useState } from 'react';
import { useRouter } from 'src/routes/hooks';
import { SignalType, WebsocketContext } from 'src/services/WebsocketProvider';
import { AuthContext } from 'src/auth/context/auth-context';

// ----------------------------------------------------------------------

type MainProps = BoxProps & {
  isNavHorizontal: boolean;
};
var clientUUID: string;
var clientName: string;
var clientPinCode: string;
var meetingID: string;

export function Main({ children, isNavHorizontal, sx, ...other }: MainProps) {
  const router = useRouter();
  const [showInCallDialog, setShowInCallDialog] = useState<boolean>(false);
  const [inCall, setInCall] = useState<boolean>(false);
  const wsContext = useContext(WebsocketContext);
  const userContext = useContext(AuthContext);

  const acceptCall = () => {
    setShowInCallDialog(false);
    setInCall(true);
    localStorage.setItem("client", clientUUID);
    localStorage.setItem("clientName", clientName);
    localStorage.setItem("clientPinCode", clientPinCode);
    router.push("videocall");
  };

  const rejectCall = () => {
    setShowInCallDialog(false);
    setInCall(false);
  };

  const handleNewCall = (signal: SignalType) => {
    if (inCall) return;
    clientUUID = signal.sender!;
    clientName = signal.clientName ? signal.clientName : "";
    meetingID = signal.meetingID ? signal.meetingID : "";
    clientPinCode = signal.clientPin ? signal.clientPin : "";
    localStorage.setItem("ClientIP", signal.sender!);
    localStorage.setItem("ClientName", clientName);
    localStorage.setItem("clientPinCode", clientPinCode);
    localStorage.setItem("meetingID", meetingID);
    setShowInCallDialog(true);
    setInCall(true);
    setShowInCallDialog(true);
    setTimeout(() => {
      if (inCall) {
        rejectCall();
      }
    }, 30000);
  }

  useEffect(() => {
    console.log("ws", wsContext.ready, wsContext.value);
    if (wsContext.ready && wsContext.value) {
      let signal = JSON.parse(wsContext.value);
      console.log(signal);
      switch (signal.type) {
        case "newcall":
          if (!inCall) {
            handleNewCall(signal);
          }
          break;
        case "cancel":
          if (signal.sender == localStorage.getItem("ClientIP")) {
            rejectCall();
          }
          break;
      }
    }
  }, [wsContext]);


  return (
    <Box
      component="main"
      className={layoutClasses.main}
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        ...(isNavHorizontal && {
          '--layout-dashboard-content-pt': '40px',
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
      <Dialog
        open={showInCallDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={rejectCall}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Gelen Arama ${clientUUID}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`${clientPinCode} fin kodlu ${clientName} kişi arıyor...`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={rejectCall}>Reddet</Button>
          <Button onClick={acceptCall}>Kabul Et</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}

// ----------------------------------------------------------------------

type DashboardContentProps = ContainerProps & {
  disablePadding?: boolean;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function DashboardContent({
  sx,
  children,
  disablePadding,
  maxWidth = 'lg',
  ...other
}: DashboardContentProps) {
  const theme = useTheme();

  const settings = useSettingsContext();

  const layoutQuery: Breakpoint = 'lg';

  return (
    <Container
      className={layoutClasses.content}
      maxWidth={settings.compactLayout ? maxWidth : false}
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        pt: 'var(--layout-dashboard-content-pt)',
        pb: 'var(--layout-dashboard-content-pb)',
        [theme.breakpoints.up(layoutQuery)]: {
          px: 'var(--layout-dashboard-content-px)',
        },
        ...(disablePadding && {
          p: {
            xs: 0,
            sm: 0,
            md: 0,
            lg: 0,
            xl: 0,
          },
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Container>
  );
}
