import React from "react"
import io from "socket.io-client"
import {deepOrange} from '@material-ui/core/colors';
import {
    withStyles,
    Avatar,
    Card,
    Chip,
    Typography,
    CardContent,
    InputBase,
    Divider,
    IconButton, Paper
} from "@material-ui/core"
import {MAIN_URL, CHAT_NAMESPACE} from "../socket-client/Constants"


const styles = theme => ({
    root: {
        position: 'absolute',
        right: theme.spacing(3),
        top: 150
    },

    chat: {
        width: 400,
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    chatMessages: {
        height: 500,
        width: '100%',
        overflowY: 'scroll'
    },
    chatMessage: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    chatText: {},
    chatFooter: {
        marginTop: theme.spacing(1),
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    vDivider: {
        width: '100%',
        height: 1,
        margin: 1,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
    avatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[500],
    },

})

class Chat extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            message: '',
            messages: []
        }
        // connecting to chat socket
        this.socket = io(MAIN_URL + CHAT_NAMESPACE)
        this.socket.on('RECEIVE_MESSAGE', function (data) {
            console.log('RECEIVE_MESSAGE', data)
            addMessage(data)
        })

        const addMessage = data => {
            this.setState({messages: [...this.state.messages, data]})
            console.log(this.state.messages)
        }

        this.sendMessage = ev => {
            ev.preventDefault()
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            this.setState({message: ''})
        }
    }

    render() {
        const {classes} = this.props
        const {messages, message, username} = this.state

        return (
            <div className={classes.root}>
                <Card className={classes.chat}>
                    <CardContent className={classes.chatMessages}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Feel free to chat  <span role="img">&#128519;</span>
                        </Typography>
                        <Divider className={classes.vDivider}/>
                        {messages.map((message ,index)=> {
                            return (
                                <div className={classes.chatMessage} key={index}>
                                    <Avatar className={classes.avatar}>  {message.author.substr(0, 1)}</Avatar>
                                    <Chip label={message.author + ' : ' + message.message}
                                          className={classes.chatText}/>
                                </div>
                            )
                        })}

                    </CardContent>
                </Card>
                <Paper className={classes.chatFooter}>
                    <InputBase
                        className={classes.input}
                        placeholder="Username"
                        inputProps={{'aria-label': 'Enter your name'}}
                        value={username}
                        onChange={event => this.setState({username: event.target.value})}
                    />
                </Paper>
                <Paper className={classes.chatFooter}>


                    <InputBase
                        className={classes.input}
                        placeholder="Type your message here"
                        inputProps={{'aria-label': 'Type your message here'}}
                        value={message}
                        onChange={event => this.setState({message: event.target.value})}
                    />
                    <Divider className={classes.divider}/>
                    <IconButton type='submit' className={classes.iconButton} aria-label="Send"
                                onClick={this.sendMessage}>
                        <i className="far fa-paper-plane"></i>
                    </IconButton>
                </Paper>
            </div>
        )
    }
}


export default withStyles(styles)(Chat)