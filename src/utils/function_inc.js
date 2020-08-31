// 获取数组中某一列的值
export function array_column(arr,key){
  const data = []
  arr.forEach(item=>{
    data.push(item[key])
  })
  return data;
}
// 根据键值搜索数组中的位置
export function array_search(array,searchKey,searchVal){
  const columns = array_column(array,searchKey)
  return columns.indexOf(searchVal)
}
export function in_array(array,searchKey,searchVal) {
  console.log(array,searchKey,searchVal)
  const index = array_search(array,searchKey,searchVal)
  return index > -1 ? true : false
}

// 根据键值删除数组中的元素
export function array_del(array,searchKey,searchVal) {
  const index = array_search(array,searchKey,searchVal)
  if(index > -1){
    array.splice(index,1)
  }
  return array
}


