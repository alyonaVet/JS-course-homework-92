import React, {useState} from 'react';
import {Message} from '../../../types';
import {useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../users/usersSlice';
import {Stack, TextField, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';

interface Props {
  onSubmit: (message: Message) => void;
  isLoading: boolean;
}
const AddMessageForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const user = useAppSelector(selectUser);

  if (!user) {
    return (<Typography>You have to be logged in!</Typography>);
  }

  const [messageData, setMessageData] = useState<Message>({
    user: user._id,
    message: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setMessageData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = (event:  React.FormEvent) => {
    event.preventDefault();
    onSubmit({...messageData});
    setMessageData({
      user: '',
      message: ''
    });
  };

  return (
    <Stack
      component="form"
      onSubmit={submitFormHandler}
      flexDirection="row"
      alignItems="center"
      gap={1}
      mt={5}
    >
      <TextField
        label="Enter message"
        id="message"
        name="message"
        value={messageData.message}
        onChange={inputChangeHandler}
        fullWidth
      />
      <LoadingButton
        type="submit"
        disabled={isLoading}
        loadingPosition="center"
        variant="contained"
      >
        <span>Send</span>
      </LoadingButton>

    </Stack>
  );
};

export default AddMessageForm;