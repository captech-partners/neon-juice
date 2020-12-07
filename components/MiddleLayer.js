import axios from "axios";
//updateinlist found in second page.
export async function updateinlist() {
  const response = axios.get(`http://localhost:5000/fragments`).then((result) => {
      result.data.sort(function (a, b) {
        return a.id - b.id || a.class_attr.localeCompare(b.class_attr);
      });
      return result;
    });
    return response;
}
//getid in second page
export async function getinId(id){
    const url = `http://localhost:5000/fragments/` + id;
    //creates resonse const and returns to id
    const response = await axios.get(url).then((apiResponse) => {
        return apiResponse;
    });
    return response;
}
//fragmentsetting modal create frag
export async function createfragcomponent(data, axiosConfig){
    const url = `http://localhost:5000/fragments`;
    const response= await axios.post(url, data, axiosConfig).then((result) => {
        console.log(result);
        return result;
      })
      return response;
}

// //in fragmentseting modal under edit frag
export async function editinFragment(url, data, axiosConfig){
const response= await axios.put(url, data, axiosConfig).then((result) => {
  return result;
  })
  return response;
}

//in delete modal delete frag
export async function deleteFragment(url){
  const response = axios.delete(url).then((result) => {
    return result;
    })
    return response;
};
