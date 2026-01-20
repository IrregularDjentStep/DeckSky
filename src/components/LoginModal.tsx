import { ConfirmModal, DialogBody, Focusable, TextField, Navigation} from "@decky/ui";
import resolveHandle, {createNewClient} from '../auth/client';
import { useState } from "react";


const LoginModal: React.FC<{ closeModal: () => void}> = ({closeModal}) =>{

    const [bOKDisabled, setBOKDisabled] = useState<boolean>(true);
    const [handle, setHandle] = useState<string>('');

    const client = createNewClient();

    

    return (
        <ConfirmModal
      strTitle="Login to Bluesky"
      strDescription="Please enter your Bluesky username."
      strOKButtonText="Login"
      bOKDisabled={bOKDisabled}
      onCancel={closeModal}
      onOK={() => {
        closeModal();
      }}>
        <DialogBody>
            <Focusable>
                <TextField
                label="Your Bluesky username"
                onChange={(e) =>
                    {
                      setBOKDisabled(e.target.value.trim().length !== 0)
                      setHandle(e.target.value);
                    }
                }>

                </TextField>
            </Focusable>
        </DialogBody>
      </ConfirmModal>
    )
}

export default LoginModal;