function checkHttpResponseError(httpResponse: any){
  if(httpResponse.error){
    console.log(httpResponse.error.errors);
    return true
  }
  return false
}

export { checkHttpResponseError }