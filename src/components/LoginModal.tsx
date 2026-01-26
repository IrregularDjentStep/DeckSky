
import { ConfirmModal, DialogBody, Focusable, TextField, Navigation} from "@decky/ui";
import { BrowserOAuthClient } from "@atproto/oauth-client-browser";
import { OperationResponse } from "@decky/ui/dist/globals/steam-client/shared";
import { useState } from "react";
import { resolveIdentity } from "../auth/client";
import {AtpAgent, AtpSessionData, AtpSessionEvent } from "@atproto/api";


//implemented with app passwords for now because oauth is a pain in the ass
//change it later once i find a way to implement oauth

const LoginModal: React.FC<{ /* client: BrowserOAuthClient, */ closeModal: () => void}> = ({/* client, */ closeModal}) =>{

    const [bOKDisabled, setBOKDisabled] = useState<boolean>(true);
    const [handle, setHandle] = useState<string>('');
    const [pass, setPass] = useState<string>('');

   /*  async function loginHandler(handle: string){
          try {
            const handleResolver = resolveIdentity(handle);
            
            const url = await client.authorize(handle, {
              state: "423142", //TODO: figure out how to do states
              scope: 'atproto',
            });
            
            Navigation.NavigateToSteamWeb(url.toString());
          } catch (error) {
            throw error;
          }
      
    } */

      async function loginHandler(handle: string, pass: string,){

          try {
            const service = await resolveIdentity(handle);

            if (service == null){
              throw new Error("failed to resolve identity");
            }

            else if (service === "Invalid handle format"){
              throw new Error("Invalid handle format")
            }

            const agent = new AtpAgent({
              service: service,
              persistSession: (evt: AtpSessionEvent, sess?: AtpSessionData) => {
                // store the session-data for reuse
                if (sess !== undefined){
                    SteamClient.Storage.SetString('savedSession', JSON.stringify(sess) as string);
                  }
                }
              }
            );

            // attempt to get persisting session data
            const sessionData = await SteamClient.Storage.GetString(handle);

            //if no data was returned, log in
            if (typeof sessionData !== 'string'){
              let login = await agent.login({
                          identifier: handle,
                          password: pass
                }) 
            }

          }
          catch(error){
            console.log(error);
          }


      }
    

    return (
        <ConfirmModal
      strTitle="Login to Bluesky"
      strDescription="Please enter your Bluesky username and password. If the login fails, try creating an app password and then using it."
      strOKButtonText="Login"
      bOKDisabled={bOKDisabled}
      onCancel={closeModal}
      onOK={() => {
        loginHandler(handle, pass)
        closeModal();
      }}>
        <DialogBody>
            <Focusable>
                <TextField
                label="Your Bluesky username"
                onChange={(e) =>
                    {
                      setBOKDisabled(e.target.value.trim().length == 0)
                      setHandle(e.target.value);
                    }
                }>

                </TextField>
            </Focusable>
            <Focusable>
                <TextField
                label="Your Bluesky password"
                bIsPassword
                onChange={(e) =>
                    {
                      setBOKDisabled(e.target.value.trim().length == 0)
                      setPass(e.target.value);
                    }
                }>

                </TextField>
            </Focusable>
        </DialogBody>
      </ConfirmModal>
    )
}

export default LoginModal;