import {OPEN_MODAL_WINDOW, CLOSE_MODAL_WINDOW} from '../constans';

export function openModalWindow(data) {
    return {
        type: OPEN_MODAL_WINDOW,
        data
    }
}

export function closeModalWindow() {
    return {
        type: CLOSE_MODAL_WINDOW
    }
}