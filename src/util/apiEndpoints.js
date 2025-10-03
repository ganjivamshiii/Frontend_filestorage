// const BASE_URL = "http://ec2-3-110-121-97.ap-south-1.compute.amazonaws.com:8080/api/v1.0";
//added url
const BASE_URL="http://filstoragebackend-production.up.railway.app"

export const apiEndpoints={
    FETCH_FILES:`${BASE_URL}/files/my`,
    TOGGLE_FILE: (id)=>`${BASE_URL}/files/${id}/toggle-public`,
    // @GetMapping("/download/{id}")
    GET_CREDITS:`${BASE_URL}/users/credits`,
    DOWNLOAD_FILE: (id)=>`${BASE_URL}/files/download/${id}`,
    DELETE_FILE: (id)=>`${BASE_URL}/files/${id}`,
    UPLOAD_FILE:`${BASE_URL}/files/upload`,
    PUBLIC_VIEW:(id)=>`${BASE_URL}/files/public/${id}`,

}
