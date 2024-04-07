import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import store from "../redux/store";

//Робимо файл одразу з хуками типових інструментів і типізацією, щоб не типізувати щоразу при використанні
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useTSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTDispatch = useDispatch as () => AppDispatch;