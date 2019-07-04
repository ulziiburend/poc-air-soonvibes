import {createSelector} from 'reselect'

const getChannels = state => state.channels

function compare(a, b) {
    const idA = a.id;
    const idB = b.id;
    if (idA > idB) return 1;
    if (idB > idA) return -1;
    return 0;
}

export const getAvailableChannels = createSelector(
    [getChannels],
    channels => {
        return channels.slice().sort(compare)
    }
)
export const getCurrentChannel = state => {
    return state.channels.filter(channel => channel.isPlaying)[0]
}

//We can do some filter if we want. Like below example
//
// export const getCompletedTodoCount = createSelector(
//     [getTodos],
//     todos => (
//         todos.reduce((count, todo) =>
//                 todo.completed ? count + 1 : count,
//             0
//         )
//     )
// )