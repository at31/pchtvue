//import axios from 'axios'

export function getAllPO(){
  return   fetch('http://127.0.0.1:3000/po/all').then(function (response) {
                //alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
                //alert(response.status) // 200
                return response.json()
            });
}

export var f=fetch('http://127.0.0.1:3000/po/all').then(function (response) {
                //alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
                //alert(response.status) // 200
                return response.json()
            });

function getAllPO_File(){}
