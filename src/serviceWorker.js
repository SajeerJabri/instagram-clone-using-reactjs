export default function serviceWorker(){
  let publicURL = `${process.env.PUBLIC_URL}/instagramCloneServiceW.js`
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register(publicURL)
      .then((response)=>{
        console.log('SW registration successful')
      })
      .catch((error)=>{
        console.log('SW registration failed')
      })
  }
  else{
    console.log('your browser is not supported SW')
  }
}