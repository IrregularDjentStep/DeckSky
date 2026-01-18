import {
  ButtonItem,
  DialogButton,
  PanelSection,
  PanelSectionRow,
  TextField,
  staticClasses,
  showModal,
  ShowModalResult,
} from "@decky/ui";
import {
  addEventListener,
  removeEventListener,
  callable,
  definePlugin,
  toaster,
  // routerHook
} from "@decky/api"
import {isValidHandle } from "@atproto/syntax";
import { NodeOAuthClient, Session  } from "@atproto/oauth-client-node";
import { useState } from "react";
import { FaShip } from "react-icons/fa";

import LoginModal from './components/LoginModal'

// import logo from "../assets/logo.png";


// This function calls the python function "start_timer", which takes in no arguments and returns nothing.
// It starts a (python) timer which eventually emits the event 'timer_event'
const startTimer = callable<[], void>("start_timer");

function Content() {
  const [modalResult, setModalResult] = useState<ShowModalResult | null>(null);

  //closes the current modal
  const closeModal = () => {
    modalResult?.Close();
    setModalResult(null);
  }


  const openLoginModal = () => {
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
        <TextField
          label="Bluesky Username"
          requiredLabel
          >
 
        </TextField>
        <DialogButton
          onClick={openLoginModal}
        >
          "Add New Account..."
        </DialogButton>
      </PanelSectionRow>
      <PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={() => startTimer()}
        >
          {"Start Python timer"}
        </ButtonItem>
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

  // serverApi.routerHook.addRoute("/decky-plugin-test", DeckyPluginRouterTest, {
  //   exact: true,
  // });

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

  return {
    // The name shown in various decky menus
    name: "Test Plugin",
    // The element displayed at the top of your plugin's menu
    titleView: <div className={staticClasses.Title}>Decky Example Plugin</div>,
    // The content of your plugin's menu
    content: <Content />,
    // The icon displayed in the plugin list
    icon: <FaShip />,
    // The function triggered when your plugin unloads
    onDismount() {
      console.log("Unloading")
      removeEventListener("timer_event", listener);
      // serverApi.routerHook.removeRoute("/decky-plugin-test");
    },
  };
});
