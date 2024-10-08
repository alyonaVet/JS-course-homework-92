import React, {useState} from 'react';
import {ChatMessage} from '../../../types';
import {useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../users/usersSlice';
import {Stack, TextField, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';

interface Props {
  onSubmit: (message: ChatMessage) => void;
  isLoading: boolean;
}
const AddMessageForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const user = useAppSelector(selectUser);

  if (!user) {
    return (<Typography textAlign={'center'} mt={3}>To send message you have to be logged in!</Typography>);
  }

  const [messageData, setMessageData] = useState<ChatMessage>({
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
    console.log(messageData);
    onSubmit({...messageData});
    setMessageData({
      user: user._id,
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