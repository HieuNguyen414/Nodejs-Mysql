import React, { Component } from 'react'
import {  } from 'react-native'
const URLApi = 'http://192.168.1.35:3111/todo'; // api
//xử lý bất đồng bồ
async function FetchData() {
    try{
        let response = await fetch(URLApi); // await có nghĩa là đôi tượng respoon hoàn thành fetch đữ liệu về mới chạy dòng tiếp theo
        let responseJson = await response.json();// lấy respon đó .json để thành dữ liệu json
        return responseJson // trả về danh sách dữ liệu
    }
    catch(error){
        console.log('Error')
    }
    
}

// public để các file khác có thể lấy xài hàm này
export {FetchData};