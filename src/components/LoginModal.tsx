import { ConfirmModal, DialogBody, Focusable, TextField } from "@decky/ui";

import { useState } from "react";

 const [bOKDisabled, setBOKDisabled] = useState<boolean>(true);

const LoginModal: React.FC<{ closeModal: () => void}> = ({closeModal}) =>{
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
                    }
                }>

                </TextField>
            </Focusable>
        </DialogBody>
      </ConfirmModal>
    )
}

export default LoginModal;