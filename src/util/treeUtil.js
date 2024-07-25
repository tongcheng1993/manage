export const createRouterTree = (arrayList, parent) => {
    if (arrayList.length > 0) {
    } else {
        return parent
    }
    return buildRouterTree(arrayList, parent);
}
const buildRouterTree = (arrayList, parent) => {
    for (let i = 0; i < arrayList.length; i++) {
        let treeVo = arrayList[i]
        if (treeVo.parentId === parent.tableId) {
            if (treeVo.path && parent.path) {
                if (parent.path === '/') {
                    treeVo.path = parent.path + treeVo.path
                } else {
                    treeVo.path = parent.path + '/' + treeVo.path
                }
            }
            treeVo = buildRouterTree(arrayList, treeVo)
            if (parent.children) {

            } else {
                parent.children = []
            }
            if (treeVo.children) {

            } else {
                treeVo.children = []
            }
            if (parent.children) {
                parent.children.push(treeVo);
            } else {
                parent.children = []
                parent.children.push(treeVo);
            }

        }
    }
    return parent
}

export const createTree = (arrayList, parent) => {
    if(parent){

    }else{
        parent = {
            tableId : "0",
            children:[]
        }
    }
    if (arrayList && arrayList.length > 0) {

    } else {
        return parent
    }
    return buildTree(arrayList, parent);
}


const buildTree = (arrayList, parent) => {
    for (let i = 0; i < arrayList.length; i++) {
        let treeVo = arrayList[i]
        if (treeVo.parentId === parent.tableId) {
            treeVo = buildTree(arrayList, treeVo)
            if (parent.children) {
                parent.children.push(treeVo);
            } else {
                parent.children = []
                parent.children.push(treeVo);
            }

        }
    }
    return parent
}