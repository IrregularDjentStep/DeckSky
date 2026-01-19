import { ConfirmModal, DialogBody, Focusable, TextField, Navigation} from "@decky/ui";

import { useState } from "react";

import { createNewClient, resolveHandle } from "../auth/client"

const LoginModal: React.FC<{ closeModal: () => void}> = ({closeModal}) =>{
    const [bOKDisabled, setBOKDisabled] = useState<boolean>(true);
    const [handle, setHandle] = useState<string>('');
    const client = createNewClient();

    
    const loginHandler = async (handle: string) => {
      // validate and resolve handle first?
      const identity = await resolveHandle(handle);
      const state = "434321";

      if (identity == null){
        throw new Error(`Failed to resolve handle: ${handle}`);
      }

      else if (identity !== null && identity === "Invalid handle format"){
        throw new Error(identity);
      }

      const url = await client.authorize(handle, {
        state,
        scope: 'atproto transition:generic'
      });

      Navigation.NavigateToSteamWeb(url.toString());
    }

    return (
        <ConfirmModal
      strTitle="Login to Bluesky"
      strDescription="Please enter your Bluesky username."
      strOKButtonText="Login"
      bOKDisabled={bOKDisabled}
      onCancel={closeModal}
      onOK={() => {
        console.log("Attempting to log in");
        loginHandler(handle);
      }}>
        <DialogBody>
            <Focusable>
                <TextField
                label="Your Bluesky username"
                onChange={(e) =>
                    {
                      setBOKDisabled(e.target.value.trim().length == 0);
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