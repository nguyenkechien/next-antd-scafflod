import { INCREMENT, DECREMENT, RESET } from '../../constants/ActionTypes';

export const increment = () => ({ type: INCREMENT });

export const decrement = () => ({ type: DECREMENT });

export const reset = () => ({ type: RESET });
