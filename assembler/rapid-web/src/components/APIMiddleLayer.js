import axios from "axios";


let axiosConfig = { headers: {"Content-Type": "application/json"}};

export async function getFragments() {
  const response = axios
    .get(`http://localhost:5000/fragments`)
    .then((result) => {
      result.data.sort(function (a, b) {
        return a.id - b.id || a.class_attr.localeCompare(b.class_attr);
      });
      return result;
    });
  return response;
}

export async function getFragmentById(id) {
  const url = `http://localhost:5000/fragments/` + id;
  const response = await axios.get(url).then((apiResponse) => {
    return apiResponse;
  });
  return response;
}

export async function createFragment(data) {
  const url = `http://localhost:5000/fragments`;
  const response = await axios.post(url, data, axiosConfig).then((result) => {
    console.log(result);
    return result;
  });
  return response;
}

export async function editFragment(id, data) {
  const url = `http://localhost:5000/fragments/` + id;
  const response = await axios.put(url, data, axiosConfig).then((result) => {
    return result;
  });
  return response;
}

export async function deleteFragment(id) {
  const url = `http://localhost:5000/fragments/` + id;
  const response = axios.delete(url).then((result) => {
    return result;
  });
  return response;
}
