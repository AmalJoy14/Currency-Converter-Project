const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/" // inr.json

let list = document.querySelectorAll(".list");
let img1=document.querySelector(".from .img1");
let img2=document.querySelector(".to .img2");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg p");

//Adding currency codes
for (let item of list) {
    for (let CurrCode in countryList) {
        let element=document.createElement("option");
        element.value=CurrCode;
        element.innerText=CurrCode;
        item.append(element);
        if (CurrCode==="USD" && item.getAttribute("name")==="list1"){
            element.selected="selected";
        }
        else if (CurrCode==="INR" && item.getAttribute("name")==="list2"){
            element.selected="selected";
        }
        
    }
    if (item===list[0]){
        item.addEventListener("change",(e)=>{
            let CurrCode=e.target.value;
            img1.innerHTML=`<img src='https://flagsapi.com/${countryList[CurrCode]}/flat/64.png'></img>`
        });
    }
    else if (item===list[1]){
        item.addEventListener("change",(e)=>{
            let CurrCode=e.target.value;
            img2.innerHTML=`<img src='https://flagsapi.com/${countryList[CurrCode]}/flat/64.png'></img>`
        });
    }
}

let btn=document.querySelector("button");
btn.addEventListener("click",async (e)=>{
    e.preventDefault();
    let amount=Number(document.querySelector("input").value);
    if (amount<=0 || Number.isNaN(amount)){
        document.querySelector("input").value=1;
        amount=1;
    }
    console.log(amount);
    let URL=BASE_URL+(fromCurr.value).toLowerCase()+".json";
    console.log(URL);
    let response=await fetch(URL);
    
    let data=await response.json();

    let toCurrValue=toCurr.value.toLowerCase();
    let fromCurrValue=fromCurr.value.toLowerCase();
    console.log(fromCurrValue,"->",toCurrValue ,":");

    let rate=data[fromCurrValue][toCurrValue];

    let convertedAmount=(amount*rate).toFixed(2);
    console.log(convertedAmount);
    console.log(msg.innerText=`${amount} ${fromCurrValue.toUpperCase()} = ${convertedAmount} ${toCurrValue.toUpperCase()}`);

});
