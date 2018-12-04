
const showGuide = (state = false, action) => {
    switch (action.type) {
        case 'SET_SHOWGUIDE':
            return action.showGuide;
        default:
            return state
    }
}
const showMoreGroup = (state = false, action) => {
    switch (action.type) {
        case 'SET_SHOWMOREGROUP':
            return action.showMoreGroup;
        default:
            return state
    }
}

const modalOpen = (state = false, action) => {
    switch (action.type) {
        case 'SET_MODALOPEN':
            return action.modalOpen;
        default:
            return state
    }
}

export {
    showGuide,
    showMoreGroup,
    modalOpen
}
