export const createTree=(arrayList)=>{
    let parentId='0'
    if(arrayList.length>0){
       
    }else{
        return arrayList
    }
    return buildTree(arrayList,parentId);
}

const buildTree = (arrayList,parentId)=>{
    let treeList=[]
    for (let i = 0; i < arrayList.length; i++) {
        let treeVo=arrayList[i]
        if (treeVo.parentId==parentId) {
            treeVo.children=buildTree(arrayList, treeVo.id)
            treeList.push(treeVo);
        }
    }
    return treeList
}