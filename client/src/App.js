 import Upload from './artifacts/contracts/Upload.sol/Upload.json';
 import { ethers } from 'ethers';
import './App.css';
import { use, useEffect, useState } from 'react';
import FileUpload from './components/FileUpload';
import Display from './components/Display';
import Modal from './components/Modal';

function App() {
  const [account,setAccount]=useState('');
  const[provider,setProvider]=useState(null);
  const[contract,setContract]=useState(null);
  const [modalOpen,setModalOpen]=useState(false);
  useEffect(()=>{
    const provider=new ethers.BrowserProvider(window.ethereum)

    const loadProvider=async()=>{
      if(provider){
        window.ethereum.on('chainChanged', () => {
  // Reload the page when chain changes
  window.location.reload();
});
        window.ethereum.on('accountsChanged', () => {
  // Reload the page when accounts change
  window.location.reload();
});
        await provider.send("eth_requestAccounts",[]);
        const signer=await provider.getSigner();
        const address=await signer.getAddress();
        setAccount(address)
        let contractAddress="process.env.CONTRACT_ADDRESS"
        const contract=new ethers.Contract(contractAddress,Upload.abi,signer);
        // console.log(contract);
        
        setContract(contract);
        setProvider(provider);
      }else{
        console.error("Metamask is not installed");
        
      }
    };
    provider && loadProvider();
  },[])
  return (<>
  {!modalOpen &&<button className='share' onClick={()=>setModalOpen(true)}>
    Share
    
    </button>}
    {modalOpen && (
      
      
      <Modal contract={contract} setModalOpen={setModalOpen}>

</Modal>
)
    }
  <div className='App'>
    <h1 style={{color:"white"}}>BlockDrive</h1>
    <div className="bg"></div>
    <div className="bg bg2"></div>
    <div className="bg bg3"></div>
    <p style={{color:'white'}}>Account:{account?account:"Not Connected "}</p>

<FileUpload 
contract={contract}
account={account}
provider={provider}
>

</FileUpload>
<Display
contract={contract}
account={account}
></Display>
  </div>
</>
  );
}

export default App;
