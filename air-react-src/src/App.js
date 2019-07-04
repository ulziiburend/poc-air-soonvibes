import React from 'react';
import AvailableChannelList from './redux/containers/AvailableChannelList'
import MainPlayerContainer from './redux/containers/MainPlayerContainer'
import ChatContainer from './redux/containers/ChatContainer'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Container from '@material-ui/core/Container';
import theme from './material-theme';
import './App.css'

const App = () => (
    <MuiThemeProvider theme={theme}>
        <Container maxWidth="xl" className="App">
            <AvailableChannelList/>
            <MainPlayerContainer className="Player"/>
            <ChatContainer/>
        </Container>

    </MuiThemeProvider>
)

export default App;
