import {
  DialogButton,
  PanelSection,
  PanelSectionRow,
  TextField,
  staticClasses,
  showModal,
  ShowModalResult,
  Navigation,
} from "@decky/ui";
import {
  addEventListener,
  removeEventListener,
  definePlugin,
  toaster,
  routerHook
} from "@decky/api"
import { useState } from "react";
import { FaShip } from "react-icons/fa";
import { AtpAgent, AtpSessionEvent, AtpSessionData } from '@atproto/api'
import LoginModal from './components/LoginModal'
import { createNewClient } from "./auth/client";
import {
    AtprotoDohHandleResolver,
    BrowserOAuthClient
} from '@atproto/oauth-client-browser'
// import logo from "../assets/logo.png";


/* const client = await BrowserOAuthClient.load({
        handleResolver: new AtprotoDohHandleResolver({dohEndpoint: 'https://dns.google/resolve'}),
        //TODO: replace with production version
        clientId:  `http://localhost?redirect_uri=${encodeURIComponent('http://127.0.0.1:8080/routes/decksky-callback')}&scope=${encodeURIComponent('atproto transition:generic')}`
    }); */

/* function DeckyCallback(){
    console.log("callback happened");
    return "hi";
  } */


function Content() {
  const [modalResult, setModalResult] = useState<ShowModalResult | null>(null);
  // how to set different handle resolvers for different users?
/*   client.init(); */

  //closes the current modal
  const closeModal = () => {
    modalResult?.Close();
    setModalResult(null);
  }


  const openLoginModal = () => {
/*     const result = showModal(<LoginModal client={client} closeModal={closeModal} />);
   */  
      const result = showModal(<LoginModal closeModal={closeModal} />);  
      setModalResult(result);
    
  }


  // if there are no accounts added, show this

  //otherwise, show every logged-in BSKY account
  return (
    <PanelSection title="Bluesky Accounts">
      <PanelSectionRow>
         <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          paddingLeft: "15px",
        }}
      >
        No accounts have been added yet. To begin, add an account below.
        </div>
        <DialogButton
          onClick={openLoginModal}
        >
          "Add New Account..."
        </DialogButton>
      </PanelSectionRow>

      {/* <PanelSectionRow>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} />
        </div>
      </PanelSectionRow> */}

      {/*<PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={() => {
            Navigation.Navigate("/decky-plugin-test");
            Navigation.CloseSideMenus();
          }}
        >
          Router
        </ButtonItem>
      </PanelSectionRow>*/}
    </PanelSection>
  );
};

export default definePlugin(() => {
  console.log("Template plugin initializing, this is called once on frontend startup")

  

  // Add an event listener to the "timer_event" event from the backend
  const listener = addEventListener<[
    test1: string,
    test2: boolean,
    test3: number
  ]>("timer_event", (test1, test2, test3) => {
    console.log("Template got timer_event with:", test1, test2, test3)
    toaster.toast({
      title: "template got timer_event",
      body: `${test1}, ${test2}, ${test3}`
    });
  });

/*   routerHook.addRoute("/decksky-callback", () => <DeckyCallback  />, { exact: true });
 */

  return {
    // The name shown in various decky menus
    name: "DeckSky",
    // The element displayed at the top of your plugin's menu
    titleView: <div className={staticClasses.Title}>DeckSky</div>,
    // The content of your plugin's menu
    content: <Content />,
    // The icon displayed in the plugin list
    icon: <FaShip />,
    // The function triggered when your plugin unloads
    onDismount() {
      console.log("Unloading")
      removeEventListener("timer_event", listener);
      routerHook.removeRoute("/decksky-callback");
    },
  };
});
