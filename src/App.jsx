import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Myfiles from "./pages/Myfiles";
import PublicFileView from "./pages/PublicFileView";
import Transactions from "./pages/Transactions";
import Landing from "./pages/Landing"; // your landing page (optional)
import Subscription from "./pages/Subscription";
// import UserCreditsProvider from "./context/UsercreditsContext";
import UserCreditsProvider from "./context/UserCreditsContext";

import "./App.css";
import { RedirectToSignIn,SignedIn, SignedOut } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
    
    <UserCreditsProvider>
    <Toaster/>
    <Routes>
       
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<>
      <SignedIn><Dashboard/></SignedIn>
      <SignedOut><RedirectToSignIn/></SignedOut>
          </>
      } />

      <Route path="/upload" element={
      <>
            <SignedIn><Upload/></SignedIn>
            <SignedOut><RedirectToSignIn/></SignedOut>
      </>
      } />

      <Route path="/my-files" element={
          <>
              <SignedIn><Myfiles/></SignedIn>
              <SignedOut><RedirectToSignIn/></SignedOut>
          </>
      } />

      <Route path="/transaction" element={
          <>
             <SignedIn><Transactions/></SignedIn>
             <SignedOut><RedirectToSignIn/></SignedOut>
          </>
      } />
      <Route path='/file/public/:fileId' element={
        <>
        <PublicFileView/>
        </>
      }
      />
     
       <Route path="/subscription" element={
          <>
             <SignedIn><Subscription/></SignedIn>
             <SignedOut><RedirectToSignIn/></SignedOut>
          </>
      } />

      <Route path="/publicfileview" element={
          <>
              <SignedIn><PublicFileView/></SignedIn>
              <SignedOut><RedirectToSignIn/></SignedOut>
          </>
      } />
      {/* <Route path="/landing" element={<Landing/>}/> */}
    </Routes>
     </UserCreditsProvider>
   </>
  );
}

export default App;
