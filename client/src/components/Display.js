import { useState } from "react"
import './Display.css'
const Display=({contract,account})=>{
    const [data,setData]=useState("");
    const getdata= async()=>{
        let dataArray;
        const Otheraddress=document.querySelector(".address").value;
if(Otheraddress){
    try {
        
        dataArray=await contract.display(Otheraddress);
    } catch (e) {
        alert("you don't have access")
        
        
    }
    // console.log(dataArray);
    
}else{
    dataArray=await contract.display(account);

}
const isEmpty=Object.keys(dataArray).length === 0;

if(!isEmpty){
    const str=dataArray.toString();
    const str_array=str.split(",")
    console.log(str);
    console.log(str_array);
    
    const images=str_array.map((item,i)=>{
        return(
            <a href={item} key={i} target="_blank">
                <img key={i} src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} alt="new" className="image-list"></img>
            </a>
        )
    })
    
 setData(images)   
} else{
    alert("No images found")
}

    }
    return(
        < >
            <div className="image-list">

{data}
            </div>
<input type="text" placeholder="Enter address" className="address">

</input>
<button className="center button " onClick={getdata}>Get Data</button>
        </>
    )
}
export default Display