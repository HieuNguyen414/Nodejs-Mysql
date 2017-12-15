const URLApiGet = 'http://192.168.1.35:3111/todo'; // api fetch
const URLApiPost = 'http://192.168.1.35:3111/todo/create'; // api post

//xử lý bất đồng bồ, syntax es7
async function FetchData() {
  try{
    let response = await fetch(URLApiGet); // await có nghĩa là đôi tượng respoon hoàn thành fetch đữ liệu về mới chạy dòng tiếp theo
    let responseJson = await response.json();// lấy respon đó .json để thành dữ liệu json
    return responseJson // trả về danh sách dữ liệu
  }
  catch(error){
    console.log('Error')
  }
}

async function InsertData(params) {
  try{
    let response = await fetch(URLApiPost,{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(params) // chuyển qua dạng json
    }); 
    let responseJson = await response.json();
    return responseJson.resuilt;
  }
  catch(error){
    console.log('Error')
  }
}

// public để các file khác có thể lấy xài hàm này
export {FetchData};
export {InsertData};
