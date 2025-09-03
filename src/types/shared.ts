export type ISODateTimeString = string;
export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export interface ToggleEditProps {
  toggleEdit: () => void
}
